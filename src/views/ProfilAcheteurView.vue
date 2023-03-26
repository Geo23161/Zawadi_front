<template>
  <ion-page>
    <ion-content>
      <div class="top_banner">
        <div style="display: flex">
          <div class="back_" @click="router.back()">
            <ion-icon :icon="arrowBack" size="large" />
          </div>
        </div>
        <div
          style="
            padding-top: 0.5rem;
            text-align: center;
            font-size: 1.25rem;
            color: white;
          "
        ></div>
      </div>
      <div class="profil">
        <img class="profil_img" src="../../public/assets/img/user.png" />
      </div>
      <div class="item_cont">
        <div class="item_f d_sp">
          <div class="item">
            <div class="item_icon">
              <ion-icon :icon="personOutline" size="large" />
            </div>
            <div class="item_text">{{ last_name }} {{ first_name }}</div>
          </div>
          <div class="divid">
            <div class="divider"></div>
          </div>
        </div>
        <div class="item_f d_sp">
          <div class="item">
            <div class="item_icon">
              <ion-icon :icon="mailOutline" size="large" />
            </div>
            <div class="item_text">{{ email }}</div>
          </div>
          <div class="divid">
            <div class="divider"></div>
          </div>
        </div>
        <div class="item_f d_sp">
          <div class="item">
            <div class="item_icon">
              <ion-icon :icon="callOutline" size="large" />
            </div>
            <div class="item_text">{{ phone }}</div>
          </div>
          <div class="divid">
            <div class="divider"></div>
          </div>
        </div>
        <div class="item_f d_sp">
          <div class="item">
            <div class="item_icon">
              <ion-icon :icon="logoWhatsapp" size="large" />
            </div>
            <div class="item_text">{{ whatsapp }}</div>
          </div>
          <div class="divid">
            <div class="divider"></div>
          </div>
        </div>
        <div class="item_f d_sp">
          <div class="item">
            <div class="item_icon">
              <ion-icon :icon="receiptOutline" size="large" />
            </div>
            <div class="item_text">Historique de paiements</div>
            <div
              class="myicon"
              style="margin-left: 2rem"
              @click="rOpen = !rOpen"
            >
              <ion-icon :icon="eye" />
            </div>
          </div>
          <div class="divid">
            <div class="divider"></div>
          </div>
        </div>
      </div>
      <div class="edit_cont">
        <button @click="eOpen = true" class="edit">
          <div style="margin-right: 0.5rem">
            <ion-icon :icon="pencil" />
          </div>
          <div class="edit_text">Editer</div>
        </button>
      </div>
      <ion-modal mode="ios" :is-open="rOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Historique de paiement</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="rOpen = false">Fermer</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-list v-if="pays.length">
            <ion-item v-for="pay in pays" :key="pay.id">
              <ion-label>
                <h1>
                  <span style="font-weight: bold">Montant: </span
                  >{{ pay.montant }}
                </h1>
                <div>
                  {{ pay.created_at }} <br />
                  <div>
                    Statut :
                    <span :style="{ color: pay.get_color }">{{
                      pay.statut
                    }}</span>
                  </div>
                  <div>
                    ID : <span>{{ pay.transaction_id }}</span>
                  </div>
                </div>
              </ion-label>
            </ion-item>
          </ion-list>
          <ion-list v-else>
            <div>
              <div class="top_a">
                <img src="../../public/assets/img/paty.svg" />
              </div>
              <div style="padding: 1rem">
                Vous n'avez encore effectué aucun payement pour ce compte
              </div>
            </div>
          </ion-list>
        </ion-content>
      </ion-modal>
      <profil-modifier
        :isOpen="eOpen"
        @close="eOpen = false"
        @done="update()"
      ></profil-modifier>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  onIonViewWillEnter,
} from "@ionic/vue";
import { ref } from "vue";
import {
  arrowBack,
  personOutline,
  mailOutline,
  callOutline,
  logoWhatsapp,
  receiptOutline,
  eye,
  pencil,
} from "ionicons/icons";
import { Storage } from "@ionic/storage";
import ProfilModifier from "@/components/ProfilModifier.vue";
import { useRouter } from "vue-router";
import axios from "axios";
const rOpen = ref(false);
const eOpen = ref(false);
const storage = new Storage({
  name: "client_info",
});
storage.create();
const router = useRouter();
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const phone = ref("");
const quart = ref("");
const whatsapp = ref("");
const set_idents = async () => {
  first_name.value = await storage.get("first_name");
  last_name.value = await storage.get("last_name");
  email.value = await storage.get("email");
  phone.value = await storage.get("phone");
  quart.value = await storage.get("quart");
  whatsapp.value = await storage.get("whatsapp");
};

set_idents().then(() => {
  if (!whatsapp.value) {
    setTimeout(() => {
      eOpen.value = true;
    }, 500);
    console.log("Worked fined");
  }
});

const pays = ref<any[]>([]);
const get_pays = () => {
  axios({
    url: `v2/api/get_payments/?email=${email.value}`,
    method: "GET",
  })
    .then((resp) => {
      if (resp.data["done"]) {
        pays.value = resp.data["result"];
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
onIonViewWillEnter(() => {
  get_pays();
});

const update = async () => {
  const storage = new Storage({
    name: "client_info",
  });
  storage.create();
  first_name.value = await storage.get("first_name");
  last_name.value = await storage.get("last_name");
  email.value = await storage.get("email");
  phone.value = await storage.get("phone");
  quart.value = await storage.get("quart");
  whatsapp.value = await storage.get("whatsapp");
  eOpen.value = false;
};
</script>

<style scoped>
.top_a{
  padding-top: 15vh;
  display: flex;
  justify-content: space-around;
}

.edit_text {
  font-size: 1.15rem;
}

.edit:hover {
  box-shadow: 0 10px 15px -3px #f257646d, 0 4px 6px -2px #f2576443;
}

.edit {
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  background: linear-gradient(#faa9b0, #f25765);
  color: white;
}

.edit_cont {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
}

.between {
  justify-content: space-between;
}

.myicon:active {
  background-color: white;
  color: #f25765;
}

.myicon {
  padding-top: 0.5rem;
  padding-bottom: 0.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #f25765;
  color: white;
  font-weight: bold;
  border-radius: 10px;
}

.divider {
  width: 100%;
  height: 2px;
  background: #e98d95;
}

.divid {
  margin-left: -1rem;
  margin-right: -1rem;
  padding-top: 0.8rem;
  padding-bottom: 0.5rem;
}

.item_text {
  font-size: 1.2rem;
}

.item_icon {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-right: 1rem;
}

.item {
  display: flex;
  align-items: center;
}

.d_sp {
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
}

.item_cont {
  padding-top: 2rem;
  padding-right: 1rem;
  padding-left: 1rem;
  color: rgb(63, 63, 63);
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

.back_:hover {
  background: white;
  color: #f25765;
}

.back_ {
  padding-top: 0.4rem;
  padding-bottom: 0.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: white;
  font-weight: bold;
  border-radius: 100%;
}

.top_banner {
  padding: 0.5rem;
  margin: 0%;
  width: 100%;
  height: 22vh;
  background: linear-gradient(#faa9b0, #f25765);
  border-bottom-left-radius: 60%;
  border-bottom-right-radius: 60%;
}
</style>