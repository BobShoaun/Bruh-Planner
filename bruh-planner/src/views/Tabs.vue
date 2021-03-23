<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="calendar" href="/tabs/calendar">
          <ion-icon :icon="calendarOutline" />
          <ion-label>Calendar</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="list" href="/tabs/list">
          <ion-icon :icon="createOutline" />
          <ion-label>Todo List</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { calendarOutline, createOutline } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      calendarOutline, 
      createOutline,
    }
  }
}
</script>