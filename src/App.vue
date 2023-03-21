<template>
  <ion-app>
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, isPlatform } from "@ionic/vue";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { access_tok } from "./global/seller_auth";

const router = useRouter();

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

