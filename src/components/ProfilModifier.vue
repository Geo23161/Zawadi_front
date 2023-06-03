<template>
  <ion-modal :is-open="isOpen">
    <ion-header mode="ios">
      <ion-toolbar>
        <ion-title>Profile Acheteur</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="close()">Fermer</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="aid">
        <div style="margin-right: 0.6rem">
          <img src="../../public/assets/img/user.png" class="myimg" />
        </div>
        <div>Mettez votre profil à jour</div>
      </div>
      <form @submit.prevent="validate_profil()">
        <ion-list mode="md">
          <div class="d_sp" style="display: flex">
            <ion-item fill="outline" mode="md" style="margin-right: 0.3rem">
              <ion-label position="floating">Nom</ion-label>
              <ion-input
                required
                id="last_name"
                :value="last_name"
                @ionInput="(e) => (last_name = e.target.value)"
              ></ion-input>
            </ion-item>
            <ion-item fill="outline" mode="md" style="margin-left: 0.3rem">
              <ion-label position="floating">Prénom</ion-label>
              <ion-input
                required
                :value="first_name"
                @ionInput="(e) => (first_name = e.target.value)"
                id="first_name"
              ></ion-input>
            </ion-item>
          </div>
          <div class="d_sp">
            <ion-item fill="outline">
              <ion-label position="floating">Email</ion-label>
              <ion-input
                type="email"
                required
                :value="email"
                @ionInput="(e) => (email = e.target.value)"
                id="email"
              ></ion-input>
            </ion-item>
          </div>
          <div class="d_sp spec">
            <div class="label">Whatsapp</div>
            <div>
              <input
                required
                @input="(e) => (rwhatsapp = e.target.value)"
                id="phone"
                class="myinput"
                type="number"
              />
            </div>
          </div>
          <ion-item @click="same = !same">
            <ion-checkbox :checked="same" slot="start"></ion-checkbox>
            <ion-label>Même numéro pour les appels </ion-label>
          </ion-item>
          <div class="d_sp spec" v-show="!same">
            <div class="label">Numero de téléphone</div>
            <div>
              <input
                id="phone2"
                :value="phone"
                @ionInput="(e) => (rphone = e.target.value)"
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
        </ion-list>
        <div style="padding: 1rem">
          <ion-button type="submit" expand="full">Valider</ion-button>
        </div>
      </form>
    </ion-content>
  </ion-modal>
  <ion-modal mode="ios" :is-open="false">
    <ion-content >
      Hey you
    </ion-content>
  </ion-modal>
  <location-picker
    :isOpen="lOpen"
    @close="lOpen = false"
    @done="al"
  ></location-picker>
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

<script lang="ts" >
import { defineComponent, ref, defineEmits, onMounted, onUpdated } from "vue";
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  onIonViewDidEnter,
  alertController,
  onIonViewWillEnter,
  IonModal,
  IonContent
} from "@ionic/vue";
import intlTelInput from "intl-tel-input";
import { NInput } from "naive-ui";
import { Storage } from "@ionic/storage";
import {defineProps} from "vue";
import LocationPicker from "./LocationPicker.vue";

function getIp(callback : (e : any) => void) {
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

export default defineComponent({
  props : {
    isOpen : Boolean
  },
  components : {
    IonModal,
    LocationPicker
  },
  setup(prop, { emit }) {
    const opened = ref(true);
    const country = ref();
    const emits = defineEmits(["close", "done"]);
    const rwhatsapp = ref("");
    const whatsapp = ref("");
    const rphone = ref("");
    const phone = ref("");
    const first_name = ref("");
    const same = ref(true);
    const last_name = ref("");
    const email = ref("");
    const lOpen = ref(false);
    const quart = ref("");
    const show_alert = async (title : string, mess : string) => {
      const alert = await alertController.create({
        header: title,
        message: mess,
        buttons: ["OK"],
      });

      await alert.present();
    };
    const storage = new Storage({
      name: "client_info",
    });
    storage.create()
    const recovery = async () => {
      const old_whatsapp = await storage.get("whatsapp");
      if (old_whatsapp) {
        const old_first_name = await storage.get("first_name");
        const old_last_name = await storage.get("last_name");
        const old_email = await storage.get("email");
        const old_phone = await storage.get("phone");
        const old_quart = await storage.get("quart");
        quart.value = old_quart;
        first_name.value = old_first_name;
        last_name.value = old_last_name;
        email.value = old_email;
        phone.value = old_phone;
        whatsapp.value = old_whatsapp
      }

      console.log('Donnnnnnnnnneeee');
    };
      recovery();
    const close = () => {
      emit("close");
    };
    const setCountry = (ctr : string) => {
      country.value = ctr;
    };
    const print_quart_name = (q : string) => {
      const jso = JSON.parse(q);
      return jso.name;
    };

    let inputphone : any;
    let inputphone2 : any;
    getIp(setCountry);
    onUpdated(() => {
      setTimeout(() => {
      const input = document.querySelector("#phone");
      const input2 = document.querySelector("#phone2");
      if(input){
      inputphone = intlTelInput(input, {
        preferredCountries: ["bj", "tg", "ci"],
        initialCountry: "auto",
        geoIpLookup: getIp,
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });}
      if(input2){
      inputphone2 = intlTelInput(input2, {
        preferredCountries: ["bj", "tg", "ci"],
        initialCountry: "auto",
        geoIpLookup: getIp,
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });}
      
    }, 1500);
    })
    
    const al = (str : string) => {
      quart.value = str;
      lOpen.value = false;
    };
    const set_number = () => {
      if(!inputphone.isValidNumber()) return 0
      whatsapp.value = inputphone.getNumber();
      if (same.value) phone.value = whatsapp.value;
      else phone.value = inputphone2.getNumber();
      return 1
    };
    const validate_profil = () => {

      const is_valid = set_number();
      if (is_valid == 0) {
        return show_alert(
          "Whatsapp incorrecte",
          "Veuillez entrer un numéro whatsapp correcte"
        );
      }
      alert(first_name.value)
      if (same.value) {
        phone.value = whatsapp.value;
      } else {
        if (phone.value == "") {
          return show_alert(
            "Numéro incorrecte",
            "Veuillez entrer un numéro de téléphone correcte."
          );
        }
      }
      if (quart.value == "") {
        return show_alert(
          "Localisation impossible",
          "Veuillez remplir le champ localisation avant de proceder a la validation. "
        );
      }
      storage.set("first_name", first_name.value);
      storage.set("last_name", last_name.value);
      storage.set("email", email.value);
      storage.set("whatsapp", whatsapp.value);
      storage.set("phone", phone.value);
      storage.set("quart", quart.value);
      emit("done");
    };

    return {
      opened,
      close,
      country,
      whatsapp,
      same,
      lOpen,
      al,
      quart,
      print_quart_name,
      validate_profil,
      first_name,
      last_name,
      email,
      phone
    };
  },
});
</script>
