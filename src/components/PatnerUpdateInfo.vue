<template>
  <ion-modal :is-open="isOpen">
    <ion-header mode="ios">
      <ion-toolbar>
        <ion-title>Mes informations</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="close()">Fermer</ion-button>
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
      <div style="padding-top: 1rem; font-size: 1.1rem;">Entrez votre mot de passe pour continuer</div>
      <form class="d_sp" @submit.prevent="check_password()">
        <ion-item color="tertiary" mode="md" fill="outline">
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
            style="color: #f28241; text-decoration: underline"
            >Mot de passe oublié?</a
          >
        </div>
        <div style="padding: 0rem">
          <ion-button type="submit" color="tertiary" expand="full"
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
      <form @submit.prevent="update_info()">
        <ion-list mode="md">
          <div class="d_sp" style="display: flex">
            <ion-item color="tertiary" fill="outline" mode="md" style="margin-right: 0.3rem">
              <ion-label position="floating">Votre Nom</ion-label>
              <ion-input
                required
                id="last_name"
                :value="last_name"
                @ionInput="(e) => (last_name = e.target.value)"
              ></ion-input>
            </ion-item>
            <ion-item color="tertiary"  fill="outline" mode="md" style="margin-left: 0.3rem">
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
            <ion-item color="tertiary" fill="outline">
              <ion-label position="floating">Email</ion-label>
              <ion-input
                type="email"
                required
                :value="format_email(email)"
                @ionInput="(e) => (email = 'patner'+ e.target.value)"
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
                id="phone5"
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
    <ion-modal mode="ios" :is-open="false"> </ion-modal>
    <location-picker
      :isOpen="lOpen"
      @close="lOpen = false"
      @done="al"
    ></location-picker>
  </ion-modal>
</template>

<style scoped>
.myinp:hover {
  border-color: #F28241;
  color: #F28241;
  background: rgb(245, 245, 245);
}

.acto {
  border-color: #F28241;
  color: #F28241;
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
import { defineComponent, ref, defineEmits, defineProps, toRef, onUpdated } from "vue";
import { IonItem, IonLabel, IonInput } from "@ionic/vue";
import { showLoading, show_alert, presentToast } from "../global/seller_auth";
import axios from "axios";
import { useRouter } from "vue-router";
import intlTelInput from "intl-tel-input";
import { access_tok } from "@/global/patner_auth";
import LocationPicker from "@/components/LocationPicker.vue";

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

export default defineComponent({
  props: {
    isOpen: Boolean,
    info: Object,
    picture: String,
  },
  components : {
    LocationPicker
  },
  setup(props, ctx) {
    //const props = defineProps(["isOpen", "info", "picture"]);
    const pict = toRef(props, "picture");
    const info = toRef(props, "info");
    const password = ref("");
    const country = ref("");
    const lOpen = ref(false);
    const emits = defineEmits(["close", "done"]);
    const close = () => {
      ctx.emit("close");
    };
    const done = () => {
      ctx.emit("done");
    };
    const setCountry = (ctr ) => {
      country.value = ctr;
    };
    let indic = 0;
    let inputphone;
    const init = () => {
      if (!indic) {
        setTimeout(() => {
          const input = document.querySelector("#phone5");
          inputphone = intlTelInput(input, {
            preferredCountries: ["bj", "tg", "ci"],
            initialCountry: "auto",
            geoIpLookup: getIp,
            utilsScript:
              "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
          });
          console.log(input);
        }, 500);
        indic = 1
      }
    };
    onUpdated(() => {
      init()
    })
    const router = useRouter();
    const token = ref("");
    const first_name = ref("");
    const last_name = ref("");
    const email = ref("");
    const whatsapp = ref("");
    const rwhatsapp = ref("");
    const quart = ref("");
    if (info.value) {
      first_name.value = info.value.first_name;
      last_name.value = info.value.last_name;
      email.value = info.value.email;
      whatsapp.value = info.value.whatsapp;
      quart.value = info.value.quart;
    } 
    const format_email = (email) => {
      return email.split('patner')[1]
    }
    const check_password = async () => {
      const load = await showLoading("Loading...");
      const form = new FormData();
      form.append("password", password.value);
      const resp = await axios.post("v2/api/check_password/", form ,{
        headers: {
          Authorization: `Bearer ${await access_tok(
            "/patner/params",
            router,
            load
          )}`,
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
    const al = (str) => {
      quart.value = str;
      lOpen.value = false;
    };
    const print_quart_name = (q) => {
      const jso = JSON.parse(q);
      return jso.name;
    };
    const set_number = () => {
      whatsapp.value = inputphone.getNumber();
    };
    const update_info = async () => {
      const load = await showLoading("Loading...");
      if (quart.value == "") {
        return await show_alert(
          "Position introuvable",
          "Veuillez indiquer un lieu proche de chez vous."
        );
      }
      set_number();
      const form = new FormData();
      form.append("token", token.value);
      form.append("first_name", first_name.value);
      form.append("last_name", last_name.value);
      form.append("email", email.value);
      form.append("whatsapp", whatsapp.value);
      form.append("quart", quart.value);
      const resp = await axios.post("v2/api/pupdate_info/", form ,{
        headers: {
          Authorization: `Bearer ${await access_tok(
            "/patner/params",
            router,
            load
          )}`,
        },
      });
      if (resp.data["done"]) {
        done();
        load.dismiss();
        presentToast("top", 'Vos informations ont été mis à jour avec succès.', 'light');
      }
    };
    return {
      props,
      password,
      close,
      done,
      token,
      update_info,
      check_password,
      print_quart_name,
      first_name,
      last_name,
      email,
      whatsapp,
      rwhatsapp,
      quart,
      init, 
      lOpen,
      format_email,
      al
    };
  },
});
</script>
