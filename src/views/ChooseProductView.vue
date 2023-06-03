<template>
  <ion-page >
    <ion-content>
      <div class="body_all">
        <div class="menu_cont">
          <div @click="go_back()" class="menu">
            <ion-icon :icon="arrowBack" />
          </div>
        </div>
        <div v-if="!loading">
          <div class="quote_cont">
            <div style="margin-right: 0.3rem">
              <img src="../../public/assets/img/zwd.png" class="zwd_q" />
            </div>
            <div style="margin-right: 0.3rem; color: white">
              <ion-icon :icon="caretForward" size="large" />
            </div>
            <div class="quote">{{ get_title() }}</div>
          </div>

          <div id="product" v-if="stp < 4">
            <transition name="down">
              <div class="choose_cont" id="label" v-if="!stp">
                <ion-list style="background: rgb(238, 238, 238)">
                  <div v-for="l in get_cur_elts(stp)" :key="l.id" class="d_sp">
                    <ion-item
                      @click="(label = l.id), stp++"
                      button
                      detail="true"
                    >
                      <ion-avatar slot="start">
                        <img :src="l.get_picture" />
                      </ion-avatar>
                      <ion-label> {{ l.name }} </ion-label>
                    </ion-item>
                  </div>
                </ion-list>
              </div>
            </transition>
            <transition name="down">
              <div class="choose_cont" id="cat" v-if="stp == 1">
                <ion-list style="background: rgb(238, 238, 238)">
                  <div v-for="c in get_cur_elts(stp)" :key="c.id" class="d_sp">
                    <ion-item @click="stp++, (cat = c.id)" button detail="true">
                      <ion-avatar slot="start">
                        <img :src="c.get_picture" />
                      </ion-avatar>
                      <ion-label> {{ c.name }} </ion-label>
                    </ion-item>
                  </div>
                </ion-list>
              </div>
            </transition>
            <transition name="down">
              <div class="choose_cont" id="sub" v-if="stp == 2">
                <ion-list style="background: rgb(238, 238, 238)">
                  <div v-for="s in get_cur_elts(stp)" :key="s.id" class="d_sp">
                    <ion-item @click="(sub = s.id), stp++" button detail="true">
                      <ion-avatar slot="start">
                        <img :src="s.get_picture" />
                      </ion-avatar>
                      <ion-label> {{ s.name }} </ion-label>
                    </ion-item>
                  </div>
                </ion-list>
              </div>
            </transition>
            <transition name="down">
              <div class="choose_cont" id="ssub" v-if="stp == 3">
                <ion-list style="background: rgb(238, 238, 238)">
                  <div
                    v-for="ss in get_cur_elts(stp)"
                    :key="ss.id"
                    class="d_sp"
                  >
                    <ion-item
                      @click="(ssub = ss.id), stp++"
                      button
                      detail="true"
                    >
                      <ion-label> {{ ss.name }} </ion-label>
                      <ion-checkbox
                        color="primary"
                        mode="ios"
                        :checked="ssub == ss.id"
                        slot="start"
                      ></ion-checkbox>
                    </ion-item>
                  </div>
                </ion-list>

                <div style="padding: 1rem">
                  <ion-button
                    color="light"
                    @click="stp++, (ssub = 0)"
                    expand="full"
                    >Je ne sais pas encore</ion-button
                  >
                </div>
              </div>
            </transition>
          </div>
          <div id="detail" v-else>
            <div class="choose_cont">
              <ion-list style="background: rgb(238, 238, 238)">
                <div class="d_sp">
                  <ion-item>
                    <ion-label>Budget prévu (en FCFA)</ion-label>
                    <ion-input
                      @ionInput="(e) => (bdg = e.target.value)"
                      type="number"
                      placeholder="0000"
                    ></ion-input>
                  </ion-item>
                </div>
                <div class="d_sp">
                  <ion-item>
                    <ion-label>Nombre voulu</ion-label>
                    <ion-input
                      type="number"
                      @ionInput="(e) => (num = e.target.value)"
                      value="1"
                    ></ion-input>
                  </ion-item>
                </div>
                <div class="d_sp" style="display: none">
                  <ion-item>
                    <ion-label>Quand êtes-vous libre?</ion-label>
                    <ion-select placeholder="Choisir">
                      <ion-select-option value="now"
                        >Maintenant</ion-select-option
                      >
                      <ion-select-option value="today"
                        >Ce soir</ion-select-option
                      >
                      <ion-select-option value="tom">Demain</ion-select-option>
                      <ion-select-option value="ttom"
                        >Après demain</ion-select-option
                      >
                      <ion-select-option value="week"
                        >Cette Semaine</ion-select-option
                      >
                    </ion-select>
                  </ion-item>
                </div>
              </ion-list>
            </div>
          </div>
          <div style="padding: 1rem" v-if="stp == 4">
            <ion-button @click="validate()" expand="full"
              >Enregistrer</ion-button
            >
          </div>
        </div>
        <div v-else>
          <div
            style="
              padding-top: 35vh;
              display: flex;
              justify-content: space-around;
            "
          >
            <div>
              <ion-spinner color="primary" name="crescent"></ion-spinner>
            </div>
          </div>
        </div>
      </div>
      <profil-modifier
        :isOpen="iOpen"
        @close="iOpen = false"
        @done="validate()"
      ></profil-modifier>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.quest {
  color: rgb(48, 48, 48);
  text-align: center;
}

.d_sp {
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
}

.choose_cont {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 3rem;
}

.quote {
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  background: white;
  width: 100%;
  color: rgb(48, 48, 48);
  border-radius: 10px;
  text-align: center;
  font-size: 1.1rem;
}

.zwd_q {
  min-width: 40px;
  width: 40px;
  min-height: 40px;
  height: 40px;
  border-radius: 100%;
}

.quote_cont {
  padding-top: 1rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  display: flex;
  align-items: center;
}

.menu:active,
.menu_:active {
  box-shadow: none;
  background: white;
  color: #f25765;
}

.menu {
  padding-top: 0.4rem;
  padding-bottom: 0.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #f25765;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px #f257646d, 0 4px 6px -2px #f2576443;
}
.menu_cont {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  display: flex;
  justify-content: space-between;
}
.body_all {
  width: 100vw;
  height: 100vh;
  background-color: rgb(238, 238, 238);
}
</style>

<script setup lang="ts" >
import { IonPage, IonContent, IonSpinner, onIonViewDidEnter } from "@ionic/vue";
import { ref } from "vue";
import { arrowBack, caretForward } from "ionicons/icons";
import { useRouter } from "vue-router";
import axios from "axios";
import { Storage } from "@ionic/storage";
import ProfilModifier from "@/components/ProfilModifier.vue";

const iOpen = ref(false);
const validate = async () => {
  const storage = new Storage({
    name: "client_info",
  });
  storage.create();
  const whatsapp: string | undefined = await storage.get("whatsapp");
  if (!whatsapp) {
    iOpen.value = true;
    return;
  } else {
    loading.value = true;
    const first_name: string = await storage.get("first_name");
    const last_name: string = await storage.get("last_name");
    const email: string = await storage.get("email");
    const phone: string = await storage.get("phone");
    const quart: string = await storage.get("quart");
    const form = new FormData();
    form.append("first_name", first_name);
    form.append("last_name", last_name);
    form.append("email", email);
    form.append("phone", phone);
    form.append("whatsapp", whatsapp);
    form.append("quart", quart);
    form.append("subs", `${sub.value}`);
    form.append("ssubs", JSON.stringify(ssub.value));
    form.append("num", `${num.value}`);
    form.append("bdg", `${bdg.value}`);
    axios({
      url: "v2/api/register_demand/",
      method: "POST",
      data: form,
    })
      .then((resp) => {
        if (resp.data["done"]) {
          loading.value = false;
          localStorage.setItem("new", `${resp.data["result"]}`);
          router.push(`/acheteur`);
          //router.push(`/acheteur/?id=${resp.data["result"]}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const router = useRouter();

const stp = ref(0);

const label = ref(0);

const cat = ref(0);

const sub = ref(0);

const ssub = ref(0);

const num = ref(1);

const bdg = ref(0);

const when = ref("now");

const get_title = () => {
  let title = "";
  switch (stp.value) {
    case 0:
      title = "De quelle catégorie?";
      break;
    case 1:
      title = "De quel type?";
      break;
    case 2:
      title = "Quel produit?";
      break;
    case 3:
      title = "Quel produit en particulier?";
      break;
    case 4:
      title = "Budget prévu?";
      break;
  }
  return title;
};

const get_cur_elts = (stp_: number) => {
  let elts: any[] = [];
  switch (stp_) {
    case 0:
      elts = labels.value;
      break;
    case 1:
      for (const elt of labels.value) {
        if (elt.id == label.value) {
          elts = elt.cats;
        }
      }
      break;
    case 2:
      for (const elt of labels.value) {
        for (const catt of elt.cats) {
          if (catt.id == cat.value) elts = catt.subs;
        }
      }
      break;
    case 3:
      for (const elt of labels.value) {
        for (const catt of elt.cats) {
          let subb: any;
          if (catt.id == cat.value) {
            for (subb of catt.subs) {
              if (subb.id == sub.value) elts = subb.subs;
            }
          }
        }
      }

      if (elts.length == 1) stp.value++;
      break;
  }
  return elts;
};

const rigth_typ = (_stp: number) => {
  let typ = 0;
  switch (_stp) {
    case 1:
      typ = label.value;
      break;
    case 2:
      typ = cat.value;
      break;
    case 3:
      typ = sub.value;
      break;
    case 4:
      typ = ssub.value;
      break;
  }
  return typ;
};

const go_back = () => {
  if (stp.value) {
    if (stp.value == 4) {
      if (get_cur_elts(3).length == 1) {
        stp.value = 2;
      } else stp.value = stp.value - 1;
    } else {
      stp.value = stp.value - 1;
    }
  } else router.back();
};

const loading = ref(true);

const labels = ref<any[]>([]);

const get_tree_cats = () => {
  axios({
    url: "v2/api/get_tree_cats/",
    method: "GET",
  })
    .then((resp) => {
      if (resp.data["done"]) {
        labels.value = resp.data["result"];
        loading.value = false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
get_tree_cats();
onIonViewDidEnter(() => {
  stp.value = 0;
  ssub.value = 0;
});
</script>
