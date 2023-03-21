<template>
  <ion-modal mode="ios" :is-open="isOpen">
    <ion-header>
      <ion-toolbar>
        <ion-title>Mise à jour</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="close()">Fermer</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content >
      <div class="bg_bodyyt">
        <div class="title_app">
          <div class="t__app">{{ myver.title }}</div>
        </div>
        <div class="img__app">
          <img :src="myver.image" />
        </div>
        <div class="myT__app">
          {{ myver.description }}
        </div>
        <div @click="act()" style="padding: 1rem">
          <ion-button type="submit" expand="full">Mettre à jour</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
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
import { defineComponent, toRef, defineEmits } from "vue";

export default defineComponent({
  props: {
    isOpen: Boolean,
    version: Object as () => VersionObj,
    platform : String
  },
  setup(props, ctx) {
    const myver  = toRef(props, "version");
    const emits = defineEmits(["close"]);
    const platform = toRef(props, 'platform');
    const act = () => {
        if(platform.value == "ios") open_sys_lnk(myver.value?.action?.ios);
        else if (platform.value == "android") open_sys_lnk(myver.value?.action?.android);
    }
    const close = () => {
      ctx.emit("close");
    };
    const open_sys_lnk = (url: string | undefined) => {
      window.open(url, "_system", "location=yes");
    };

    return {
      myver,
      close,
      open_sys_lnk,
    };
  },
});
</script>

<style scoped>
.mycats {
  padding-top: 2vh;
  padding-bottom: 3vh;
  margin-bottom: 4vh;
}
.myT__app {
  text-align: center;
  padding: 4vw;
  font-size: 4vw;
}
.img__app {
  padding-left: 4vw;
  padding-right: 4vw;
  padding-top: 3vh;
}
.t__app {
  text-align: center;
  padding: 2vh;
  font-size: 5vw;
  font-weight: bold;
}
.dt:active {
  background: rgb(250, 206, 206);
}
.bg_bodyyt {
  background: linear-gradient(
    to right,
    rgb(230, 230, 230),
    rgb(206, 206, 206),
    rgb(230, 230, 230)
  );
  min-height: 100%;
  padding: 1.2rem;
}
</style>
