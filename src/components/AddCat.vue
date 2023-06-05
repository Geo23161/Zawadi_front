<template>
  <ion-modal ref="modal" :is-open="isOpen">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="close()">Fermer</ion-button>
        </ion-buttons>
        <ion-title>Ajouter une categorie</ion-title>
        <ion-buttons slot="end" v-if="slug != ''">
          <ion-button :strong="true" @click="done()">Valider</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list v-if="false" >
        <ion-item button detail="true">
          <ion-avatar slot="start">
            <img src="../../public/assets/img/cat.jpg" />
          </ion-avatar>
          <ion-label> Mode et Beauté </ion-label>
        </ion-item>
        <ion-item button detail="true">
          <ion-avatar slot="start">
            <img src="../../public/assets/img/cat.jpg" />
          </ion-avatar>
          <ion-label> Mode et Beauté </ion-label>
        </ion-item>
        <ion-item button detail="true">
          <ion-avatar slot="start">
            <img src="../../public/assets/img/cat.jpg" />
          </ion-avatar>
          <ion-label> Mode et Beauté </ion-label>
        </ion-item>
        <ion-item button detail="true">
          <ion-avatar slot="start">
            <img src="../../public/assets/img/cat.jpg" />
          </ion-avatar>
          <ion-label> Mode et Beauté </ion-label>
        </ion-item>
      </ion-list>
      <ion-list  >
        <ion-item button detail="false">
          <ion-avatar slot="start">
            <img src="../../public/assets/img/cat.jpg" />
          </ion-avatar>
          <ion-label> Mode et Beauté </ion-label>
          <ion-checkbox slot="end" color="secondary" ></ion-checkbox>
        </ion-item>
        <ion-item button detail="false">
          <ion-avatar slot="start">
            <img src="../../public/assets/img/cat.jpg" />
          </ion-avatar>
          <ion-label> Mode et Beauté </ion-label>
          <ion-checkbox slot="end" color="secondary" ></ion-checkbox>
        </ion-item>
        <ion-item button detail="false">
          <ion-avatar slot="start">
            <img src="../../public/assets/img/cat.jpg" />
          </ion-avatar>
          <ion-label> Mode et Beauté </ion-label>
          <ion-checkbox slot="end" color="secondary" ></ion-checkbox>
        </ion-item>
        <ion-item button detail="false">
          <ion-avatar slot="start">
            <img src="../../public/assets/img/cat.jpg" />
          </ion-avatar>
          <ion-label> Mode et Beauté </ion-label>
          <ion-checkbox slot="end" color="secondary" ></ion-checkbox>
        </ion-item>
      </ion-list>
      <div class="bar">
        <div>
          <ion-button>
            <ion-icon slot="start" :icon="arrowBack"></ion-icon>
            Retour
          </ion-button>
        </div>
        <div>
          <ion-button color="secondary">
            <ion-icon slot="start" :icon="checkmark"></ion-icon>
            Confirmer
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-modal>
</template>

<style scoped>
.bar {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
</style>

<script >
import { defineComponent, defineProps, ref, defineEmits } from "vue";
import { arrowBack, checkmark } from "ionicons/icons";
import { IonAvatar, IonCheckbox } from "@ionic/vue"

export default defineComponent({
  setup(prop, { emit }) {
    const props = defineProps({ isOpen: false });
    const emits = defineEmits(["close", "done"]);
    const slug = ref("");
    const close = () => {
      emit("close");
    };
    const done = () => {
      emit("done", slug.value);
    };
    return {
      done,
      close,
      slug,
      arrowBack,
      checkmark
    };
  },
});
</script>
