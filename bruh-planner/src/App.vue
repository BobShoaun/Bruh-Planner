<template>
  <ion-app>
    <ion-router-outlet />
    <!-- <Test /> -->
  </ion-app>
</template>

<script lang="ts">
import Test from "./components/Test.vue";

import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import "vue-cal";

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>

<style>
.no-scroll {
  --overflow: hidden;
}
</style>