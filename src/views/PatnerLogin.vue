<template>
  <ion-page>
    <ion-menu class="poino" content-id="main-content">
      <ion-header mode="ios">
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item detail="true" @click="open_norm_lnk('/acheteur')" button>
            <ion-avatar slot="start">
              <img src="../../public/assets/img/zwd.png" />
            </ion-avatar>
            <ion-label> Zawadi Acheteur </ion-label>
          </ion-item>
          <ion-item @click="open_norm_lnk('/seller')" detail="true" button>
            <ion-avatar slot="start">
              <img src="../../public/assets/img/zwd_v.png" />
            </ion-avatar>
            <ion-label> Zawadi Vendeur </ion-label>
          </ion-item>
          <ion-item color="tertiary" detail="true" button>
            <ion-avatar slot="start">
              <img src="../../public/assets/img/zwd_m.jpg" />
            </ion-avatar>
            <ion-label> Zawadi Partenaire </ion-label>
          </ion-item>
          <ion-item
            detail="true"
            @click="open_sys_lnk('https://www.zawadi.site/blog')"
            button
          >
            <ion-avatar slot="start">
              <img src="../../public/assets/img/zwd_b.png" />
            </ion-avatar>
            <ion-label> Zawadi Blog </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
      <ion-footer >
          <ion-toolbar mode="ios" >
            <ion-title> &copy; Elife Global</ion-title>
          </ion-toolbar>
        </ion-footer>
    </ion-menu>
    <ion-content>
      <div class="body_all">
        <form @submit.prevent="connect()">
          <div class="header">
            <ion-menu-toggle>
              <div class="menu">
                <ion-icon :icon="menu" />
              </div>
            </ion-menu-toggle>
            <div class="title_m">
              <div class="img_cont">
                <img src="../../public/assets/img/zwd_m.jpg" class="img_m" />
              </div>
              <div class="text_m">Zawadi</div>
            </div>
          </div>
          <div class="title_b">Connexion.</div>
          <div class="body_i">
            <img src="../../public/assets/img/p_log.svg" class="img_b" />
          </div>
          <div class="form_b">
            <div class="d_sp">
              <ion-item fill="outline" mode="md" color="tertiary">
                <ion-label position="floating">Email</ion-label>
                <ion-input
                  required
                  :value="email"
                  type="email"
                  @ionInput="(e) => (email = e.target.value)"
                ></ion-input>
              </ion-item>
            </div>
            <div class="d_sp">
              <ion-item fill="outline" mode="md" color="tertiary">
                <ion-label position="floating"> Mot de passe </ion-label>
                <ion-input
                  type="password"
                  required
                  :value="password"
                  @ionInput="(e) => (password = e.target.value)"
                ></ion-input>
              </ion-item>
            </div>
            <div style="padding-top: 0rem">
              <a
                href="whatsapp://send?text=J'aimerais proceder au changement de mon mot de passe"
                style="color: orange; text-decoration: underline"
                >Mot de passe oublié?</a
              >
            </div>
            <div v-if="!is_connecting" style="padding-top: 0.4rem">
              <ion-button type="submit" color="tertiary" expand="full"
                >Connexion</ion-button
              >
            </div>
            <div v-else>
              <ion-spinner color="tertiary" name="dots"></ion-spinner>
            </div>
            <div
              class="d_sp"
              style="text-align: center; color: rgb(41, 41, 41)"
            >
              Pas encore membre ?
              <a @click="router.push('/patner/register')" style="color: orange">Inscrivez-vous ici</a>
            </div>
          </div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-menu::part(backdrop) {
  background-color: #F282417e;
}

ion-menu::part(container) {
  box-shadow: 4px 0px 16px #F2824129;
}

.poino {
  pointer-events: auto;
}

.form_b {
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.title_b {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
  color: rgb(41, 41, 41);
}

.img_b {
  width: 100%;
  padding: 1rem;
}

.body_i {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.4rem;
}

.img_cont {
  margin-right: 0.3rem;
}

.text_m {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgb(41, 41, 41);
}

.img_m {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.title_m {
  display: flex;
  align-items: center;
}

.menu:active,
.menu_:active {
  box-shadow: none;
  background: white;
  color: #f28241;
}

.menu {
  padding-top: 0.4rem;
  padding-bottom: 0.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #f28241;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px #f2824165, 0 4px 6px -2px #f2824129;
}

.header {
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.d_sp {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.body_all {
  width: 100vw;
  height: 100vh;
  background: white;
}
</style>

<script setup lang="ts" >
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonMenu,
  IonMenuToggle,
  IonList,
  onIonViewDidEnter,
  IonSpinner,
  alertController,
  loadingController,
} from "@ionic/vue";
import { menu } from "ionicons/icons";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { check_connect } from "@/global/patner_auth";
import { show_alert, showLoading } from "@/global/seller_auth";
import { Storage } from "@ionic/storage";
import axios from "axios";
import {StatusBar} from "@capacitor/status-bar"

StatusBar.setBackgroundColor({color : "#F28241"})
const email = ref("");
const password = ref("");
const router = useRouter();
const is_connecting = ref(false);
const route = useRoute();

const has_account = async () => {
  const form = new FormData();
  form.append("email", email.value);
  const res = await axios({
    url: "v2/api/has_paccount/",
    method: "POST",
    data: form,
  });
  return res.data["done"] as boolean;
};

const open_sys_lnk = (url: string) => {
  window.open(url, "_system", "location=yes");
};

const open_norm_lnk = (lnk: string) => {
  showLoading('Loading...')
  window.location.href = lnk
}

const connect = async () => {
  const load = await showLoading("Connexion...");
  if (!(await has_account())){
    load.dismiss();
    return show_alert(
      "Connexion impossible",
      "Veuillez vérifier vos identifiants."
    );
  }
    
  axios({
    url: "api/token/",
    method: "POST",
    data: {
      email : 'patner' + email.value,
      password: password.value
    },
  })
    .then((resp) => {
      load.dismiss();
      const storage = new Storage({
        name: "patner_info",
      });
      storage.create();
      storage.set("ptoken", JSON.stringify(resp.data));
      storage.set("email", email.value);
      storage.set("password", password.value);

      if ("redirect" in route.query) {
        router.push(route.query.redirect as string);
      }
      router.push("/patner/home");
    })
    .catch((err) => {
      load.dismiss();
      console.log(err);
      return show_alert(
        "Connexion impossible",
        "Veuillez vérifier vos identifiants."
      );
    });
};



onIonViewDidEnter(async () => {
  const new_ = localStorage.getItem('new_p')
  if (new_) {
    const creds : {email: string, password: string} = JSON.parse(new_);
    email.value = creds.email;
    password.value = creds.password;
    localStorage.removeItem('new_p');
    await connect();
  }
  const is_connected = await check_connect();
  if (is_connected) {
    router.push("/patner/home");
  } else {
    const storage = new Storage({
      name: "patner_info",
    });
    storage.create();
    const emailo: string | undefined = await storage.get("email");
    const passwordo: string | undefined = await storage.get("password");
    if (emailo) email.value = emailo as string;
    if (passwordo) password.value = passwordo;
  }
});
</script>
