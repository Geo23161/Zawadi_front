<template>
  <ion-modal :is-open="isOpen">
    <ion-header mode="ios">
      <ion-toolbar>
        <ion-title>Ajouter</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="close()">Fermer</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="aid">
        <div>
          Ajoutez un produit de type <strong>{{ dname }}</strong>
        </div>
      </div>
      <form @submit.prevent="create_prod()">
        <ion-list>
          <div class="d_sp">
            <ion-item color="secondary" fill="outline">
              <ion-label position="floating">Nom du produit</ion-label>
              <ion-input
                type="text"
                required
                :value="name"
                @ionInput="(e) => (name = e.target.value)"
                id="name"
              ></ion-input>
            </ion-item>
          </div>
          <div class="d_sp" style="margin-bottom: 2rem">
            <div style="padding: 0.3rem">Details particuliers</div>
            <ion-item>
              <ion-textarea
                :auto-grow="true"
                :value="detail"
                @ionInput="(e) => (detail = e.target.value)"
                placeholder="entrez des caractéristiques particulières du produit"
              ></ion-textarea>
            </ion-item>
          </div>
          <div class="d_sp" style="display: flex">
            <ion-item
              color="secondary"
              fill="outline"
              mode="md"
              style="margin-right: 0.3rem"
            >
              <ion-label position="floating">Prix minimum(FCFA)</ion-label>
              <ion-input
                required
                type="number"
                id="min"
                :value="min"
                @ionInput="(e) => (min = e.target.value)"
              ></ion-input>
            </ion-item>
            <ion-item
              color="secondary"
              fill="outline"
              mode="md"
              style="margin-left: 0.3rem"
            >
              <ion-label position="floating">Prix Max</ion-label>
              <ion-input
                type="number"
                required
                :value="max"
                @ionInput="(e) => (max = e.target.value)"
                id="max"
              ></ion-input>
            </ion-item>
          </div>
          <div class="d_sp">
            <div
              style="
                padding-left: 0.3rem;
                padding-top: 0.6rem;
                padding-right: 0.3rem;
                padding-bottom: 0.4rem;
              "
            >
              Appuyez pour ajouter des images du produits
            </div>
            <n-upload :key="upload"
              :action="api_url + `v2/api/upload_img/`"
              :default-file-list="previewFileList"
              list-type="image-card"
              accept="images/*"
              @preview="handlePreview"
              :max="10"
              :show-preview-button="true"
              @finish="finished"
              @remove="removeFunc"
              :headers="{
                Authorization: `Bearer ${access}`,
              }"
            />
            <n-modal
              v-model:show="showModalRef"
              preset="card"
              style="width: 600px"
              :title="dname"
            >
              <img :src="previewImageUrlRef" style="width: 100%" />
            </n-modal>
          </div>
          <div v-show="false" style="padding: 1rem">
            <ion-button id="mybut" type="submit" color="primary" expand="full"
              >Sauvegarder et quitter</ion-button
            >
          </div>
        </ion-list>
        <div style="padding-left: 1rem; padding-right: 1rem; padding-top: 1rem">
          <ion-button
            type="submit"
            @click="don = false"
            color="secondary"
            expand="full"
            >Sauvegarder et ajouter un nouveau</ion-button
          >
        </div>
        <div style="padding: 1rem">
          <ion-button
            type="submit"
            @click="don = true"
            color="primary"
            expand="full"
            >Sauvegarder et quitter</ion-button
          >
        </div>
      </form>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import {
  defineComponent,
  defineEmits,
  ref,
  defineProps,
  toRef,
  onMounted,
} from "vue";
import { NUpload, NModal, UploadFileInfo } from "naive-ui";
import {
  access_tok,
  presentToast,
  showLoading,
  show_alert,
} from "@/global/seller_auth";
import axios from "axios";
import { useRouter } from "vue-router";
import { onIonViewDidEnter } from "@ionic/vue";

export default defineComponent({
  props: {
    isOpen: Boolean,
    dname: String,
    dsubs: Number,
  },
  components: {
    NModal,
    NUpload,
  },
  setup(pros, ctx) {
    const emits = defineEmits(["close", "done"]);
    //const props = defineProps(["isOpen", "dname", "dsubs"]);
    const dname = toRef(pros, "dname");
    const dsubs = toRef(pros, "dsubs");
    const close = () => {
      ctx.emit("close");
    };
    const previewImageUrlRef = ref("");
    const showModalRef = ref(false);
    function handlePreview(file: any) {
      const { url } = file;
      previewImageUrlRef.value = url as string;
      showModalRef.value = true;
    }
    const name = ref<string | undefined>("");
    const detail = ref("");
    const files = ref<string[]>([]);
    const min = ref<number>();
    const max = ref<number>();
    const access = ref<any>();
    const api_url = "http://192.168.43.244:8000/";
    const set_access = async () => {
      access.value = await access_tok(`/seller/params`, router, undefined);
    };
    name.value = dname.value;
    const finished = (options: {
      file: UploadFileInfo;
      event?: ProgressEvent;
    }) => {
      const tar = options.event?.target as XMLHttpRequest;
      const resp = JSON.parse(tar.responseText);
      if (resp) {
        files.value.push(`${resp?.result}`);
      }
      options.file.name = `${resp?.result}`;
      options.file.url = resp?.url;
      return options.file;
    };
    const removeFunc = (options: {
      file: UploadFileInfo;
      fileList: Array<any>;
    }) => {
      files.value = files.value.filter((e: any) => {
        return e != options.file.name;
      });
      return true;
    };
    const don = ref(false);
    const done = () => {
      ctx.emit("done");
    };
    const router = useRouter();
    const previewFileList = ref<any[]>([]);
    const create_prod = async () => {
      const load = await showLoading("Ajout...");
      const form = new FormData();
      form.append("name", name.value as string);
      if (detail.value != "") form.append("details", detail.value);
      form.append("min", `${min.value}`);
      form.append("max", `${max.value}`);
      form.append("files", JSON.stringify(files.value));
      form.append("subp", `${dsubs.value}`);
      try {
        const resp = await axios.post("v2/api/create_prod/", form, {
          headers: {
            Authorization: `Bearer ${access.value}`,
          },
        });

        if (resp.data["done"]) {
          load.dismiss();
          await presentToast("top", "Produit ajouté avec succes!", 'light');
          files.value = [] as string[];
          if (don.value) {
            upload.value ++;
            detail.value = "";
            done();
          } else {
            upload.value ++;
            detail.value = "";
          }
        }
      } catch (e) {
        load.dismiss();
      }
    };
    const upload = ref(0);
    onMounted(() => {
      const has_mm = localStorage.getItem("mm");
      if (has_mm) {
        min.value = JSON.parse(has_mm).min as number
        max.value = JSON.parse(has_mm).max as number
        localStorage.removeItem("mm")
      }
    });
    set_access();
    const interval = setInterval(() => {
      set_access();
    }, 30000);
    const click_submit = () => {
      document.getElementById("mybut")?.click();
    };
    return {
      close,
      done,
      name,
      detail,
      files,
      min,
      max,
      previewFileList,
      previewImageUrlRef,
      showModalRef,
      handlePreview,
      removeFunc,
      finished,
      click_submit,
      don,
      access,
      api_url,
      create_prod,
      upload
    };
  },
});
</script>

<style scoped>
.myinp:hover {
  border-color: #f25765;
  color: #f25765;
  background: rgb(245, 245, 245);
}

.acto {
  border-color: #f25765;
  color: #f25765;
}

.norm {
  border-color: rgb(41, 41, 41);
  color: rgb(41, 41, 41);
}

.myinp {
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.myinput {
  width: 90vw;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}

.label {
  color: rgb(63, 63, 63);
  font-size: 1.1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.d_sp {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.myimg {
  width: 35px;
  height: 35px;
}

.aid {
  text-align: center;
  font-size: 1.12rem;
  color: rgb(63, 63, 63);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
</style>
