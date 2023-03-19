<template>
  <ion-modal :is-open="isOpen">
    <ion-header mode="ios">
      <ion-toolbar>
        <ion-title>Ajouter MOMO</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="close()">Fermer</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="aid">
        <div style="margin-right: 0.6rem">
          <img :src="picture" class="myimg" />
        </div>
        <div>Ajouter un compte Momo</div>
      </div>
      <form @submit.prevent="create_momo()">
        <div class="d_sp spec">
          <div class="label">Numéro Momo</div>
          <div>
            <input
              required
              @input="(e) => (number = e.target.value)"
              id="phone"
              class="myinput"
              type="number"
            />
          </div>
        </div>
        <div class="d_sp" style="padding-top: 0.4rem; padding-bottom: 0.4rem">
          <n-upload
            :action="api_url + (isPatner?`v2/api/pupload_img/`:`v2/api/upload_img/`)"
            @finish="finished"
            accept="image/*"
            :max="1"
            :headers="{
              Authorization: `Bearer ${access}`,
            }"
          >
            <n-button secondary color="#c09433">
              <template #icon>
                <n-icon>
                  <ion-icon :icon="cloudUpload" />
                </n-icon>
              </template>
              Ajouter une piece d'identité(image)
            </n-button>
          </n-upload>
        </div>
        <div class="d_sp">
          <ion-item color="secondary" fill="outline">
            <ion-label position="floating"
              >Nom enregistré sur le compte</ion-label
            >
            <ion-input
              required
              @ionInput="(e) => (name = e.target.value)"
              id="name"
            ></ion-input>
          </ion-item>
        </div>
        <div style="padding: 1rem">
          <ion-button type="submit" expand="full">Ajouter </ion-button>
        </div>
      </form>
    </ion-content>
  </ion-modal>
</template>

<script >
import { defineComponent, ref, defineEmits, defineProps, toRef } from "vue";
import intlTelInput from "intl-tel-input";
import { cloudUpload } from "ionicons/icons";
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  onIonViewDidEnter,
  alertController,
  IonIcon,
} from "@ionic/vue";
import { access_tok, showLoading, show_alert, presentToast } from "@/global/seller_auth";
import { useRouter } from "vue-router";
import PatnerConf from "@/global/patner_auth"
import axios from "axios";
import { NUpload, NButton } from "naive-ui";
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
    picture: String,
    isPatner: Boolean,
  },
  components: {
    NButton,
    NUpload,
  },
  setup(props, ctx) {
    //const props = defineProps(["isOpen", "picture", "isPatner"]);
    const emits = defineEmits(["close", "done"]);
    const close = () => {
      ctx.emit("close");
    };
    const done = () => {
      ctx.emit("done");
    };
    const isPatner = toRef(props, "isPatner");
    
    const name = ref("");
    const number = ref("");
    const file = ref("");
    const router = useRouter();
    const access = ref("");
    const set_access = async () => {

      if(!isPatner.value) access.value = await access_tok(`/seller/params`, router, undefined);
      else access.value = await PatnerConf(`/patner/params`, router, undefined);
    };
    set_access();
    const interval = setInterval(() => {
      set_access();
    }, 30000);
    const finished = (options) => {
      const tar = options.event?.target;
      const resp = JSON.parse(tar.responseText);
      if (resp) {
        file.value = `${resp?.result}`;
      }
      return options.file;
    };
    const set_number = () => {
      number.value = inputphone.getNumber();
    };
    const api_url = "http://192.168.43.244:8000/";
    const create_momo = async () => {
      if (file.value == "") {
        return await show_alert(
          "Pièce invalide",
          "Veuillez téléverser une pièce justifiant votre identité"
        );
      }
      set_number();
      const load = await showLoading();
      const form = new FormData();
      form.append("name", name.value);
      form.append("number", number.value);
      form.append("file", file.value);
      try {
        const resp = await axios({
          url: `v2/api/create_momo/${isPatner.value ? "?for=patner" : ""}`,
          data: form,
          method: "POST",
          headers: {
            Authorization: `Bearer ${access.value}`,
          },
        });
        if (resp.data["done"]) {
          load.dismiss();
          done();
        presentToast("top", 'Votre compte momo a été ajouté.', 'light');
        }
      } catch (e) {
        load.dismiss();
      }
    };
    let inputphone;
    setTimeout(() => {
      const input = document.querySelector("#phone");
      inputphone = intlTelInput(input, {
        preferredCountries: ["bj", "tg", "ci"],
        initialCountry: "auto",
        geoIpLookup: getIp,
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });
    }, 400);
    return {
      close,
      done,
      name,
      number,
      file,
      cloudUpload,
      finished,
      api_url,
      create_momo,
      access,
    };
  },
});
</script>

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
  border-radius: 100%;
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
