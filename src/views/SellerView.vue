<template>
  <ion-page>
    <ion-menu class="poino" content-id="main-content">
      <ion-header mode="ios">
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item detail="true" @click="router.push('/acheteur')" button>
            <ion-avatar slot="start">
              <img src="../../public/assets/img/zwd.png" />
            </ion-avatar>
            <ion-label> Zawadi Acheteur </ion-label>
          </ion-item>
          <ion-item detail="true" color="secondary" button>
            <ion-avatar slot="start">
              <img src="../../public/assets/img/zwd_v.png" />
            </ion-avatar>
            <ion-label> Zawadi Vendeur </ion-label>
          </ion-item>
          <ion-item @click="router.push('/patner')" detail="true" button>
            <ion-avatar slot="start">
              <img src="../../public/assets/img/zwd_m.jpg" />
            </ion-avatar>
            <ion-label> Zawadi Partenaire </ion-label>
          </ion-item>
          <ion-item
            detail="true"
            @click="open_sys_lnk('https://apiv2.zawadi.site/blog')"
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
      <ion-footer>
        <ion-toolbar mode="ios">
          <ion-title> &copy; Elife Global</ion-title>
        </ion-toolbar>
      </ion-footer>
    </ion-menu>
    <ion-content v-if="has_load">
      <div class="body_all">
        <div class="header">
          <ion-menu-toggle>
            <div class="menu">
              <ion-icon :icon="menu" />
            </div>
          </ion-menu-toggle>
          <div class="title_m">
            <div class="img_cont">
              <img src="../../public/assets/img/zwd_v.png" class="img_m" />
            </div>
            <div class="text_m">Zawadi</div>
          </div>
        </div>
        <div class="seller_cont">
          <div class="seller_prof">
            <div
              :style="{
                'min-width': '45px',
                width: '45px',
                height: '45px',
                'min-height': '45px',
                'border-radius': '100%',
                'background-size': 'cover',
                'background-position': 'top center',
                'background-image': `url('${seller_state.get_picture}')`,
                'margin-right': '0.6rem',
                'border-style': 'solid',
                'border-width': '2px',
                'border-color': '#303030',
              }"
            ></div>
            <div style="font-size: 1.1rem; color: #303030">
              {{ seller_state.seller }}
            </div>
          </div>
          <div @click="router.push('/seller/params')" class="sel_ico">
            <ion-icon :icon="settings" />
          </div>
        </div>
        <div class="money_cont">
          <div class="money">XOF{{ seller_state.solde }}</div>
        </div>
        <div class="money_text">
          Vous avez vendu {{ seller_state.p_count }} produits au total.
        </div>
        <div class="foot" style="padding-left: 1.5rem; padding-right: 1.5rem">
          <div class="divid"></div>
        </div>
        <div class="sfoot">
          <div class="sf_text">
            Vous pouvez retirer
            <ion-icon
              :icon="caretForwardCircle"
              style="position: relative; top: 0.2rem"
            />
          </div>
          <div>
            <button @click="router.push('/seller/pay')" class="my_but">
              Retirer
            </button>
          </div>
        </div>
      </div>
      <div class="sbody">
        <div class="stitle">Vos produits</div>
        <div class="prods_cont" v-if="seller_state.subs.length">
          <div style="width: 100%" class="prods_c">
            <div class="prods" v-for="sub in seller_state.subs" :key="sub.id">
              <div>
                <div
                  :style="{
                    'min-width': '45px',
                    width: '45px',
                    height: '45px',
                    'min-height': '45px',
                    'border-radius': '100%',
                    'background-size': 'cover',
                    'background-position': 'top center',
                    'background-image': `url('${sub.get_picture}')`,
                    'margin-bottom': '0.6rem',
                  }"
                ></div>
              </div>
              <div class="p_cat">{{ sub.get_cat }}</div>
              <div class="p_title">{{ sub.get_subs }}</div>
              <div class="p_divid">
                <div style="padding-bottom: 0.9rem">
                  <button
                    @click="router.push(`/seller/product/${sub.id}`)"
                    class="pbut"
                  >
                    Voir
                  </button>
                </div>
                <div class="divid"></div>
              </div>
              <div style="padding-left: 0.4rem">
                {{ sub.s_count
                }}<span style="color: #8c8c8c">/{{ sub.p_count }}</span> vendus
              </div>
            </div>
          </div>
        </div>
        <div v-else>
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
            Vous n'avez pas encore ajouté les catégories de produits dont vous
            disposez.
          </div>
        </div>
        <div class="add">
          <button
            @click="
              router.push(`/seller/add/?picture=${seller_state.get_picture}`)
            "
            class="addBut"
          >
            Ajouter une categorie
          </button>
        </div>
        <div class="items">
          <ion-list>
            <ion-item @click="router.push('/seller/sold')" button detail="true">
              <ion-label>Voir les produits vendus</ion-label>
              <ion-icon :icon="checkmarkCircle" slot="start"></ion-icon>
            </ion-item>
            <ion-item @click="router.push('/seller/pay')" button detail="true">
              <ion-label>Activité de paiement</ion-label>
              <ion-icon :icon="cash" slot="start"></ion-icon>
            </ion-item>
            <ion-item
              @click="router.push('/seller/params')"
              button
              detail="true"
            >
              <ion-label>Parametres du compte</ion-label>
              <ion-icon :icon="settings" slot="start"></ion-icon>
            </ion-item>
          </ion-list>
        </div>
      </div>
    </ion-content>
    <ion-content v-else>
      <div style="min-height: 95vh"></div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-menu::part(backdrop) {
  background-color: #2dd36f7e;
}

ion-menu::part(container) {
  box-shadow: 4px 0px 16px #2dd36f29;
}

.poino {
  pointer-events: auto;
}

.addBut:active {
  background: #e1e1e1;
}

.addBut {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 5px;
}

.add {
  padding-top: 1.2rem;
  padding-bottom: 0.2rem;
}

.pbut:active {
  background: #575757;
}

.pbut {
  padding: 0.4rem;
  border-radius: 5px;
  background: #303030;
  color: white;
}

.p_divid {
  padding-top: 0.7rem;
  padding-bottom: 0.6rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

.p_title {
  font-size: 1.2rem;
  font-weight: 500;
}

.p_cat {
  font-size: 0.9rem;
  color: #8c8c8c;
  padding-bottom: 0.3rem;
}

.prods {
  padding-left: 1rem;
  padding-right: 1.1rem;
  border-right-style: solid;
  border-right-color: #303030;
  border-right-width: 2px;
  max-width: 180px;
  min-width: 180px;
  width: 180px;
}

.prods_c {
  padding-left: 1rem;
  display: flex;
  align-items: center;
  padding-top: 0.7rem;
  padding-bottom: 1rem;
  overflow-x: scroll;
}

.prods_cont {
  margin-left: -1.5rem;
  margin-right: -1.5rem;
}

.stitle {
  font-size: 1.6rem;
  font-weight: 600;
  padding-bottom: 1rem;
}

.sbody {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 2rem;
  background: white;
  color: #303030;
}

.my_but:active {
  background: #575757;
}

.my_but {
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  padding-left: 0.9rem;
  padding-right: 0.9rem;
  border-radius: 7px;
  background: #303030;
  color: white;
}

.sf_text {
  max-width: 140px;
  font-size: 1.1rem;
}

.sfoot {
  padding-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
}

.divid {
  width: 100%;
  height: 2px;
  background-color: #555454;
}

.foot {
  padding-top: 4rem;
}

.money_text {
  font-size: 1.4rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  padding-top: 1rem;
}

.norm_pad {
  padding-left: 1rem;
  padding-right: 1rem;
}

.money {
  font-size: 2.5rem;
  color: #303030;
}

.money_cont {
  padding-top: 1rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}

.sel_ico:active {
  background: #17a649;
  color: white;
}

.sel_ico {
  padding-bottom: 0.3rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  border-radius: 10px;
}

.seller_prof {
  display: flex;
  align-items: center;
}

.seller_cont {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.4rem;
  padding-bottom: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.img_cont {
  margin-right: 0.3rem;
}

.text_m {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgb(41, 41, 41);
}

.img_m {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.title_m {
  display: flex;
  align-items: center;
}

.menu:active,
.menu_:active {
  box-shadow: none;
  background: white;
  color: #17a649;
}

.menu {
  padding-top: 0.4rem;
  padding-bottom: 0.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #17a649;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px #17a64965, 0 4px 6px -2px #17a74929;
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

.header {
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.d_sp {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.body_all {
  width: 100vw;
  height: max-content;
  background-color: #b0d1d9;
  color: #303030;
  padding-bottom: 2rem;
}
</style>

<script setup lang="ts" >
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonTitle,
  IonMenu,
  IonMenuToggle,
  onIonViewDidEnter,
  IonAvatar,
} from "@ionic/vue";
import { ref } from "vue";
import axios from "axios";
import {
  menu,
  settings,
  caretForwardCircle,
  checkmarkCircle,
  cash,
  accessibility
} from "ionicons/icons";
import { useRouter } from "vue-router";
import {
  access_tok,
  presentToast,
  showLoading,
  show_warn,
} from "../global/seller_auth";
const router = useRouter();
const seller_state = ref();
const has_load = ref(false);
const open_sys_lnk = (url: string) => {
  window.location.href = url;
};
const has_pays = ref<any[]>([]);
const get_seller_state = async () => {
  const load = await showLoading("Loading...");
  const res = await axios.get("v2/api/get_seller_state/", {
    headers: {
      Authorization: `Bearer ${await access_tok(
        "/seller/home",
        router,
        undefined
      )}`,
    },
  });
  if (res.data["done"])
    (seller_state.value = res.data["result"]),
      load.dismiss(),
      (has_load.value = true),
      (has_pays.value = res.data["result"]["has_pays"]);
  if (has_pays.value.length) final_checks();
};
const cursor = ref(0);
const final_checks = async () => {
  const verified_pay = async () => {
    const load = await showLoading("Loading...");
    const resp = await axios({
      url: "v2/api/verified_pay/",
      method: "POST",
      data: {
        token: has_pays.value[cursor.value].token,
      },
      headers: {
        Authorization: `Bearer ${await access_tok(
          "/seller/home",
          router,
          load
        )}`,
      },
    });
    if (resp.data["done"]) {
      load.dismiss();
      presentToast(
        "bottom",
        "Paiement pour la" +
          has_pays.value[cursor.value].dis +
          " marqué comme reçu."
      );
      cursor.value++;
      if (cursor.value + 1 <= has_pays.value.length) final_checks();
    }
  };
  const warn = await show_warn(
    "Confirmation de paiement",
    "Avez-vous reçu un paiement de " +
      has_pays.value[cursor.value].amount +
      " Fcfa pour la " +
      has_pays.value[cursor.value].dis,
    "Oui",
    verified_pay
  );
};

onIonViewDidEnter(() => {
  get_seller_state();
});
</script>
