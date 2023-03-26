<template>
  <ion-modal :is-open="isOpen">
    <ion-header mode="ios">
      <ion-toolbar>
        <ion-title>Lancez le paiement</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="close()">Fermer</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div
        style="
          display: flex;
          justify-content: space-around;
          padding: 0.5rem;
          text-align: center;
        "
      >
        <div>
          Entrez pour ce produit le prix de paiement accepté par le client.
        </div>
      </div>
      <div class="prod" v-if="prods.length">
        <div
          style="
            padding-top: 0.8rem;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            padding-bottom: 1rem;
          "
          slot="content"
        >
          <div class="card">
            <div
              v-if="prod.files.length == 1"
              :style="{
                width: '100%',
                height: '240px',
                'border-radius': '10px',
                'background-size': 'cover',
                'background-position': 'top center',
                'background-image': `url('${prod.files[0].get_file}')`,
                'margin-bottom': '0.6rem',
              }"
            >
              <div class="cont_img">
                <div
                  id="acti"
                  style="
                    display: flex;
                    justify-content: space-around;
                    padding-top: 99px;
                  "
                >
                  <div>
                    <ion-icon :icon="checkmarkDone" size="large" />
                  </div>
                </div>
              </div>
            </div>
            <div class="img_cont" v-else>
              <div style="width: 100%">
                <div class="imgs">
                  <div
                    id="prod:25"
                    class="mr-2 first_m f_border"
                    v-for="img in prod.files"
                    :key="img.id"
                    :style="{
                      width: '100%',
                      height: '210px',
                      width: '230px',
                      'min-width': '230px',
                      'background-size': 'cover',
                      'background-position': 'top center',
                      'background-image': `url('${img.get_file}')`,
                      'margin-bottom': '0.6rem',
                    }"
                  >
                    <div class="cont_img">
                      <div
                        id="acti"
                        style="
                          display: flex;
                          justify-content: space-around;
                          padding-top: 99px;
                        "
                      >
                        <div>
                          <ion-icon :icon="checkmarkDone" size="large" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="corp">
              <div class="name_p">{{ prod.name }}</div>
              <div v-if="prod.details" >
                          <div class="text_p" v-if="!(cursor == prod.id)" >
                            {{ seen_text(prod.details) }}<a style="color: blue; text-decoration: underline;" v-if="!is_safe(prod.details)" @click="cursor = prod.id" >Voir plus</a>
                          </div>
                          <div class="text_p" v-else >
                            {{prod.details}}<a style="color: blue; text-decoration: underline;"  @click="cursor = 0" >Voir moins</a>
                          </div>
                        </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <form
          class="d_sp"
          style="padding-top: 0.7rem"
          @submit.prevent="next()"
          :key="pos"
        >
          <ion-item color="secondary" mode="md" fill="outline">
            <ion-label position="floating">Prix accepté(en FCFA)</ion-label>
            <ion-input
              type="number"
              required
              @ionInput="(e) => (current_val = e.target.value)"
              id="password"
            ></ion-input>
          </ion-item>
          <div style="padding-top: 0.7rem">
            <ion-button type="submit" color="tertiary" expand="full"
              >Valider</ion-button
            >
          </div>
        </form>
      </div>
    </ion-content>
  </ion-modal>
</template>

<style scoped>
.text_p {
  color: rgb(48, 48, 48);
  padding: 0.3rem;
}

.name_p {
  font-size: 1.1rem;
  font-weight: bold;
  color: rgb(48, 48, 48);
}

.corp {
  padding: 0.3rem;
}

.f_border {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.mr-2 {
  margin-right: 0.2rem;
}

.first_m {
  margin-left: 1.9rem;
}

.imgs {
  display: flex;
  overflow-x: scroll;
}

.img_cont {
  margin-left: -1.9rem;
  margin-right: -1.9rem;
}

.card {
  padding: 0.4rem;
  border-radius: 10px;
  margin-top: 1.52rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.cont_img:active {
  background: rgba(0, 128, 0, 0.152);
}

.activ {
  background: rgba(1, 12, 1, 0.466);
  color: white;
}

.cont_img {
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts">
interface PlanObj {
  [key: string]: number;
}
import {
  IonModal,
  IonHeader,
  IonContent,
  IonButtons,
  IonButton,
} from "@ionic/vue";
import { presentToast, showLoading } from "@/global/seller_auth";
import axios from "axios";
import {
  computed,
  defineComponent,
  ref,
  Ref,
  toRef,
  defineEmits,
  onMounted,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { access_tok } from "../global/patner_auth";

export default defineComponent({
  props: {
    isOpen: Boolean,
    mprods: Array<unknown>,
    disId: Number,
  },
  setup(props, ctx) {
    const prods = toRef(props, "mprods") as Ref<any[]>;
    const id = toRef(props, "disId");
    const emits = defineEmits(["close", "done"]);
    const pos = ref(0);
    const tot = ref(0);
    const router = useRouter();
    const plan_obj = ref<PlanObj>({});
    const current_val = ref(0);
    const int_plans = () => {
      for (const prod of prods.value)
        plan_obj.value[prod.get_seller as string] = 0;
    };
    const prod = computed(() => {
      return prods.value[pos.value];
    });
    watch(prods, (newp, oldp) => {
      setTimeout(() => {
        int_plans();
      }, 300);
    });
    const build_plans = () => {
      let str = "";
      for (const ident in plan_obj.value)
        str += ident + `:${plan_obj.value[ident]}-`;
      return str;
    };
    const enable_payment = async (plan: string) => {
      const load = await showLoading("Loading...");
      const pks : number[] = [] 
      for(const p of prods.value){
        pks.push(p.id)
      }
      const resp = await axios.post(
        "v2/api/enable_payment/" + id.value + "/",
        {
          tot: tot.value,
          plans: plan,
          pks : JSON.stringify(pks)
        },
        {
          headers: {
            Authorization: `Bearer ${await access_tok(
              `/patner/dem/${id.value}/`,
              router,
              load
            )}`,
          },
        }
      );
      if (resp.data["done"]) {
        load.dismiss();
        done();
        presentToast(
          "bottom",
          "Le processus de payement a été enclenché avec succès."
        );
      }
    };
    const next = () => {
      const som = plan_obj.value[prods.value[pos.value].get_seller] + parseInt((current_val.value as unknown) as string);
      tot.value += parseInt((current_val.value as unknown) as string);
      plan_obj.value[prods.value[pos.value].get_seller] = som;
      current_val.value = 0;
      if (pos.value < prods.value.length - 1) {
        pos.value++;
      } else {
        enable_payment(build_plans());
      }
    };
    const close = () => {
      ctx.emit("close");
    };
    const done = () => {
      ctx.emit("done");
    };
    const cursor = ref(0)
const is_safe = (txt : string) => {
  if(txt.length < 250) return true;
  else return false
}
const seen_text = (txt : string) => {
  if(is_safe(txt)) return txt;
  else return txt.slice(0, 248) + '...'
}
    return {
      prods,
      pos,
      plan_obj,
      close,
      done,
      prod,
      next,
      current_val,
      seen_text,
      is_safe,
      cursor
    };
  },
});
</script>
