<template>
  <ion-modal mode="ios" :is-open="isOpen">
    <ion-header>
      <ion-toolbar>
        <ion-title>Localisation</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="close()">Fermer</ion-button>
        </ion-buttons>
        <ion-buttons v-if="quart.name != '' " slot="end">
          <ion-button color="secondary" @click="done(quart)">Valider</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div style="color: rgb(41, 41, 41); padding-bottom: 1rem">
        Entrez et recherchez le nom de votre quartier ou d'un lieu connu proche
      </div>
      <ion-searchbar
        @ionInput="(e) => (place = e.target.value)"
        placeholder="entrez..." @keyup.enter="get_quart()"
      ></ion-searchbar>
      <div style="display: flex; justify-content: space-around">
        <ion-button @click="get_quart()" expand="full">Rechercher</ion-button>
      </div>
      <div v-if="place == ''">
        <div
          style="
            display: flex;
            justify-content: space-around;
            padding-top: 3rem;
            padding-bottom: 1rem;
          "
        >
          <img src="../../public/assets/img/locat.svg" style="width: 100%" />
        </div>
        <div style="text-align: center; padding: 0.7rem">
          Veuillez entrer le nom de votre quartier ou choisissez le resultat le
          plus proche de vous.
        </div>
      </div>
      <div v-if="place != '' && not_found">
        <div>
          <div
            style="
              display: flex;
              justify-content: space-around;
              padding-top: 3rem;
              padding-bottom: 1rem;
            "
          >
            <img src="../../public/assets/img/r_city.svg" style="width: 100%" />
          </div>
          <div style="text-align: center; padding: 0.7rem">
            Aucun lieu trouvé correspondant à votre recherche
          </div>
        </div>
      </div>
      <div
        v-if="is_searching"
        style="padding: 5rem; display: flex; justify-content: space-around"
      >
        <div>
          <ion-spinner name="lines"></ion-spinner>
        </div>
        <div style="text-align: center; margin-top: 0.9rem;" >
          Patienter quelques secondes...
        </div>
      </div>
      <div v-if="quarts.length" style="padding-top: 1rem">
        <ion-item
          v-for="q in quarts"
          :key="`${q.name}:${q.lat}`"
          @click="includes_quart(q)"
          button
        >
          <ion-checkbox
            :checked="q.name == quart.name && q.lat == quart.lat && q.lng == quart.lng"
            slot="start"
          ></ion-checkbox>
          <ion-label class="ion-text-wrap" >{{q.name}}</ion-label>
          <ion-avatar slot="end">
            <img
              :alt="q.name"
              :src="q.icon"
            />
          </ion-avatar>
        </ion-item>
      </div>
      <div v-if="quart.name != ''" style="padding: 1rem;" >
        <ion-button @click="done(quart)" mode="md" expand="full">Valider</ion-button>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script  >
import { defineComponent, defineProps, ref, defineEmits, watch } from "vue";
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonModal,
  IonIcon,
  IonAvatar,
  IonCheckbox,
  IonSearchbar
} from "@ionic/vue";
import { location } from "ionicons/icons";
import axios from "axios";

export default defineComponent({
  props : {
    isOpen : Boolean
  },
  components : {
    IonSearchbar,
    IonCheckbox, 
    IonAvatar
  },
  setup(prop, { emit }) {
    const country = ref();
    const emits = defineEmits(["close", "done"]);
    const close = () => {
      emit("close");
    };
    const done = (quart) => {
      emit("done", JSON.stringify(quart));
    };
    const place = ref("");
    const quarts = ref([]);
    const quart = ref({
      name: "",
    });
    const is_searching = ref(false);
    const url_base = "https://zawadi.onrender.com/";
    const not_found = ref(false);
    const includes_quart = (q) => {
      if(quart.value.name == q.name && quart.value.lat == q.lat && quart.value.lng == q.lng){
        quart.value = {
          name : ""
        }
      }else {
        quart.value = q
      }
    }
    const get_quart = () => {
      if(place.value){
      quarts.value = [];
      is_searching.value = true;
      not_found.value = false;
      axios({
        method: "GET",
        url: `${url_base}search_place/${place.value}/`,
      })
        .then((resp) => {
          if (resp.data["done"]) {
            const results = resp.data["result"];
            if (results.length) {
              for (const elt of results) {
                quarts.value.push({
                  name: elt.name,
                  lat: elt.geometry.location.lat,
                  lng: elt.geometry.location.lng,
                  icon: elt.icon,
                });
              }
            } else {
              not_found.value = true;
            }
          }
          is_searching.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
        }
    };

    watch(place, (newp, oldp) => {
      if(newp == ''){
        quarts.value = []
        is_searching.value = false
      }
    })

    return {
      close,
      done,
      place,
      quarts,
      location,
      is_searching,
      get_quart,
      not_found,
      quart,
      includes_quart
    };
  },
});
</script>
