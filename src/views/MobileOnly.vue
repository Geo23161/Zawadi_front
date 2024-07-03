<template>
  <div class="mobile-only">
    <h1>Oops, cette page est destinée aux appareils mobiles !</h1>
    <p>Ce site est conçu principalement pour les appareils mobiles.</p>
    <p>Merci d'accéder à partir d'un appareil mobile pour une meilleure expérience.</p>
  </div>
</template>

<script>
export default {
  name: 'MobileOnly'
};
</script>

<style scoped>
.mobile-only {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fade-in 0.5s ease-out;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
