<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/patner"></ion-back-button>
        </ion-buttons>
        <ion-title>Activité de paiement</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="has_load">
      <div class="ban">
        <div class="myico yellow_bg">
          <ion-icon :icon="cash" />
        </div>
        <div class="ban_cont">
          <div class="title_b">Solde total</div>
          <div class="contentb">XOF{{ spays.total_solde }}</div>
        </div>
      </div>
      <div class="ban">
        <div class="myico green_bg">
          <ion-icon :icon="cash" />
        </div>
        <div class="ban_cont">
          <div class="title_b">Solde disponible</div>
          <div class="contentb">XOF{{ spays.solde }}</div>
        </div>
      </div>
      <div class="ban">
        <div class="myico orange_bg">
          <ion-icon :icon="people" />
        </div>
        <div class="ban_cont">
          <div class="title_b">Produits vendus</div>
          <div class="contentb">{{ spays.p_count }}</div>
        </div>
      </div>
      <div style="padding-left: 1rem; padding-right: 1rem">
        <ion-button @click="encaisser()" color="tertiary" expand="full"
          >Encaisser</ion-button
        >
      </div>

      <div class="mytitle">Historiques des paiements</div>
      <ion-list v-if="spays.pays.length">
        <ion-item v-for="pay in spays.pays" :key="pay.id">
          <ion-label>
            <h2>
              <span style="font-weight: bold">Montant: </span>{{ pay.currency}} {{ pay.montant }}
            </h2>
            <div>
              <div>
                Type :
                <span :style="{ color: pay.get_tcolor }">{{
                  pay.type_of
                }}</span>
              </div>
              <div>
                Etat :
                <span :style="{ color: pay.get_color }">{{ pay.statut }}</span>
              </div>
              <div>
                Reference ID : <span>{{ pay.transaction_id }}</span>
              </div>
              <div style="color: gray">
                {{ get_date(pay.created_at) }}
              </div>
            </div>
          </ion-label>
          <ion-button @click="call_num(spays.call_num)" color="tertiary" slot="end">
            <ion-icon slot="icon-only" :icon="call"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>
      <ion-list v-else>
        <div style="display: flex; justify-content: space-around; padding: 2rem" >
          <img src="../../public/assets/img/retrait_p.svg" style="width: 60%" />
        </div>
        <div
          style="
            text-align: center;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          "
        >
          Aucune transaction trouvé.
        </div>
      </ion-list>
    </ion-content>
    <ion-content v-else>
      <div style="min-height: 95vh"></div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.mytitle {
  padding: 1rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
}

.bg {
  background: rgb(235, 233, 233);
  min-height: 100vh;
}

.contentb {
  font-size: 1.3rem;
  font-weight: 700;
}

.title_b {
  font-size: 0.9rem;
  font-weight: 500;
  color: #575757;
  padding-bottom: 0.2rem;
}

.yellow_bg {
  background: rgba(234, 0, 255, 0.261);
  color: rgb(234, 0, 255);
}

.orange_bg {
  background: rgba(255, 166, 0, 0.219);
  color: orange;
}

.green_bg {
  background: rgba(0, 128, 0, 0.213);
  color: green;
}

.myico {
  margin-right: 0.9rem;
  border-radius: 100%;
  padding-bottom: 0.5rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  padding-top: 0.7rem;
}

.ban {
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 15px;
  background: rgb(243, 242, 242);
}
</style>

<script setup >
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonLabel,
  IonItem,
  IonButton,
  onIonViewDidEnter,
} from "@ionic/vue";
import { ref } from "vue";
import { cash, people, call } from "ionicons/icons";
import { showLoading, show_alert, call_num } from "@/global/seller_auth";
import { access_tok } from "@/global/patner_auth";
import axios from "axios";
import { useRouter } from "vue-router";
const get_date = (utc) => {
  const date = new Date(utc);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};
const has_load = ref(false);
const spays = ref();
const router = useRouter();
const get_spays = async () => {
  const load = await showLoading("Loading...");
  const resp = await axios.get("v2/api/get_ppays/", {
    headers: {
      Authorization: `Bearer ${await access_tok("/seller/pay/", router)}`,
    },
  });
  if (resp.data["done"]) {
    spays.value = resp.data["result"];
    has_load.value = true;
    load.dismiss();
  }
};
get_spays();
const encaisser = async () => {
  if (!spays.value.solde)
    return show_alert("Retrait impossible", "Votre solde est insuffisant.");
  if (spays.value.has_retr)
    return show_alert(
      "Retrait impossible",
      "Vous avez déjà un retrait en cours."
    );
  const load = await showLoading("Loading...");
  const resp = await axios.get("v2/api/encaisser/?for=patner", {
    headers: {
      Authorization: `Bearer ${await access_tok("/seller/pay/", router)}`,
    },
  });
  if (resp.data["done"]) {
    load.dismiss();
    await get_spays();
  }
};
</script>  
