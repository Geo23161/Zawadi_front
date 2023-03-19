<template>
  <ion-page>
    <ion-header v-if="!prods.length">
      <ion-toolbar color="tertiary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/patner/dem"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ name }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="delete_me()">
            <ion-icon slot="icon-only" :icon="trash"></ion-icon>
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
          <ion-button 
              @click="download_files(prods)" >
            <ion-icon
              color="secondary"
              slot="icon-only"
              :icon="download"
            ></ion-icon>
          </ion-button>
          <ion-button @click="vOpen = true">
            <ion-icon
              color="tertiary"
              slot="icon-only"
              :icon="checkbox"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title
          >{{ prods.length }} selectionné<span
            v-html="prods.length > 1 ? 's' : ''"
          ></span
        ></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="has_load">
      <ion-list>
        <ion-item>
          <ion-avatar slot="start">
            <img src="../../public/assets/img/user.png" />
          </ion-avatar>
          <ion-label>
            <h3>{{ mydis.demand.client.get_complete_name }}</h3>
            <p>
              <ion-icon
                :icon="location"
                style="position: relative; top: 0.2rem"
              />
              {{ mydis.demand.get_quart.name }}
            </p>
          </ion-label>
          <ion-buttons slot="end">
            <ion-button @click="set_discus()">
              <ion-icon
                color="secondary"
                slot="icon-only"
                :icon="logoWhatsapp"
              ></ion-icon>
            </ion-button>
            <ion-button
              @click="open_lnk(`tel:${mydis.demand.client.get_phone}`)"
            >
              <ion-icon
                color="primary"
                slot="icon-only"
                :icon="call"
              ></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-item>
        <ion-item>
          <ion-label>
            <h3>Statut</h3>
            <div>
              <div class="stats">
                <div
                  :style="{ 'background-color': mydis.demand.get_color }"
                  class="indic"
                ></div>
                <div class="stat_title">{{ mydis.demand.state }}</div>
              </div>
            </div>
          </ion-label>
          <ion-icon
            :icon="informationCircle"
            size="large"
            slot="start"
          ></ion-icon>
        </ion-item>
      </ion-list>
      <div
        v-if="
          mydis.demand.state == 'En attente' ||
          (mydis.demand.state == 'En discussion' && !mydis.has_validate)
        "
      >
        <div class="mytitle">Produits à proposer</div>
        <div v-if="templates.length">
          <div v-for="sp in templates" :key="sp.id">
            <ion-item>
              <ion-avatar slot="start">
                <img :src="sp.sub_p.get_spicture" />
              </ion-avatar>
              <ion-label>
                <h3>{{ sp.sub_p.get_sname }}</h3>
                <p>{{ sp.sub_p.p_count }} produits</p>
              </ion-label>
              <ion-buttons slot="end">
                <ion-button
                  @click="
                    open_sys_lnk(
                      `whatsapp://send/?phone=${sp.sub_p.get_swhatsapp}&text=J'aimerais proceder au changement de mon mot de passe`
                    )
                  "
                >
                  <ion-icon
                    color="secondary"
                    slot="icon-only"
                    :icon="logoWhatsapp"
                  ></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2>Option de livraison</h2>
                <p>{{ sp.sub_p.livraison }}</p>
              </ion-label>
              <ion-icon :icon="location" slot="end"></ion-icon>
            </ion-item>
            <div class="" v-if="sp.sub_p.get_min_max.length">
              <ion-accordion-group :multiple="true">
                <ion-accordion
                  v-for="m_m in sp.sub_p.get_min_max"
                  :key="m_m.id"
                  :value="toString(m_m)"
                  :toggle-icon="caretDownCircle"
                  toggle-icon-slot="start"
                >
                  <ion-item
                    @click="
                      !m_m.prods.length
                        ? prods_mm(m_m.min, m_m.max, sp.sub_p.id)
                        : 0
                    "
                    slot="header"
                    color="light"
                  >
                    <ion-label
                      >Entre {{ m_m.min }} et {{ m_m.max }} FCFA</ion-label
                    >
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
                          :class="{
                            activ: prods.includes(prod.files[0].get_file),
                          }"
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
                                    <ion-icon
                                      :icon="checkmarkDone"
                                      size="large"
                                    />
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
                          color="tertiary"
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
                      <ion-spinner
                        color="tertiary"
                        name="crescent"
                      ></ion-spinner>
                    </div>
                  </div>
                </ion-accordion>
              </ion-accordion-group>
            </div>
          </div>
        </div>
        <div v-else>
          <div
            style="
              display: flex;
              justify-content: space-around;
              padding-top: 1rem;
              padding-bottom: 0.6rem;
            "
          >
            <img
              src="../../public/assets/img/empty_p.svg"
              style="width: 60vw"
            />
          </div>
          <div style="padding-top: 0.9rem; text-align: center">
            Aucun produit à proposer
          </div>
        </div>
        <div v-if="recoms.length">
          <div class="mytitle">Recommandations</div>
          <div v-for="sp in recoms" :key="sp.id">
            <ion-item>
              <ion-avatar slot="start">
                <img :src="sp.get_spicture" />
              </ion-avatar>
              <ion-label>
                <h3>{{ sp.get_sname }}</h3>
                <p>{{ sp.p_count }} produits</p>
              </ion-label>
              <ion-buttons slot="end">
                <ion-button
                  @click="
                    window.location.href = `whatsapp://send/?phone=${sp.get_swhatsapp}&text=J'aimerais proceder au changement de mon mot de passe`
                  "
                >
                  <ion-icon
                    color="secondary"
                    slot="icon-only"
                    :icon="logoWhatsapp"
                  ></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2>Option de livraison</h2>
                <p>{{ sp.livraison }}</p>
              </ion-label>
              <ion-icon :icon="location" slot="end"></ion-icon>
            </ion-item>
            <div class="" v-if="sp.get_min_max.length">
              <ion-accordion-group :multiple="true">
                <ion-accordion
                  v-for="m_m in sp.get_min_max"
                  :key="m_m.id"
                  :value="toString(m_m)"
                  :toggle-icon="caretDownCircle"
                  toggle-icon-slot="start"
                >
                  <ion-item
                    @click="
                      !m_m.prods.length ? prods_mm(m_m.min, m_m.max, sp.id) : 0
                    "
                    slot="header"
                    color="light"
                  >
                    <ion-label
                      >Entre {{ m_m.min }} et {{ m_m.max }} FCFA</ion-label
                    >
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
                          :class="{
                            activ: prods.includes(prod.files[0].get_file),
                          }"
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
                                    <ion-icon
                                      :icon="checkmarkDone"
                                      size="large"
                                    />
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
                          color="tertiary"
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
                      <ion-spinner
                        color="tertiary"
                        name="crescent"
                      ></ion-spinner>
                    </div>
                  </div>
                </ion-accordion>
              </ion-accordion-group>
            </div>
          </div>
        </div>
      </div>
      <div v-if="mydis.demand.state == 'En discussion' && mydis.has_validate">
        <div class="mytitle">En attente de paiement...</div>
        <div
          @click="copy_inp = false"
          style="
            display: flex;
            justify-content: space-around;
            padding-top: 1rem;
            padding-bottom: 0.6rem;
          "
        >
          <img src="../../public/assets/img/waiting.svg" style="width: 60vw" />
        </div>
        <div style="text-align: center">
          <ion-spinner name="dots"></ion-spinner>
        </div>
        <div
          @click="copy_inp = false"
          style="
            padding-top: 0.8rem;
            text-align: center;
            padding-bottom: 0.9rem;
          "
        >
          Lien de paiement
        </div>
        <div v-if="!copy_inp" @click="activ_copy()" class="link">
          <div class="link_text">
            <div style="width: 100%">
              {{ `https://www.zawadi.site/pay/dem:${mydis.demand.id}/` }}
            </div>
          </div>

          <!---
          <div v-if="false" @click="copy_text(`https://www.zawadi.site/pay/dem:${mydis.demand.id}/`)" class="link_but">
            <ion-icon :icon="copy" />
          </div>
          ---->
        </div>
        <div v-else style="padding: 1rem">
          <ion-item color="tertiary" mode="md" fill="outline">
            <ion-label position="floating">Copier le lien</ion-label>
            <ion-input
              type="text"
              readonly
              :value="`http://192.168.43.244:8000/v2/pay/dem:${mydis.demand.id}/`"
              id="password"
            ></ion-input>
          </ion-item>
        </div>
        <div style="padding: 1rem">
          <ion-button @click="warn_me()" type="submit" expand="full">Annuler</ion-button>
        </div>
      </div>
      <div v-if="mydis.demand.state == 'Satisfaite'">
        <div class="mytitle_">Demande finalisée!</div>
        <div
          style="
            display: flex;
            justify-content: space-around;
            padding-top: 1rem;
            padding-bottom: 0.6rem;
          "
        >
          <img src="../../public/assets/img/success.svg" style="width: 60vw" />
        </div>
        <div
          style="
            padding-top: 0.8rem;
            text-align: center;
            padding-bottom: 0.9rem;
          "
        >
          Félicitation! La demande a été traitée avec success. Votre paiement
          est a été lancé.
        </div>
      </div>
      <div v-if="mydis.demand.state == 'En attente de satisfaction'">
        <div class="mytitle_">
          Paiement reçu! En attente de satisfaction du client...
        </div>
        <div
          style="
            display: flex;
            justify-content: space-around;
            padding-top: 1rem;
            padding-bottom: 0.6rem;
          "
        >
          <img src="../../public/assets/img/wait.svg" style="width: 60vw" />
        </div>
        <div style="text-align: center">
          <ion-spinner name="dots"></ion-spinner>
        </div>
        <div
          style="
            padding-top: 0.8rem;
            padding-left: 0.8rem;
            padding-right: 0.8rem;
            text-align: center;
            padding-bottom: 0.9rem;
          "
        >
          Le client doit valider le produit et marquer la demande comme
          satisfaite
        </div>
      </div>
      <validate-comp
        :isOpen="vOpen"
        :mprods="s_prods"
        :disId="mydis.id"
        @close="vOpen = false"
        @done="reload"
      />
    </ion-content>
    <ion-content v-else>
      <div style="min-height: 90vh"></div>
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
  </ion-page>
</template>

<style scoped>
.text_p {
  color: rgb(48, 48, 48);
  padding: 0.3rem;
}

.name_p {
  font-size: 1.1rem;
  font-weight: bold;
  color: rgb(48, 48, 48);
}

.link_but:active {
  background: rgb(233, 233, 233);
}

.link_but {
  padding: 1rem;
  border-radius: 10px;
}

.link_text {
  padding-left: 1rem;
  padding-right: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  white-space: nowrap;
  overflow: scroll;
}

.link {
  margin-right: 1.5rem;
  margin-left: 1.5rem;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  background: rgb(41, 41, 41);
  border-color: rgb(41, 41, 41);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
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

.mytitle_ {
  padding: 1rem;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  padding-left: 3rem;
  padding-right: 3rem;
  line-height: 1.8rem;
}

.mytitle {
  padding: 1rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
}

.cont_img:active {
  background: rgba(0, 128, 0, 0.152);
}

.activ {
  background: rgba(1, 12, 1, 0.466);
  color: white;
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
  IonModal,
} from "@ionic/vue";
import { computed, ref } from "vue";
import {
  add,
  checkmarkDone,
  trash,
  shareSocial,
  logoWhatsapp,
  location,
  informationCircle,
  checkbox,
  copy,
  call,
  arrowBack,
  clipboard,
  download
} from "ionicons/icons";
import { useRoute, useRouter } from "vue-router";
import { presentToast, showLoading, show_alert, show_warn } from "@/global/seller_auth";
import axios from "axios";
import { access_tok } from "@/global/patner_auth";
import ValidateComp from "@/components/ValidateComp.vue";

const prods = ref<string[]>([]);
const mydis = ref();
const templates = ref<any[]>([]);
const recoms = ref<any[]>([]);
const has_load = ref(false);
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const name = ref("");
const copy_inp = ref(false);
const toString = (obj: any) => {
  return JSON.stringify(obj);
};
const get_mydis = async () => {
  const load = await showLoading("Patientez...");
  const resp = await axios.get(`v2/api/get_mydis/${id}`, {
    headers: {
      Authorization: `Bearer ${await access_tok(
        `/patner/dem/${id}`,
        router,
        load
      )}`,
    },
  });
  if (resp.data["done"]) {
    mydis.value = resp.data["result"]["mydis"];
    templates.value = resp.data["result"]["templates"];
    load.dismiss();
    has_load.value = true;
    name.value = mydis.value.demand.get_subs;
    const refresh_id = mydis.value.not_yet;
    if (refresh_id > 0 && refresh_id < 3) {
      const interval = setInterval(async () => {
        axios
          .get("v2/api/get_state/" + id + "/", {
            headers: {
              Authorization: `Bearer ${await access_tok(
                `/patner/dem/${id}`,
                router,
                load
              )}`,
            },
          })
          .then((resp) => {
            if (resp.data["done"]) {
              if (resp.data["result"] != refresh_id) router.go(0);
            }
          });
      }, 58000);
    }
  }
};

const open_sys_lnk = (url: string) => {
  window.open(url, "_system", "location=yes");
};

const find_prod = (url: string) => {
  for (const temp of templates.value) {
    const sp = temp.sub_p;
    for (const m_m of sp.get_min_max) {
      for (const prod of m_m.prods) {
        for (const file of prod.files) {
          if (url == file.get_file) {
            return prod.id as number;
          }
        }
      }
    }
  }
  return 0;
};

const get_prods = () => {
  const mylist: number[] = [];
  for (const elt of prods.value) {
    const prod = find_prod(elt);
    if (!mylist.includes(prod)) mylist.push(prod);
  }
  return mylist;
};

const prods_mm = async (min: number, max: number, pk: number) => {
  const resp = await axios.post(
    "v2/api/pprods_mm/" + pk + "/",
    {
      min: min,
      max: max,
    },
    {
      headers: {
        Authorization: `Bearer ${await access_tok(
          "/patner/cat/" + id + "/",
          router,
          undefined
        )}`,
      },
    }
  );
  if (resp.data["done"]) {
    for (const temp of templates.value) {
      const sp = temp.sub_p;
      for (const e of sp.get_min_max) {
        if (e.min == min && e.max == max) {
          e.prods = resp.data["result"];
        }
      }
    }
  }
};

const set_discus = async () => {
  const load = await showLoading("COnnexion...");
  const resp = await axios.get("v2/api/set_discuss/" + id + "/", {
    headers: {
      Authorization: `Bearer ${await access_tok(
        "/patner/cat/" + id + "/",
        router,
        load
      )}`,
    },
  });
  if (resp.data["done"]) {
    load.dismiss();
    await reload();
    presentToast("bottom", "Cette demande est passée en discussion");
    open_lnk(
      "whatsapp://send/?phone=" +
        mydis.value.demand.client.get_whatsapp +
        `Comment allez-vous? J'ai reçu votre *${mydis.value.demand.get_subs}*.`
    );
  }
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

const check_prod_selec = (prod: any) => {
  let is_ = false;
  for (const e of prod.files) {
    is_ = prods.value.includes(e.get_file);
    if (is_) break;
  }
  return is_;
};

const clear_selec = () => {
  prods.value = [];
};

const warn_me = () => {
  show_warn("Êtes-vous sûre?", 'Cette action mettra fin au processus de paiement pour les articles selectionnés', "Oui", disable_payment)
}

const disable_payment = async () => {
  const load = await showLoading('Loading....')
  const resp = await axios.get(`v2/api/disable_payment/${id}`, {
    headers : {
      Authorization : `Bearer ${await access_tok('patner/dem/' + id + '/', router, load)}`,
    }
  })
  if(resp.data['done']){
    load.dismiss()
    document.location.reload();
  }
}

const building_dels = () => {
  const dels: string[] = [];
  for (const temp of templates.value) {
    const sp = temp.sub_p;
    for (const m_m of sp.get_min_max) {
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
  }
  return dels;
};

const open_lnk = (lnk: string) => {
  window.location.href = lnk;
};

const token = ref("");

const reload = async () => {
  vOpen.value = false;
  clear_selec();
  await get_mydis();
};

const copy_text = (text: string) => {
  alert(text);
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    presentToast("bottom", "Le lien a été copié avec succes");
  }
};

const get_recoms = async () => {
  const resp = await axios.get(`v2/api/get_recoms/${id}`, {
    headers: {
      Authorization: `Bearer ${await access_tok(
        `/patner/dem/${id}`,
        router,
        undefined
      )}`,
    },
  });
  if (resp.data["done"]) {
    recoms.value = resp.data["result"];
  }
};

const delete_me = async () => {
  const load = await showLoading("Patienter...");
  const resp = await axios.get("v2/api/delete_me/" + id + "/", {
    headers: {
      Authorization: `Bearer ${await access_tok(
        `/patner/dem/${id}`,
        router,
        load
      )}`,
    },
  });
  if (resp.data["done"]) {
    load.dismiss();
    router.back();
    presentToast("bottom", "Cette demande a été supprimé.");
  } else {
    load.dismiss();
    show_alert(
      "Demande non finalisé",
      "La demande doit être finalisée avant d'être supprimée"
    );
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

const get_sps = (temp: any) => {
  return temp.sub_p;
};

const get_name = (url: string) => {
  for (const temp of templates.value) {
    const sp = temp.sub_p;
    for (const m_m of sp.get_min_max) {
      for (const prod of m_m.prods) {
        for (const file of prod.files) {
          if (file.get_file == url) {
            return `${sp.value.get_subs}_image_${file.id}`;
          }
        }
      }
    }
  }
  return name.value;
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

const cursor = ref(0)
const is_safe = (txt : string) => {
  if(txt.length < 250) return true;
  else return false
}
const seen_text = (txt : string) => {
  if(is_safe(txt)) return txt;
  else return txt.slice(0, 248) + '...'
}

const download_files = (files: string[]) => {
  for (const file of files) {
    get_blob(file);
  }
};


onIonViewDidEnter(async () => {
  await get_mydis();
  await get_recoms();
});

const vOpen = ref(false);

const s_prods = computed(() => {
  const s_products = [];
  for (const temp of templates.value) {
    const sp = temp.sub_p;
    for (const e of sp.get_min_max) {
      for (const prod of e.prods) {
        if (check_prod_selec(prod)) s_products.push(prod);
      }
    }
  }
  return s_products;
});

const activ_copy = () => [
  setTimeout(() => {
    copy_inp.value = true;
  }, 100),
];
</script>