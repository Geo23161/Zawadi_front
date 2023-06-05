<template>
  <ion-page>
    <ion-header v-if="!prods.length">
      <ion-toolbar color="secondary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/seller/home"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ sp.get_subs }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="show_great_warn()">
            <ion-icon color="danger" slot="icon-only" :icon="trash"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-header v-else>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="clear_selec()">
            <ion-icon
              color="danger"
              slot="icon-only"
              :icon="arrowBack"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="download_files(prods)">
            <ion-icon
              color="secondary"
              slot="icon-only"
              :icon="download"
            ></ion-icon>
          </ion-button>
          <ion-button @click="warn_delete()">
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
    <ion-content v-if="sp.get_subs != 'Produits...'">
      <ion-item>
        <ion-avatar slot="start">
          <img :src="sp.get_spicture" />
        </ion-avatar>
        <ion-label>
          <h3>{{ sp.seller_s }}</h3>
          <p>{{ sp.p_count }} produits au total</p>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-icon :icon="location" slot="start"></ion-icon>
        <ion-label class="ion-text-wrap">
          <h3>Livraison</h3>
          <p>{{ sp.livraison }}</p>
        </ion-label>
      </ion-item>
      <div class="" v-if="sp.get_min_max.length">
        <ion-accordion-group :multiple="true" >
          <ion-accordion
            v-for="m_m in sp.get_min_max"
            :key="m_m.id"
            :value="toString(m_m)"
            :toggle-icon="caretDownCircle"
            toggle-icon-slot="start"
          >
            <ion-item
              @click="!m_m.prods.length ? prods_mm(m_m.min, m_m.max) : 0"
              slot="header"
              color="light"
            >
              <ion-label>Entre {{ m_m.min }} et {{ m_m.max }} FCFA</ion-label>
            </ion-item>
            <div
              v-if="m_m.prods.length"
              style="
                padding-left: 1.5rem;
                padding-right: 1.5rem;
                padding-bottom: 1rem;
              "
              slot="content"
            >
              <div v-if="false" class="card">
                <div class="img_cont">
                  <div style="width: 100%">
                    <div class="imgs">
                      <div
                        id="prod:25"
                        class="mr-2 first_m f_border"
                        @click="add_or_remove('prod:25')"
                        :style="{
                          width: '100%',
                          height: '210px',
                          width: '230px',
                          'min-width': '230px',
                          'background-size': 'cover',
                          'background-position': 'top center',
                          'background-image': `url('./assets/img/prod1.jpg')`,
                          'margin-bottom': '0.6rem',
                        }"
                      >
                        <div
                          class="cont_img"
                          :class="{ activ: prods.includes('prod:25') }"
                        >
                          <div
                            id="acti"
                            v-if="prods.includes('prod:25')"
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
                      <div
                        id="prod:24"
                        class="mr-2"
                        @click="add_or_remove('prod:24')"
                        :style="{
                          width: '100%',
                          height: '210px',
                          width: '230px',
                          'min-width': '230px',

                          'background-size': 'cover',
                          'background-position': 'top center',
                          'background-image': `url('./assets/img/prod2.jpg')`,
                          'margin-bottom': '0.6rem',
                        }"
                      >
                        <div
                          class="cont_img"
                          :class="{ activ: prods.includes('prod:24') }"
                        >
                          <div
                            id="acti"
                            v-if="prods.includes('prod:24')"
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
                      <div
                        id="prod:24"
                        class="mr-2"
                        @click="add_or_remove('prod:24')"
                        :style="{
                          width: '100%',
                          height: '210px',
                          width: '230px',
                          'min-width': '230px',

                          'background-size': 'cover',
                          'background-position': 'top center',
                          'background-image': `url('./assets/img/prod2.jpg')`,
                          'margin-bottom': '0.6rem',
                        }"
                      >
                        <div
                          class="cont_img"
                          :class="{ activ: prods.includes('prod:24') }"
                        >
                          <div
                            id="acti"
                            v-if="prods.includes('prod:24')"
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
                      <div
                        id="prod:24"
                        class="mr-2"
                        @click="add_or_remove('prod:24')"
                        :style="{
                          width: '100%',
                          height: '210px',
                          width: '230px',
                          'min-width': '230px',

                          'background-size': 'cover',
                          'background-position': 'top center',
                          'background-image': `url('./assets/img/prod2.jpg')`,
                          'margin-bottom': '0.6rem',
                        }"
                      >
                        <div
                          class="cont_img"
                          :class="{ activ: prods.includes('prod:24') }"
                        >
                          <div
                            id="acti"
                            v-if="prods.includes('prod:24')"
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
                  <div class="name_p">T-shirt Addidas</div>
                  <div class="text_p">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Voluptas neque incidunt fuga? Totam ratione expedita, libero
                    alias itaque ipsam harum voluptatem asperiores, fugit
                    dignissimos tenetur ea quas sapiente praesentium nobis.
                  </div>
                </div>
                <ion-item mode="ios">
                  <ion-checkbox slot="start" color="secondary"></ion-checkbox>
                  <ion-label>Selectionner ce produit</ion-label>
                </ion-item>
              </div>
              <div v-for="prod in m_m.prods" :key="prod.id" class="card">
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
                        id="prod:25"
                        class="mr-2"
                        v-for="img in prod.files"
                        :key="img.id"
                        @click="add_or_remove(img.get_file)"
                        :class="{
                          'first_m f_border': is_first(prod.files, img),
                        }"
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
                  <div v-if="prod.details" >
                          <div class="text_p" v-if="!(cursor == prod.id)" >
                          {{ seen_text(prod.details) }}<a style="color: blue; text-decoration: underline;" v-if="!is_safe(prod.details)" @click="cursor = prod.id" >Voir plus</a>
                        </div>
                        <div class="text_p" v-else >
                          {{prod.details}}<a style="color: blue; text-decoration: underline;"  @click="cursor = 0" >Voir moins</a>
                        </div>
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
            <div
              v-else
              style="
                padding-left: 1.5rem;
                padding-right: 1.5rem;
                padding-bottom: 5rem;
                padding-top: 5rem;
                display: flex;
                justify-content: space-around;
              "
              slot="content"
            >
              <div>
                <ion-spinner color="secondary" name="crescent"></ion-spinner>
              </div>
            </div>
          </ion-accordion>
        </ion-accordion-group>
      </div>
      <div v-else>
        <div class="top_a">
          <img src="../../public/assets/img/s_empty.svg" />
        </div>
        <div style="padding: 1rem">
          Aucun produit de type <strong>{{ sp.get_subs }}</strong> ajouté.
          Veuillez cliquer le bouton + en bas à droite.
        </div>
      </div>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="aOpen = true" color="secondary">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
    <ion-content v-else>
      <div style="min-height: 95vh"></div>
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
    <add-prod
      v-if="sp.get_subs != 'Produits...'"
      :isOpen="aOpen"
      :dname="sp.get_subs"
      :dsubs="sp.id"
      @close="(aOpen = false), reload()"
      @done="reload(), (aOpen = false)"
    ></add-prod>
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
  IonSpinner,
  IonModal,
  IonAvatar,
  IonCheckbox
} from "@ionic/vue";
import AddProd from "../components/AddProd.vue";
import { ref } from "vue";
import {
  add,
  checkmarkDone,
  trash,
  shareSocial,
  location,
  download,
  arrowBack,
} from "ionicons/icons";
import { access_tok, showLoading, show_warn } from "@/global/seller_auth";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const prods = ref<string[]>([]);
const sp = ref({
  get_subs: "Produits...",
  get_min_max: [] as any[],
});
const router = useRouter();
const aOpen = ref(false);
const route = useRoute();
const id = route.params.id;
const get_sp = async () => {
  const load = await showLoading("Loading...");
  try {
    const resp = await axios.get(`v2/api/sub_prod/${id}/`, {
      headers: {
        Authorization: `Bearer ${await access_tok(
          "/seller/product/" + id + "/",
          router,
          load
        )}`,
      },
    });
    if (resp.data["done"]) {
      sp.value = resp.data["result"];
      load.dismiss();
    }
  } catch {
    load.dismiss();
  }
};

get_sp();

const reload = async () => {
  await get_sp();
  const has_mm = localStorage.getItem("mm");
  if (has_mm) {
    aOpen.value = true;
  }
  for (const m_m of sp.value.get_min_max) {
    await prods_mm(m_m.min, m_m.max);
  }
};
const toString = (obj: any) => {
  return JSON.stringify(obj);
};

const add_or_remove = (id: string) => {
  //alert(id + " --> " + JSON.stringify(prods.value))
  if (prods.value.includes(id)) {
    prods.value = prods.value.filter((e: string) => e != id);
  } else {
    prods.value.push(id);
  }
};

const prods_mm = async (min: number, max: number) => {
  const resp = await axios.post(
    "v2/api/prods_mm/" + id + "/",
    {
      min: min,
      max: max,
    },
    {
      headers: {
        Authorization: `Bearer ${await access_tok(
          "/seller/product/" + id + "/",
          router,
          undefined
        )}`,
      },
    }
  );
  if (resp.data["done"]) {
    for (const e of sp.value.get_min_max) {
      if (e.min == min && e.max == max) {
        e.prods = resp.data["result"];
      }
    }
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

const warn_delete = () => {
  show_warn(
    "Confirmation requise",
    `Êtes-vous sûre de vouloir supprimer ces ${prods.value.length} élément${
      prods.value.length > 1 ? "s" : ""
    }`,
    "Confirmer",
    delete_th
  );
};

const is_first = (myl: any[], elt: any) => {
  if (myl[0].id == elt.id) return true;
  else return false;
};

const clear_selec = () => {
  prods.value = [] as string[];
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
        "/seller/product/" + id + "/",
        router,
        load
      )}`,
    },
  });
  if (resp.data["done"]) {
    load.dismiss();
    prods.value = [];
    reload()
  }
};

const building_dels = () => {
  const dels: string[] = [];
  for (const m_m of sp.value.get_min_max) {
    for (const prod of m_m.prods) {
      if (check_prod_selec(prod)) {
        dels.push(`prod:${prod.id}`);
      }
      for (const file of prod.files) {
        if (prods.value.includes(file.get_file)) {
          dels.push(`file:${file.id}`);
        }
      }
    }
  }
  return dels;
};

const get_name = (url: string) => {
  for (const m_m of sp.value.get_min_max) {
    for (const prod of m_m.prods) {
      for (const file of prod.files) {
        if (file.get_file == url) {
          return `${sp.value.get_subs}_image_${file.id}`;
        }
      }
    }
  }
  return sp.value.get_subs;
};

const downlooad_file = (blob: string) => {
  const a = document.createElement("a");
  a.href = blob;
  a.target = "_blank";
  // Use a.download if available, it prevents plugins from opening.
  if ("download" in a) {
    a.setAttribute("download", get_name(blob));
  }
  // Add a to the doc for click to work.
  (document.body || document.documentElement).appendChild(a);
  if (a.click) {
    a.click(); // The click method is supported by most browsers.
  }
  // Delete the temporary link.
  a.parentNode?.removeChild(a);
};

const cursor = ref(0)
const is_safe = (txt : string) => {
  if(txt.length < 250) return true;
  else return false
}
const seen_text = (txt : string) => {
  if(is_safe(txt)) return txt;
  else return txt.slice(0, 248) + '...'
}

const get_blob = (url: string) => {
  fetch(url)
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      const data_uri = URL.createObjectURL(blob);
      setTimeout(function () {
      downlooad_file(data_uri);
    }, 400);
    });
};

const show_great_warn = () => {
  show_warn('Êtes-vous sûre ?', 'Cette action est irréversible. Vous supprimer toutes informations liées à cette catégorie de produit', 'Oui', delete_sp);
}

const delete_sp = async () => {
  const load = await showLoading("Loading...");
  const resp = await axios.get('v2/api/delete_sp/' + id + '/', {
    headers : {
      Authorization: `Bearer ${await access_tok(
        "/seller/product/" + id + "/",
        router,
        load
      )}`,
    }
  })
  if(resp.data['done']){
    load.dismiss()
    router.back();
  }
}

const download_files = (files: string[]) => {
  for (const file of files) {
    get_blob(file);
  }
};

</script>