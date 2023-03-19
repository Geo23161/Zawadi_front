<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/patner/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Demandes recueillie</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-segment color="tertiary" :value="root">
        <ion-segment-button @click="root = 'En attente'" value="En attente">
          <ion-label>En attente</ion-label>
        </ion-segment-button>
        <ion-segment-button @click="root = 'En cours'" value="En cours">
          <ion-label>En cours</ion-label>
        </ion-segment-button>
        <ion-segment-button @click="root = 'Finalisé'" value="Finalisé">
          <ion-label>Finalisé</ion-label>
        </ion-segment-button>
      </ion-segment>
      <div style="">
        <div class="ion-padding" v-if="dis.length" >
          <div v-for="d in dis" :key="d.id" @click="router.push('/patner/dem/' + d.id)" class="d_sp dem">
            <div class="dem_h">
              <div class="stats">
                <div
                  :style="{ 'background-color': d.demand.get_color }"
                  class="indic"
                ></div> 
                <div class="stat_title">{{ d.demand.state }}</div>
              </div>
              <div class="dem_menu">
                <ion-icon :icon="caretForwardCircle" />
              </div>
            </div>
            <div class="dem_body">
              <div
                :style="{
                  'min-width': '32px',
                  'min-height': '32px',
                  'border-radius': '5px',
                  'background-size': 'cover',
                  'background-position': 'top center',
                  'background-image': `url('${d.demand.rep_picture}')`,
                  'margin-right': '1rem',
                }"
              ></div>
              <div class="dem_text">{{d.demand.get_subs}}</div>
            </div>
            <div class="dem_foot">
              <div>
                <div class="unit">{{d.demand.num}}</div>
                <div class="sub_unit">unités</div>
              </div>
              <div>
                <div class="unit">{{d.demand.bdg}}F</div>
                <div class="sub_unit">budget prévu</div>
              </div>
              <div>
                <div class="unit">{{d.demand.get_duration}}</div>
                <div class="sub_unit">il y a</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="ion-padding">
          <div
            style="
              display: flex;
              justify-content: space-around;
              padding-top: 8rem;
              padding-bottom: 1rem;
            "
          >
            <img src="../../public/assets/img/empty.svg" />
          </div>
          <div style="text-align: center">Pas de demandes {{root}}</div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.sub_unit {
  color: rgb(48, 48, 48);
  font-weight: 300;
}

.unit {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgb(48, 48, 48);
}

.dem_foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}

.dem_text {
  color: rgb(48, 48, 48);
  font-size: 1.1rem;
}

.dem_body {
  display: flex;
  align-items: center;
  padding-top: 0.4rem;
  padding-bottom: 0.5rem;
}

.dem_menu:hover {
  background-color: rgba(128, 128, 128, 0.118);
  border-radius: 10px;
}

.dem_menu {
  padding-top: 0.4rem;
  padding-bottom: 0.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.stat_title {
  color: rgb(48, 48, 48);
}

.indic {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: 0.3rem;
}

.stats {
  display: flex;
  align-items: center;
}

.dem_h {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dem:active {
  background: rgb(240, 240, 240);
}

.dem {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.d_sp {
  margin-top: 0.9rem;
  margin-bottom: 0.9rem;
}
</style>

<script setup lang="ts" >
import { access_tok } from "@/global/patner_auth";
import { showLoading } from "@/global/seller_auth";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  onIonViewDidEnter,
} from "@ionic/vue";
import { ref, watch } from "vue";
import axios from "axios";
const dis = ref<any[]>([])
const router = useRouter()
const get_dis = async () => {
  const load = await showLoading('Loading...')
  const resp = await axios.get('v2/api/get_dis?root=' + root.value, {
    headers : {
      Authorization : `Bearer ${await access_tok('/patner/dem/', router, load)}`
    }
  })
  if (resp.data['done']){
    dis.value = resp.data['result']
    load.dismiss()
  }
}

const root = ref("En attente");
watch(root, (newr, oldr) => {
   get_dis()
})

onIonViewDidEnter( async () => {
  await get_dis()
})

import { ellipsisVertical, caretForwardCircle } from "ionicons/icons";
import { NTabs, NTabPane } from "naive-ui";
import { useRouter } from "vue-router";
</script>
