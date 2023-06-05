<template>
  <ion-page>
    <ion-content>
      <div class="body_all">
        <form @submit.prevent="register()">
          <div class="header">
            <div @click="router.back()" class="menu">
              <ion-icon :icon="arrowBack" />
            </div>
            <div class="title_m">
              <div class="img_cont">
                <img src="../../public/assets/img/zwd_v.png" class="img_m" />
              </div>
              <div class="text_m">Zawadi</div>
            </div>
          </div>

          <div class="title_b">Inscription.</div>
          <div class="form_cont">
            <div class="d_sp" style="display: flex">
              <ion-item
                fill="outline"
                mode="md"
                style="margin-right: 0.3rem"
                color="secondary"
              >
                <ion-label position="floating">Votre Nom</ion-label>
                <ion-input
                  required
                  type="text"
                  @ionInput="(e) => (first_name = e.target.value)"
                ></ion-input>
              </ion-item>
              <ion-item
                fill="outline"
                mode="md"
                style="margin-left: 0.3rem"
                color="secondary"
              >
                <ion-label position="floating">Prénom</ion-label>
                <ion-input
                  required
                  @ionInput="(e) => (last_name = e.target.value)"
                  type="text"
                ></ion-input>
              </ion-item>
            </div>
            <div class="d_sp">
              <ion-item fill="outline" mode="md" color="secondary">
                <ion-label position="floating">Nom du commerce ou d'utilisateur</ion-label>
                <ion-input
                  required
                  type="text"
                  @ionInput="(e) => (commerce = e.target.value)"
                ></ion-input>
              </ion-item>
            </div>
            <div class="d_sp">
              <ion-item fill="outline" mode="md" color="secondary">
                <ion-label position="floating">Email</ion-label>
                <ion-input
                  required
                  @ionInput="(e) => (email = e.target.value)"
                  type="email"
                ></ion-input>
              </ion-item>
            </div>
            <div class="d_sp">
              <ion-item fill="outline" mode="md" color="secondary">
                <ion-label position="floating">Mot de passe</ion-label>
                <ion-input
                  required
                  type="password"
                  @ionInput="(e) => (password = e.target.value)"
                ></ion-input>
              </ion-item>
            </div>
            <div class="d_sp spec">
              <div class="label">Whatsapp</div>
              <div>
                <input
                  required
                  id="phone"
                  @input="(e) => (rwhatsapp = e.target.value)"
                  class="myinput"
                  type="number"
                />
              </div>
            </div>
            <div class="d_sp">
              <div
                style="
                  padding-top: 0.4rem;
                  color: rgb(41, 41, 41);
                  padding-bottom: 0.4rem;
                "
              >
                Entrez le nom de votre quartier ou d'un lieu connu proche
              </div>
              <div
                class="myinp"
                :class="{ acto: quart != '', norm: quart == '' }"
                @click="lOpen = !lOpen"
              >
                <div v-if="quart == ''">Aucun nom entré</div>
                <div v-else>{{ print_quart_name(quart) }}</div>
                <div>
                  <ion-icon :icon="location" />
                </div>
              </div>
            </div>
            <div style="padding-top: 1rem">
              <ion-button type="submit" expand="full" color="secondary"
                >S'inscrire</ion-button
              >
            </div>
          </div>
        </form>
      </div>
      <ion-modal mode="ios" :is-open="false">
        <ion-header>
          <ion-toolbar>
            <ion-title>Historique de paiement</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="rOpen = false">Fermer</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          
        </ion-content>
      </ion-modal>
      <location-picker
        :isOpen="lOpen"
        @close="lOpen = false"
        @done="al"
      ></location-picker>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.label {
  color: rgb(63, 63, 63);
  font-size: 1.1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.myinput {
  width: 90vw;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

.myinp:hover {
  border-color: #17a649;
  color: #17a649;
  background: rgb(245, 245, 245);
}

.acto {
  border-color: #17a649;
  color: #17a649;
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

.d_sp {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.form_cont {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}

.title_b {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  color: rgb(41, 41, 41);
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

.header {
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.body_all {
  width: 100vw;
  height: 100vh;
  background: white;
}
</style>

<script setup >
import {
  IonPage,
  IonContent,
  IonToolbar,
  IonSearchbar,
  IonModal,
  alertController,
  loadingController,
} from "@ionic/vue";
import { ref } from "vue";
import { arrowBack, location } from "ionicons/icons";
import LocationPicker from "../components/LocationPicker.vue";
import ProfilModifier from "../components/ProfilModifier.vue";
import intlTelInput from "intl-tel-input";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();

function getIp(callback) {
  fetch("https://ipinfo.io/json?token=d737ce5f6899f5", {
    headers: { Accept: "application/json" },
  })
    .then((resp) => resp.json())
    .catch(() => {
      return {
        country: "bj",
      };
    })
    .then((resp) => {
      callback(resp.country);
    });
}
const first_name = ref("");
const last_name = ref("");
const commerce = ref("");
const email = ref("");
const password = ref("");
const rwhatsapp = ref("");
const country = ref("");
const whatsapp = ref("");
const setCountry = (ctr) => {
  country.value = ctr;
};
let phoneinp;
setTimeout(() => {
  const input = document.querySelector("#phone");
  phoneinp = intlTelInput(input, {
    preferredCountries: ["bj", "tg", "ci"],
    initialCountry: "auto",
    geoIpLookup: getIp,
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });
}, 1000);

const show_alert = async (title, mess) => {
  const alert = await alertController.create({
    header: title,
    message: mess,
    buttons: ["OK"],
  });
  await alert.present();
};

const showLoading = async (mess) => {
  const loading = await loadingController.create({
    message: mess,
  });
  loading.present();
  return loading;
};

const register = async () => {
  if (quart.value == "") {
    return show_alert(
      "Position introuvable",
      "Veuillez indiquez un lieu connu ou proche de chez vous"
    );
  }
  try {
    set_whatsapp();
  } catch {
    return show_alert("Numéro incorrect", "Verifiez le numéro whatsapp entré");
  }
  const load = await showLoading("Creation du compte...");
  const form = new FormData();
  form.append("first_name", first_name.value);
  form.append("last_name", last_name.value);
  form.append("commerce", commerce.value);
  form.append("email", email.value);
  form.append("password", password.value);
  form.append("whatsapp", whatsapp.value);
  form.append("quart", quart.value); 
  const res = await axios({
    url: "v2/api/register_seller/",
    method: "POST",
    data: form,
  });
  if (res.data["done"]) {
    load.dismiss();
    localStorage.setItem('new_s', JSON.stringify({email : email.value, password: password.value}))
    router.push(`/seller`);
    //router.push(`/seller?email=${email.value}&password=${password.value}`)
  } else {
    if(res.data['result'] == 1){
      load.dismiss();
     show_alert('Email déjà utilisé', 'Cet email est délà utilisé par un vendeur');
    }
  }
};

const set_whatsapp = () => {
  whatsapp.value = phoneinp.getNumber();
};
const lOpen = ref(false);
const quart = ref("");
const print_quart_name = (q) => {
  const jso = JSON.parse(q);
  return jso.name;
};
const al = (str) => {
  quart.value = str;
  lOpen.value = false;
};
</script>
