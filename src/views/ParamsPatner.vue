<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/patner/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Parametres</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="has_load">
      <ion-item>
        <ion-avatar slot="start">
          <img src="../../public/assets/img/user.png" />
        </ion-avatar>
        <ion-label>
          <h3>{{ params.name }}</h3>
          <p>{{ params.p_count }} produits vendus</p>
        </ion-label>
      </ion-item>
      <input
        style="display: none"
        id="myInp"
        type="file"
        accept="image/*"
        name="picture"
      />
      <ion-item @click="click_pic()" button detail="true">
        <ion-avatar slot="start">
          <img :src="params.picture" />
        </ion-avatar>
        <ion-label> Changer le profil </ion-label>
      </ion-item>
      <ion-item @click="iOpen = true" button detail="true">
        <ion-icon :icon="person" slot="start" />
        <ion-label> Modifier mes informations </ion-label>
      </ion-item>
      <ion-item button @click="pOpen = true" detail="true">
        <ion-icon :icon="key" slot="start" />
        <ion-label>Changer Mot de passe </ion-label>
      </ion-item>
      <div class="mytitle">Comptes Mobile Money</div>

      <div style="padding-top: 0.5rem">
        <ion-list v-if="params.momos.length" >
          <ion-item
            v-for="momo in params.momos"
            :key="momo.id"
            button
          >
            <ion-radio
              color="tertiary"
              :checked="momo.id == params.cur_momo" 
            @click="set_momo(momo.id)"
              slot="start"
            ></ion-radio>
            <ion-label 
            @click="set_momo(momo.id)" >
              <h3>{{ momo.number }}</h3>
              <p>{{ momo.get_name }}</p>
            </ion-label>
            <ion-button
              @click="open_sys_lnk(`${momo.get_piece}`)"
              color="tertiary"
              slot="end"
            >
              <ion-icon slot="icon-only" :icon="eye"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-list>

        <ion-list v-else>
          <div
            style="display: flex; justify-content: space-around; padding: 2rem"
          >
            <img src="../../public/assets/img/not_cat.svg" style="width: 60%" />
          </div>
          <div
            style="
              text-align: center;
              padding-left: 1.5rem;
              padding-right: 1.5rem;
            "
          >
            Vous n'avez pas encore ajouté des comptes momos pour ce compte
          </div>
        </ion-list>
        <div style="padding: 1rem">
          <ion-button @click="mOpen = true" color="tertiary" expand="full"
            >Ajouter un compte</ion-button
          >
        </div>
      </div>
      <div style="text-align: center; font-size: 0.9rem; padding: 0.5rem">
        Le compte sélectionné est celui sur lequel seront envoyés les retraits.
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
        <ion-content class="ion-padding"> </ion-content>
      </ion-modal>
      <update-password
        :isOpen="pOpen"
        :picture="params.picture"
        @close="pOpen = false"
        @done="reload"
      ></update-password>
      <update-info
        :isOpen="iOpen"
        :picture="params.picture"
        :info="params.info"
        @close="iOpen = false"
        @done="reload"
      ></update-info>
      <add-momo
        :isPatner="true"
        :isOpen="mOpen"
        :picture="params.picture"
        @close="mOpen = false"
        @done="reload"
      ></add-momo>
    </ion-content>
    <ion-content v-else>
      <div style="min-height: 92vh"></div>
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
</style>

<script setup>
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonModal,
  onIonViewWillEnter,
  IonAvatar
} from "@ionic/vue";
import { person, key, cashOutline, eye } from "ionicons/icons";
import { showLoading } from "@/global/seller_auth";
import { access_tok } from "@/global/patner_auth";
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import UpdateInfo from "@/components/PatnerUpdateInfo.vue";
import UpdatePassword from "@/components/PatnerUpdatePassword.vue";
import AddMomo from "@/components/AddMomo.vue";

const open_sys_lnk = (url) => {
  window.location.href = url
};
const has_load = ref(false);
const params = ref();
const get_params = async () => {
  const load = await showLoading("Loading...");
  const res = await axios.get("v2/api/get_pparams/", {
    headers: {
      Authorization: `Bearer ${await access_tok("/patner/params/", router)}`,
    },
  });
  if (res.data["done"]) {
    params.value = res.data["result"];
    has_load.value = true;
    load.dismiss();
  }
};
const mOpen = ref(false);
const pOpen = ref(false);
const iOpen = ref(false);
const click_pic = () => {
  document.getElementById("myInp").click();
};

const reload = async () => {
  pOpen.value = false;
  mOpen.value = false;
  iOpen.value = false;
  await get_params();
};

const set_momo = async (id) => {
  const load = await showLoading("Changement...");
  const form = new FormData();
  form.append("id", `${id}`);
  const resp = await axios.post("v2/api/set_momo/?for=patner", form,{
    headers: {
      Authorization: `Bearer ${await access_tok("/patner/params/", router, load)}`,
    },
  });
  if (resp.data["done"]) {
    load.dismiss();
    await reload();
  }
};

onIonViewWillEnter(async () => {
  await get_params();
  setTimeout(() => {
    document.getElementById("myInp").addEventListener("change", async (e) => {
      const load = await showLoading();
      const form = new FormData();
      form.append("picture", document.getElementById("myInp").files[0]);
      const resp = await axios({
        url: "v2/api/set_ppicture/",
        method: "POST",
        data: form,
        headers: {
          Authorization: `Bearer ${await access_tok(
            "/patner/params/",
            router
          )}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (resp.data["done"]) {
        params.value.picture = resp.data["result"];
        load.dismiss();
      }
    });
  }, 500);
});
</script>