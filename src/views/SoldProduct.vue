<template>
  <ion-page>
    <ion-header v-if="!prods.length">
      <ion-toolbar color="secondary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/seller/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Produits Vendus</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-header v-else>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="clear_selec()" >
            <ion-icon color="danger"  slot="icon-only" :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="delete_th()" >
            <ion-icon color="danger" slot="icon-only" :icon="trash"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title
          >{{ prods.length }} selectionné<span
            v-html="prods.length > 1 ? 's' : ''"
          ></span
        ></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content  v-if="has_load">
      <ion-item>
        <ion-avatar slot="start">
          <img :src="picture" />
        </ion-avatar>
        <ion-label>
          <h3>{{ name }}</h3>
          <p>{{ all_prods.length }} produits vendus</p>
        </ion-label>
      </ion-item>
      <div  v-if="!all_prods.length">
        <div class="top_a">
          <img src="../../public/assets/img/sold.svg" />
        </div>
        <div style="padding: 1rem">Aucun produit vendu pour le moment!</div>
      </div>
      <div class="ion-padding" v-else>
        <div v-for="prod in all_prods" :key="prod.id" class="card">
          <div
            v-if="prod.files.length == 1"
            @click="add_or_remove(prod.files[0].get_file)"
            :style="{
              width: '100%',
              height: '240px',
              'border-radius': '10px',
              'background-size': 'cover',
              'background-position': 'top center',
              'background-image': `url('${prod.files[0].get_file}')`,
              'margin-bottom': '0.6rem',
            }"
          >
            <div
              class="cont_img"
              :class="{ activ: prods.includes(prod.files[0].get_file) }"
            >
              <div
                id="acti"
                v-if="prods.includes(prod.files[0].get_file)"
                style="
                  display: flex;
                  justify-content: space-around;
                  padding-top: 99px;
                "
              >
                <div>
                  <ion-icon :icon="checkmarkDone" size="large" />
                </div>
              </div>
            </div>
          </div>
          <div class="img_cont" v-else>
            <div style="width: 100%">
              <div class="imgs">
                <div
                  class="mr-2 first_m f_border"
                  v-for="img in prod.files"
                  :key="img.id"
                  @click="add_or_remove(img.get_file)"
                  :style="{
                    width: '100%',
                    height: '210px',
                    width: '230px',
                    'min-width': '230px',
                    'background-size': 'cover',
                    'background-position': 'top center',
                    'background-image': `url('${img.get_file}')`,
                    'margin-bottom': '0.6rem',
                  }"
                >
                  <div
                    class="cont_img"
                    :class="{ activ: prods.includes(img.get_file) }"
                  >
                    <div
                      id="acti"
                      v-if="prods.includes(img.get_file)"
                      style="
                        display: flex;
                        justify-content: space-around;
                        padding-top: 99px;
                      "
                    >
                      <div>
                        <ion-icon :icon="checkmarkDone" size="large" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="corp">
            <div class="name_p">{{ prod.name }}</div>
            <div class="text_p">
              {{ prod.details }}
            </div>
          </div>
          <ion-item @click="selec_prod(prod)" mode="ios">
            <ion-checkbox
              slot="start"
              :checked="check_prod_selec(prod)"
              color="secondary"
            ></ion-checkbox>
            <ion-label>Selectionner ce produit</ion-label>
          </ion-item>
        </div>
      </div>
    </ion-content>
    <ion-content v-else>
      <div style="min-height: 95vh"></div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.top_a {
  padding-top: 15vh;
  display: flex;
  justify-content: space-around;
}

.text_p {
  color: rgb(48, 48, 48);
  padding: 0.3rem;
}

.name_p {
  font-size: 1.1rem;
  font-weight: bold;
  color: rgb(48, 48, 48);
}

.corp {
  padding: 0.3rem;
}

.f_border {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.mr-2 {
  margin-right: 0.2rem;
}

.first_m {
  margin-left: 1.9rem;
}

.imgs {
  display: flex;
  overflow-x: scroll;
}

.img_cont {
  margin-left: -1.9rem;
  margin-right: -1.9rem;
}

.card {
  padding: 0.4rem;
  border-radius: 10px;
  margin-top: 1.52rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.cont_img:active {
  background: rgba(0, 128, 0, 0.152);
}

.activ {
  background: rgba(1, 12, 1, 0.466);
  color: white;
}

.cont_img {
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonAccordion,
  IonAccordionGroup,
  onIonViewDidEnter,
} from "@ionic/vue";
import { ref } from "vue";
import { add, checkmarkDone, trash, shareSocial, arrowBack } from "ionicons/icons";
import { access_tok, showLoading } from "@/global/seller_auth";
import axios from "axios";
import { useRouter } from "vue-router";

const prods = ref<string[]>([]);
const name = ref("");
const picture = ref("");
const has_load = ref(false);
const router = useRouter();
const all_prods = ref<any[]>([]);
const clear_selec = () => {
  prods.value = [] as string[];
};
const get_sold_prods = async () => {
  const load = await showLoading("Loading...");
  const resp = await axios({
    url: "v2/api/sold_prods/",
    headers: {
      Authorization: `Bearer ${await access_tok(`/seller/sold/`, router, load)}`,
    },
  });
  if (resp.data["done"]) {
    load.dismiss();
    has_load.value = true;
    name.value = resp.data["name"];
    all_prods.value = resp.data["result"] as any[];
    picture.value = resp.data["picture"];
  }
};

const add_or_remove = (id: string) => {
  //alert(id + " --> " + JSON.stringify(prods.value))
  if (prods.value.includes(id)) {
    prods.value = prods.value.filter((e: string) => e != id);
  } else {
    prods.value.push(id);
  }
};

const check_prod_selec = (prod: any) => {
  let is_ = false;
  for (const e of prod.files) {
    is_ = prods.value.includes(e.get_file);
    if (is_) break;
  }
  return is_;
};


const selec_prod = (prod: any) => {
  const ol: string[] = [];
  for (const e of prod.files) ol.push(e.get_file);
  if (check_prod_selec(prod)) {
    prods.value = prods.value.filter((e) => !ol.includes(e));
  } else {
    for (const e of prod.files)
      if (!prods.value.includes(e.get_file)) prods.value.push(e.get_file);
  }
};

const building_dels = () => {
  const dels: string[] = [];
  for (const prod of all_prods.value) {
    if (check_prod_selec(prod)) {
      dels.push(`prod:${prod.id}`);
    }
    for (const file of prod.files) {
      if (prods.value.includes(file.get_file)) {
        dels.push(`file:${file.id}`);
      }
    }
  }
  return dels;
};

const delete_th = async () => {
  const load = await showLoading("Loading...");
  const resp = await axios({
    url: "v2/api/delete_th/",
    method : 'POST',
    data: {
      lis: JSON.stringify(building_dels()),
    },
    headers: {
      Authorization: `Bearer ${await access_tok(
        "/seller/sold/",
        router, load
      )}`,
    },
  });
  if (resp.data["done"]) {
    load.dismiss();
    get_sold_prods();
    prods.value = [] as string[];
  }
};

onIonViewDidEnter(async () => {
  await get_sold_prods();
});
</script>