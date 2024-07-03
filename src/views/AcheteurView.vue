<template>
  <ion-page id="main-content">
    <ion-content>
      <ion-menu class="poino" content-id="main-content">
        <ion-header mode="ios">
          <ion-toolbar>
            <ion-title>Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item detail="true" color="primary" button>
              <ion-avatar slot="start">
                <img src="../../public/assets/img/zwd.png" />
              </ion-avatar>
              <ion-label> Zawadi Acheteur </ion-label>
            </ion-item>
            <ion-item detail="true" @click="open_norm_lnk('/seller')" button>
              <ion-avatar slot="start">
                <img src="../../public/assets/img/zwd_v.png" />
              </ion-avatar>
              <ion-label> Zawadi Vendeur </ion-label>
            </ion-item>
            <ion-item @click="open_norm_lnk('/patner')" detail="true" button>
              <ion-avatar slot="start">
                <img src="../../public/assets/img/zwd_m.jpg" />
              </ion-avatar>
              <ion-label> Zawadi Partenaire </ion-label>
            </ion-item>
            <ion-item
              detail="true"
              @click="open_norm_lnk('https://apiv2.zawadi.site/blog')"
              button
            >
              <ion-avatar slot="start">
                <img src="../../public/assets/img/zwd_b.png" />
              </ion-avatar>
              <ion-label> Zawadi Blog </ion-label>
            </ion-item>
            <ion-item
              detail="true"
              @click="open_norm_lnk('https://blogv2.zawadi.site/privacy')"
              button
            >
              <ion-icon :icon="accessibility" slot="start"></ion-icon>
              <ion-label> Politique de confidentialité</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
        <ion-footer mode="ios">
          <ion-toolbar>
            <ion-title> &copy; Elife Global</ion-title>
          </ion-toolbar>
        </ion-footer>
      </ion-menu>
      <div class="body_all">
        <div class="fixed">
          <div class="menu_cont">
            <ion-menu-toggle :autoHide="false">
              <div class="menu">
                <ion-icon :icon="menu" />
              </div>
            </ion-menu-toggle>
            <div @click="router.push('/profil')">
              <!---
              <ion-icon :icon="person" />
              -->
              <img
                class="dmenu"
                src="../../public/assets/img/user.png"
                style="width: 40px"
              />
            </div>
          </div>
          <div class="body_cont">
            <div class="zwd_cont">
              <div>
                <img src="../../public/assets/img/zwd.png" class="zwd" />
              </div>
            </div>
            <div class="caret">
              <div style="padding: 0%; margin: 0%">
                <ion-icon :icon="caretUp" size="large" />
              </div>
            </div>
            <div class="my_input white" v-show="!has_registered">
              De quoi avez-vous besoin?
            </div>
            <transition name="down">
              <div v-show="has_registered" class="my_input rose">
                Votre demande a bien été enregistrée
              </div>
            </transition>
            <div class="myr_input" @click="router.push('/choosing')">
              <div>Cliquez ici...</div>
              <div class="myicon">
                <ion-icon :icon="caretForwardCircle" />
              </div>
            </div>
          </div>
        </div>
        <div class="dems_cont" v-if="dems.length">
          <div class="title_cont">Dernières demandes</div>

          <div
            v-for="d in dems"
            :key="d.id"
            class="d_sp dem"
            :class="{ white: id != d.id, rose: id == d.id && has_registered }"
          >
            <div class="dem_h">
              <div class="stats">
                <div
                  :style="{ 'background-color': d.get_color }"
                  class="indic"
                ></div>
                <div class="stat_title">{{ d.state }}</div>
              </div>
              <div class="dem_menu" @click="presentActionSheet(d)">
                <ion-icon :icon="ellipsisVertical" />
              </div>
            </div>
            <div class="dem_body">
              <div
                :style="{
                  'min-width': '42px',
                  'min-height': '42px',
                  'border-radius': '10px',
                  'background-size': 'cover',
                  'background-position': 'top center',
                  'background-image': `url('${d.rep_picture}')`,
                  'margin-right': '1rem',
                }"
              ></div>
              <div class="dem_text">{{ d.get_subs }}</div>
            </div>
            <div class="dem_foot">
              <div>
                <div class="unit">{{ d.num }}</div>
                <div class="sub_unit">unités</div>
              </div>
              <div>
                <div class="unit">{{ d.bdg }}F</div>
                <div class="sub_unit">budget prévu</div>
              </div>
              <div>
                <div class="unit">{{ d.get_duration }}</div>
                <div class="sub_unit">il y a</div>
              </div>
            </div>
          </div>
          <div v-if="dem_load" style="text-align: center; padding-top: 0.8rem">
            <ion-spinner name="dots"></ion-spinner>
          </div>
          <div
            v-if="!dem_over && !dem_load"
            style="display: flex; justify-content: space-around"
          >
            <div>
              <ion-button @click="p++, get_dems()">
                <ion-icon :icon="caretDownCircle"></ion-icon>
                <div style="padding-left: 0.5rem">Voir plus</div>
              </ion-button>
            </div>
          </div>
          <div v-if="no_data" style="text-align: center; padding-top: 0.5rem">
            Plus de données
          </div>
        </div>
        <!---
        <div v-else>
          <div class="d_sp" style="padding-left: .5rem; padding-right: 1.5rem; padding-top: 1.5rem;">
            <ion-card mode="ios" color="primary" >
              <ion-card-header>
                <ion-card-title>
                  <div class="title_card">
                    <div style="margin-right: 0.6rem" class="1-circle-fill">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-1-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312V4.002Z"
                        />
                      </svg>
                    </div>
                    <div>Faites votre demande </div>
                  </div>
                </ion-card-title>
              </ion-card-header>

              <ion-card-content>
                Here's a small text description for the card content. Nothing
                more, nothing less.
              </ion-card-content>
            </ion-card>
          </div>
        </div>
        --->
      </div>
    </ion-content>
    <ion-modal mode="ios" :is-open="false">
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
    <ion-modal :is-open="pOpen">
      <ion-content>
        <ion-toolbar>
          <ion-title>Regler les vendeurs</ion-title>
          <ion-buttons slot="end">
            <ion-button color="light" @click="pOpen = false">Fermer</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-list v-if="!checking_pay" class="ion-padding">
          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>Mobile Money Vendeur</th>
                <th>A payer</th>
                <th>Pour</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ps in cur_dem.get_pays_lis" :key="ps.seller_s">
                <td>{{ ps.momo }}</td>
                <td>{{ ps.amount }}</td>
                <td>{{ ps.prods }}</td>
              </tr>
            </tbody>
          </n-table>
          <div style="padding: 1rem">
            <ion-button type="submit" @click="check_sellers_pays()" expand="full">J'ai payé</ion-button>
          </div>
        </ion-list>
        <ion-list v-else>
          <div>
            <div class="mytitle_">En attente de confirmation des vendeurs</div>
            <div
              style="
                display: flex;
                justify-content: space-around;
                padding-top: 1rem;
                padding-bottom: 0.9rem;
              "
            >
              <img src="../../public/assets/img/paty.svg" style="width: 60vw" />
            </div>
            <div style="text-align: center">
              <ion-spinner color="primary" name="dots"></ion-spinner>
            </div>
          </div>
        </ion-list>
      </ion-content>
    </ion-modal>
    <show-version
      v-if="version"
      :isOpen="false"
      :version="version"
      :platform="platform"
      @close="uOpen = false"
    ></show-version>
  </ion-page>
</template>

<script setup lang="ts">
interface VersionObj {
  version: number | string;
  title: string;
  image: string;
  description: string;
  action: {
    ios: string;
    android: string;
    web: string;
  };
  in_apps: string[];
}

import ShowVersion from "../components/ShowVersion.vue";
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonContent,
  IonButton,
  IonMenu,
  IonMenuToggle,
  IonList,
  IonSpinner,
  actionSheetController,
  alertController,
  onIonViewDidEnter,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardContent,
  isPlatform,
  IonModal,
  IonAvatar,
} from "@ionic/vue";
import {
  menu,
  caretUp,
  caretForwardCircle,
  ellipsisVertical,
  caretDownCircle,
  person,
  close,
  wallet,
  happy,
  trash,
  sad,
  checkboxSharp,
  accessibility
} from "ionicons/icons";
import {NTable} from "naive-ui"
import { Storage } from "@ionic/storage";
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import axios from "axios";
import { StatusBar } from "@capacitor/status-bar";
import { presentToast, showLoading, show_warn } from "@/global/seller_auth";

StatusBar.setBackgroundColor({ color: "#f25765" });
const pOpen = ref(false);
const my_version = ref(1.1);
const version = ref<VersionObj | undefined>();
const uOpen = ref(false);
const platform = ref("android");
const cur_dem = ref();
const setPlatform = () => {
  if (isPlatform("ios")) platform.value = "ios";
  if (isPlatform("mobileweb")) platform.value = "web";
};
const get_version = async () => {
  const resp = await axios.get("v2/api/get_version/");
  if (resp.data["done"]) {
    version.value = resp.data["result"];
    if (
      version.value?.version != my_version.value ||
      `${version.value?.version}` != `${my_version.value}`
    ) {
      let myap = [] as any[];
      if (version.value?.in_apps) myap = version.value?.in_apps;
      if (myap.includes(platform.value)) uOpen.value = true;
    }
  }
};

setTimeout(() => {
  get_version();
}, 2000);
const router = useRouter();
const route = useRoute();
const storage = new Storage({
  name: "client_info",
});
storage.create();
const has_registered = ref(false);
const id = ref(0);
let email: string | undefined;

const get_email = async () => {
  email = await storage.get("email");
};

watch(cur_dem, (newc, oldc) => {
  if(newc.is_ended == 'waiting') checking_pay.value = true;
  else checking_pay.value = false;
})

const dems = ref<any[]>([]);
const dem_load = ref(false);
const dem_over = ref(false);
const no_data = ref(false);
const p = ref(1);
const get_dems = () => {
  dem_load.value = true;
  axios({
    url: `v2/api/get_dems/?p=${p.value}&email=${email}`,
    method: "GET",
  })
    .then((resp) => {
      if (resp.data["done"]) {
        if (p.value == 1) dems.value = [] as any[];
        dems.value = dems.value.concat(resp.data["result"]);
      } else {
        dem_over.value = true;
        no_data.value = true;
        setTimeout(() => {
          no_data.value = false;
        }, 2500);
      }
      dem_load.value = false;
    })
    .catch((err) => {
      console.log(err);
    });
};

const show_alert = async (title: string, mess: string) => {
  const alert = await alertController.create({
    header: title,
    message: mess,
    buttons: ["OK"],
  });

  await alert.present();
};
const open_sys_lnk = (url: string) => {
  window.location.href = url;
};
const presentActionSheet = async (dem: any) => {
  const buttons: any[] = [];
  const actionSheet = await actionSheetController.create({
    header: dem.get_subs + `  (ID:${dem.unique_id})`,
    buttons: [
      {
        text: dem.can_pay
          ? dem.payment
            ? "Voir mon paiement"
            : "Payer la garantie"
          : "Payer la garantie",
        icon: wallet,
        handler: () => {
          if (dem.can_pay)
            window.location.href = `https://v1.zawadi.site/v2/pay/dem:${dem.id}/`;
          else
            show_alert(
              "Autorisation requise",
              "Vous n'êtes pas encore autorisés à payer la garantie pour cette demande"
            );
        },
      },
      {
        text: dem.satisfied
          ? "Demande déjà satisfaite"
          : "Marquer comme satisfaite",
        icon: dem.satisfied ? checkboxSharp : happy,
        handler: () => {
          if (!dem.satisfied) {
            if (dem.payment) {
              const satisfying = async () => {
                cur_dem.value = dem
                pOpen.value = true
              };
              show_warn(
                "Confirmation requise",
                "Voulez-vous finaliser le payement et marquer cette demande comme satisfaite ?",
                "Oui",
                satisfying
              );
            } else {
              show_alert(
                "Paiement requis",
                "Vous devez d'abord avoir fait un paiement de garantie avant de marquer une demande comme satisfaite."
              );
            }
          } else {
            show_alert(
              "Déjà satisfaite",
              "Cette demande a déjà été satisfaite."
            );
          }
        },
      },
      {
        text: dem.is_remb
          ? "En cours de remboursement.."
          : "Pas Satisfaite! Reclamer un remboursement",
        icon: sad,

        handler: () => {
          if (!dem.is_remb) {
            if (dem.payment && !dem.satisfied) {
              axios({
                url: `v2/api/rembourse/${dem.id}/?email=${email}`,
                method: "GET",
              })
                .then((resp) => {
                  if (resp.data["done"]) {
                    show_alert(
                      "Remboursement enregistré",
                      "Votre demande de remboursement a bien été pris en compte, nous vous contacterons très vite pour proceder au virement."
                    );
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              show_alert(
                dem.satisfied ? "Demande déjà satidfaite" : "Paiement requis",
                dem.satisfied
                  ? "Cette demande a déjà été satisfaite! Ecrivez au service client pour plus."
                  : "Vous devez d'abord avoir fait un paiement avant d'exiger un remboursement."
              );
            }
          } else
            show_alert(
              "En cours de remboursement",
              "Cette demande est déjà en cours de remboursements."
            );
        },
      },
      {
        text: "Supprimer ma demande",
        icon: trash,
        handler: () => {
          const delete_ = async () => {
            const load = await showLoading("Suppression...");
            axios({
              url: `v2/api/delete/${dem.id}/?email=${email}`,
              method: "GET",
            })
              .then((resp) => {
                if (resp.data["done"]) {
                  dems.value = dems.value.filter((e: any) => e.id != dem.id);
                  load.dismiss();
                  presentToast(
                    "bottom",
                    "Votre demande a été supprimée avec succes."
                  );
                }
              })
              .catch((err) => {
                console.log(err);
                load.dismiss();
              });
          };
          show_warn(
            "Confirmation",
            "Êtes-vous sûre de vouloir supprimer cette demande",
            "Oui",
            delete_
          );
        },
      },
    ],
  });
  await actionSheet.present();
};

const open_norm_lnk = (lnk: string) => {
  showLoading("Loading...");
  window.location.href = lnk;
};

const checking_pay = ref(false);
const check_sellers_pays = async () => {
  checking_pay.value = true;
  const load = await showLoading("Loading...");
  const resp = await axios({
    url: `v2/api/check_sellers_pays/${cur_dem.value.id}/?email=${email}`,
    method: "POST",
    data: {
      key: cur_dem.value.unique_id,
      pss: JSON.stringify(cur_dem.value.get_pays_lis),
    },
  });
  if (resp.data["done"]) {
    load.dismiss();
    const interval = setInterval(() => {
      axios({
        url: `v2/api/dem_ended/${cur_dem.value.id}/?email=${email}`,
        method: "POST",
        data: {
          key: cur_dem.value.unique_id,
        },
      }).then(resp => {
        if(resp.data['done']){
          if(resp.data['result'] == 'done'){
            clearInterval(interval);
            pOpen.value = false
            presentToast("top", "Votre demande a été marquée comme satisfaite. Merci!")
          }
        }
      })
    }, 5000);
  }
};

onIonViewDidEnter(() => {
  const has_new = localStorage.getItem("new");
  if (has_new) {
    id.value = parseInt(has_new);
    localStorage.removeItem("new");
  }
  get_email().then(() => {
    get_dems();
    console.log("Work fined");
  });
  if (id.value) {
    setTimeout(() => {
      has_registered.value = true;
    }, 500);
    setTimeout(() => {
      has_registered.value = false;
    }, 3500);
  }
});
</script>

<style scoped>
.mytitle_ {
  padding: 1rem;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  padding-left: 3rem;
  padding-right: 3rem;
  line-height: 1.8rem;
}

ion-modal {
  --height: 80%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
}

ion-modal::part(backdrop) {
  background: #f2b4b9;
  opacity: 1;
}

ion-modal ion-toolbar {
  --background: #007e0a;
  --color: white;
}

.title_card {
  display: flex;
  align-items: center;
}

.dmenu_:active {
  box-shadow: 0 10px 15px -3px #f257646d, 0 4px 6px -2px #f2576443;
  border-radius: 100%;
}

.poino {
  pointer-events: auto;
}

ion-menu::part(backdrop) {
  background-color: #866063c7;
}

ion-menu::part(container) {
  box-shadow: 4px 0px 16px #f2576452;
}

.fixed {
  position: sticky;
  top: 0px;
}

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

.rose {
  background: #f0c5c9;
}

.white {
  background-color: white;
}

.dem {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.d_sp {
  margin-top: 0.9rem;
  margin-bottom: 0.9rem;
}

.title_cont {
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: rgb(63, 63, 63);
}

.dems_cont {
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: rgb(238, 238, 238);
  position: absolute;
  width: 100%;
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

.myr_input:active {
  background-color: #f25765;
  color: white;
}

.myr_input {
  padding-left: 1.1rem;
  padding-right: 0.9rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  font-size: 1.15rem;
  background-color: white;
  border-radius: 15px;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  border-width: 1px;
  border-color: #f25765;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgb(63, 63, 63);
}

.caret {
  display: flex;
  justify-content: space-around;
  padding: 0%;
  margin: 0%;
  color: white;
}

.my_input {
  padding: 1.1rem;
  font-size: 1.1rem;
  border-radius: 15px;
  text-align: center;
  color: rgb(63, 63, 63);
}

.zwd {
  border-radius: 100%;
  width: 110px;
  height: 110px;
  box-shadow: 0 10px 15px -3px #f257646d, 0 4px 6px -2px #f2576443;
}

.zwd_cont {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding-bottom: 0.7rem;
}
.body_cont {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 5vh;
  width: 100%;
}

.menu:active,
.menu_:active {
  box-shadow: none;
  background: white;
  color: #f25765;
}

.menu_ {
  font-weight: bold;
  border-radius: 50%;
  box-shadow: 0 10px 15px -3px #f257646d, 0 4px 6px -2px #f2576443;
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
</style>
