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
          <ion-item detail="true" color="secondary" button>
            <ion-avatar slot="start">
              <img src="../../public/assets/img/zwd_v.png" />
            </ion-avatar>
            <ion-label> Zawadi Vendeur </ion-label>
          </ion-item>
          <ion-item @click="open_norm_lnk('/patner')" detail="true" button>
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
                <img src="../../public/assets/img/zwd_v.png" class="img_m" />
              </div>
              <div class="text_m">Zawadi</div>
            </div>
          </div>
          <div class="title_b">Connexion.</div>
          <div class="body_i">
            <img src="../../public/assets/img/new.svg" class="img_b" />
          </div>
          <div class="form_b">
            <div class="d_sp">
              <ion-item fill="outline" mode="md" color="secondary">
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
              <ion-item fill="outline" mode="md" color="secondary">
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
                style="color: green; text-decoration: underline"
                >Mot de passe oublié?</a
              >
            </div>
            <div v-if="!is_connecting" style="padding-top: 0.4rem">
              <ion-button type="submit" color="secondary" expand="full"
                >Connexion</ion-button
              >
            </div>
            <div v-else>
              <ion-spinner color="secondary" name="dots"></ion-spinner>
            </div>
            <div
              class="d_sp"
              style="text-align: center; color: rgb(41, 41, 41)"
            >
              Pas de compte vendeur?
              <a @click="router.push('/seller/register')" style="color: green"
                >Créez un ici</a
              >
            </div>
          </div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

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
  IonAvatar
} from "@ionic/vue";
import { ref } from "vue";
import { menu } from "ionicons/icons";
import { useRoute, useRouter } from "vue-router";
import { check_connect } from "@/global/seller_auth";
import { Storage } from "@ionic/storage";
import axios from "axios";
import {StatusBar} from "@capacitor/status-bar"

StatusBar.setBackgroundColor({color : "#17A649"})
const email = ref("");
const password = ref("");
const router = useRouter();
const is_connecting = ref(false);
const route = useRoute();

const has_account = async () => {
  const form = new FormData();
  form.append("email", email.value);
  const res = await axios({
    url: "v2/api/authenticate_seller/",
    method: "POST",
    data: form,
  });
  return res.data["done"] as boolean;
};

const connect = async () => {
  const load = await showLoading("Connexion...");
  if (!(await has_account())) {
    load.dismiss();
    return show_alert(
      "Connexion impossible",
      "Aucun compte vendeur n'est associé à ces identifiants"
    );
  }
  axios({
    url: "api/token/",
    method: "POST",
    data: {
      email: email.value,
      password: password.value,
    },
  })
    .then((resp) => {
      load.dismiss();
      const storage = new Storage({
        name: "seller_info",
      });
      storage.create();
      storage.set("stoken", JSON.stringify(resp.data));
      storage.set("email", email.value);
      storage.set("password", password.value);
      setTimeout(() => {
        if ("redirect" in route.query) {
          router.push(route.query.redirect as string);
        }
        router.push("/seller/home");
      }, 200);
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

const showLoading = async (mess: string) => {
  const loading = await loadingController.create({
    message: mess,
  });
  loading.present();
  return loading;
};

const show_alert = async (title: string, mess: string) => {
  const alert = await alertController.create({
    header: title,
    message: mess,
    buttons: ["OK"],
  });
  await alert.present();
};

const open_sys_lnk = (url: string) => {
  window.location.href = url
};

const open_norm_lnk = (lnk: string) => {
  showLoading("Loading...");
  window.location.href = lnk;
};

onIonViewDidEnter(async () => {
  const new_ = localStorage.getItem("new_s");
  if (new_) {
    const creds: { email: string; password: string } = JSON.parse(new_);
    email.value = creds.email;
    password.value = creds.password;
    localStorage.removeItem("new_s");
    await connect();
  }
  const is_connected = await check_connect();
  if (is_connected) {
    router.push("/seller/home");
  } else {
    const storage = new Storage({
      name: "seller_info",
    });
    storage.create();
    const emailo: string | undefined = await storage.get("email");
    const passwordo: string | undefined = await storage.get("password");
    if (emailo) email.value = emailo as string;
    if (passwordo) password.value = passwordo;
  }
});
</script>

<style scoped>
ion-menu::part(backdrop) {
  background-color: #2dd36f7e;
}

ion-menu::part(container) {
  box-shadow: 4px 0px 16px #2dd36f29;
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
}

.body_i {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
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
  color: #17a649;
}

.menu {
  padding-top: 0.4rem;
  padding-bottom: 0.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #17a649;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px #17a64965, 0 4px 6px -2px #17a64929;
}

.profil_img {
  border-radius: 100%;
  width: 120px;
  height: 120px;
}

.profil {
  margin-top: -8vh;
  display: flex;
  justify-content: space-around;
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