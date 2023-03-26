<template>
  <ion-modal :is-open="isOpen">
    <ion-header mode="ios">
      <ion-toolbar>
        <ion-title>Mot de passe</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="close()">Femer</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content v-show="token == ''" class="ion-padding">
      <div
        style="display: flex; justify-content: space-around; padding-top: 4rem"
      >
        <div>
          <img src="../../public/assets/img/password.svg" style="width: 80vw" />
        </div>
      </div>
      <div style="padding-top: 1rem; font-size: 1.1rem;">Entrez votre mots de passe pour continuer</div>
      <form class="d_sp" @submit.prevent="check_password()">
        <ion-item color="secondary" mode="md" fill="outline">
          <ion-label position="floating">Mot de passe</ion-label>
          <ion-input
            type="password"
            required
            @ionInput="(e) => (password = e.target.value)"
            id="password"
          ></ion-input>
        </ion-item>
          
        <div style="padding: 0.8rem">
          <a
            href="whatsapp://send?text=J'aimerais proceder au changement de mon mot de passe"
            style="color: green; text-decoration: underline"
            >Mot de passe oublié?</a
          >
        </div>
        <div style="padding: 0rem">
          <ion-button type="submit" color="secondary" expand="full"
            >Confirmer</ion-button
          >
        </div>
      </form>
    </ion-content>
    <ion-content v-show="token != ''" class="ion-padding">
      <div class="aid">
        <div style="margin-right: 0.6rem">
          <img :src="picture" style="border-radius: 100%" class="myimg" />
        </div>
        <div>Mettez vos informations à jour</div>
      </div>
      <form @submit.prevent="update_password()">
        <ion-list mode="md">
          <div class="d_sp">
            <ion-item fill="outline" mode="md" color="secondary">
              <ion-label position="floating">Nouveau mot de passe</ion-label>
              <ion-input
                required
                type="password"
                @ionInput="(e) => (ww_w = e.target.value)"
              ></ion-input>
            </ion-item>
          </div>
        </ion-list>
        <div style="padding: 1rem">
          <ion-button type="submit" expand="full">Valider</ion-button>
        </div>
      </form>
    </ion-content>
    <ion-modal mode="ios" :is-open="false"> </ion-modal>
    
  </ion-modal>
</template>

<style scoped>
.myinp:hover {
  border-color: #f25765;
  color: #f25765;
  background: rgb(245, 245, 245);
}

.acto {
  border-color: #f25765;
  color: #f25765;
}

.norm {
  border-color: rgb(41, 41, 41);
  color: rgb(41, 41, 41);
}

.myinp {
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.myinput {
  width: 90vw;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}

.label {
  color: rgb(63, 63, 63);
  font-size: 1.1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.d_sp {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.myimg {
  width: 35px;
  height: 35px;
}

.aid {
  text-align: center;
  font-size: 1.12rem;
  color: rgb(63, 63, 63);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
</style>

<script >
import { defineComponent, ref, defineEmits, defineProps } from "vue";
import { IonItem, IonLabel, IonInput } from "@ionic/vue";
import { access_tok, presentToast, showLoading, show_alert } from "../global/seller_auth";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    isOpen: Boolean,
    picture: String,
  },
  setup(props, ctx) {
    //const props = defineProps(["isOpen", "picture"]);
    const password = ref("");
    const emits = defineEmits(["close", "done"]);
    const close = () => {
      ctx.emit("close");
    };
    const done = () => {
      ctx.emit("done");
    };
    const router = useRouter();
    const token = ref("");
    const ww_w = ref("")
    const check_password = async () => {
      const load = await showLoading("Loading...");
      const form = new FormData();
      form.append("password", password.value);
      const resp = await axios.post("v2/api/check_password/", form ,{
        headers: {
          Authorization: `Bearer ${await access_tok("/seller/params", router)}`,
        },
      });
      if (resp.data["done"]) {
        token.value = resp.data["result"];
        load.dismiss();
      } else {
        await show_alert(
          "Mot de passe incorrecte",
          "Veuillez entrer le mot de passe correcte pour votre compte"
        );
        load.dismiss()
      }
    };
    const update_password = async () => {
      const load = await showLoading("Loading...");
      const form = new FormData();
      form.append("token", token.value);
      form.append("ww_w", ww_w.value);
      const resp = await axios.post("v2/api/update_password/",form,{
        headers: {
          Authorization: `Bearer ${await access_tok("/seller/params", router)}`,
        },
      });
      if (resp.data["done"]) {
        done();
        load.dismiss();
        presentToast("top", 'Mot de passe mis à jour avec succès.', 'light');
      }
    };
    return {
      props,
      password,
      ww_w,
      close,
      done,
      token,
      update_password,
      check_password,
    };
  },
});
</script>
