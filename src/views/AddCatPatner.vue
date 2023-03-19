<template>
  <ion-page>
    <ion-header mode="ios">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/patner/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Choisissez votre Catégorie</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="!has_load">
      <div style="min-height: 95vh"></div>
    </ion-content>
    <ion-content v-else>
      <div class="body_all">
        <div class="aid">
          <div style="margin-right: 0.4rem;" >
            <ion-button @click="go_back()" color="secondary" >
              <ion-icon slot="icon-only" :icon="arrowBack" ></ion-icon>
            </ion-button>
          </div>
          <div>Choississez une catégorie</div>
        </div>
        <div id="product" v-if="stp < 4">
          <transition name="down">
            <div class="choose_cont" id="label" v-if="!stp">
              <ion-list style="background: rgb(238, 238, 238)">
                <div v-for="l in get_cur_elts(stp)" :key="l.id" class="d_sp">
                  <ion-item @click="(label = l.id), stp++" button detail="true">
                    <ion-avatar slot="start">
                      <img :src="l.get_picture" />
                    </ion-avatar>
                    <ion-label> {{ l.name }} </ion-label>
                  </ion-item>
                </div>
              </ion-list>
            </div>
          </transition>
          <transition name="down">
            <div class="choose_cont" id="cat" v-if="stp == 1">
              <ion-list style="background: rgb(238, 238, 238)">
                <div v-for="c in get_cur_elts(stp)" :key="c.id" class="d_sp">
                  <ion-item @click="stp++, (cat = c.id)" button detail="true">
                    <ion-avatar slot="start">
                      <img :src="c.get_picture" />
                    </ion-avatar>
                    <ion-label> {{ c.name }} </ion-label>
                  </ion-item>
                </div>
              </ion-list>
            </div>
          </transition>
          <transition name="down">
            <div class="choose_cont" id="sub" v-if="stp == 2">
              <ion-list style="background: rgb(238, 238, 238)">
                <div v-for="s in get_cur_elts(stp)" :key="s.id" class="d_sp">
                  <ion-item @click="(sub = s.id), stp++, ssub = 0" button detail="true">
                    <ion-avatar slot="start">
                      <img :src="s.get_picture" />
                    </ion-avatar>
                    <ion-label> {{ s.name }} </ion-label>
                  </ion-item>
                </div>
              </ion-list>
            </div>
          </transition>
          <transition name="down">
            <div class="choose_cont" id="ssub" v-if="stp == 3">
              <ion-list style="background: rgb(238, 238, 238)">
                <div v-for="ss in get_cur_elts(stp)" :key="ss.id" class="d_sp">
                  <ion-item @click="ssub == ss.id? ssub = 0 : (ssub = ss.id)" button >
                    <ion-label> {{ ss.name }} </ion-label>
                    <ion-checkbox
                      color="primary"
                      mode="ios"
                      :checked="ssub == ss.id"
                      slot="start"
                    ></ion-checkbox>
                  </ion-item>
                </div>
              </ion-list>
            </div>
          </transition>
        </div>
        <div id="detail" v-if="false">
          <div class="choose_cont">
            <ion-list style="background: rgb(238, 238, 238)">
              <div class="d_sp">
                <div style="text-align: center; padding: 0.8rem; " >Livrez-vous ce type de produits?</div>
                <ion-item >
                  
                  <ion-textarea :auto-grow="true" 
                    :value="livraison"
                    @ionInput="(e) => (livraison = e.target.value)"
                    placeholder="oui ou non... si oui, donnez une description(prix, villes)"
                  ></ion-textarea>
                </ion-item>
              </div>
            </ion-list>
          </div>
        </div>
        <div style="padding: 1rem" v-if="ssub != 0 && stp == 3" >
          <ion-button @click="add_sub()" expand="full" color="secondary"
            >Ajouter cette catégorie</ion-button
          >
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.quest {
  color: rgb(48, 48, 48);
  text-align: center;
}

.d_sp {
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
}

.choose_cont {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 3rem;
}

.quote {
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  background: white;
  width: 100%;
  color: rgb(48, 48, 48);
  border-radius: 10px;
  text-align: center;
  font-size: 1.1rem;
}

.zwd_q {
  min-width: 40px;
  width: 40px;
  min-height: 40px;
  height: 40px;
  border-radius: 100%;
}

.quote_cont {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  display: flex;
  align-items: center;
}

.menu:active,
.menu_:active {
  box-shadow: none;
  background: white;
  color: #f25765;
}

.menu {
  padding-top: 0.4rem;
  padding-bottom: 0.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #f25765;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px #f257646d, 0 4px 6px -2px #f2576443;
}
.menu_cont {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  display: flex;
  justify-content: space-between;
}
.body_all {
  width: 100vw;
  height: 100vh;
  background-color: rgb(238, 238, 238);
}
.aid {
  padding-top: 1rem;
  text-align: center;
  font-size: 1.12rem;
  color: rgb(63, 63, 63);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script setup lang="ts" >
import { showLoading } from "@/global/seller_auth";
import { access_tok } from "@/global/patner_auth";
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { IonPage, IonContent, IonItem, IonButton, IonButtons, IonBackButton } from "@ionic/vue";
import {
  arrowBack
} from "ionicons/icons";
const router = useRouter();
const route = useRoute();
const stp = ref(0);

const label = ref(0);

const cat = ref(0);

const sub = ref(0);

const ssub = ref(0);
const has_load = ref(false);
const labels = ref<any[]>([]);
const livraison = ref("");
const once_charged = ref(false);

const get_cur_elts = (stp_: number) => {
  let elts: any[] = [];
  switch (stp_) {
    case 0:
      elts = labels.value;
      break;
    case 1:
      for (const elt of labels.value) {
        if (elt.id == label.value) {
          elts = elt.cats;
        }
      }
      break;
    case 2:
      for (const elt of labels.value) {
        for (const catt of elt.cats) {
          if (catt.id == cat.value) elts = catt.subs;
        }
      }
      break;
    case 3:
      for (const elt of labels.value) {
        for (const catt of elt.cats) {
          let subb: any;
          if (catt.id == cat.value) {
            for (subb of catt.subs) {
              if (subb.id == sub.value) elts = subb.subs;
            }
          }
        }
      }
      if (elts.length == 1 && !once_charged.value) add_sub(), once_charged.value = true;
      break;
  }
  return elts;
};
const get_tree_cats = async () => {
  const load = await showLoading("Loading...");
  axios({
    url: "v2/api/get_tree_cats/",
    method: "GET",
  })
    .then((resp) => {
      if (resp.data["done"]) {
        labels.value = resp.data["result"];
        load.dismiss();
        has_load.value = true;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const rigth_typ = (_stp: number) => {
  let typ = 0;
  switch (_stp) {
    case 1:
      typ = label.value;
      break;
    case 2:
      typ = cat.value;
      break;
    case 3:
      typ = sub.value;
      break;
    case 4:
      typ = ssub.value;
      break;
  }
  return typ;
};

const go_back = () => {
  if (stp.value) {
    if (stp.value == 4) {
      if (get_cur_elts(3).length == 1) {
        stp.value = 2;
      } else stp.value = stp.value - 1;
    } else {
      stp.value = stp.value - 1;
    }
  } else router.back();
};

const add_sub = async () => {
  const load = await showLoading("Ajout...");
  const resp = await axios({
    url: "v2/api/padd_sub/",
    method: "POST",
    data: {
      subp: ssub.value ? ssub.value : sub.value,
      livraison: livraison.value,
    },
    headers: {
      Authorization: `Bearer ${await access_tok(
        `/patner/add/`,
        router, undefined
      )}`,
    },
  });
  if (resp.data["done"]) {
    load.dismiss();
    router.push(`/patner/cat/${resp.data["result"]}`);
  }
};
get_tree_cats();
</script>
