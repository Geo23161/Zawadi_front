<template>
  <ion-app>
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, isPlatform, IonAvatar, IonItem, IonCheckbox } from "@ionic/vue";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { access_tok } from "./global/seller_auth";

const router = useRouter();

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

if(!isMobile) router.push('/mobile-only')

</script>

<style scoped>
.down-enter-active {
  transition: opacity 1s;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
}
</style>
