<template>
  <ion-app>
      
      <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/vue';
import { ref } from 'vue';

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

