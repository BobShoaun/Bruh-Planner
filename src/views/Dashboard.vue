<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="calendar" href="/dashboard/calendar">
            <ion-icon :icon="calendarOutline"/>
            <ion-label>Calendar</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="list" href="/dashboard/list">
            <ion-icon :icon="createOutline"/>
            <ion-label>Todo List</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/vue";
import {addOutline, calendarOutline, createOutline} from "ionicons/icons";

export default {
  name: "Dashboard",
  components: {
    IonIcon,
    IonLabel,
    IonPage,
    IonTabBar,
    IonTabButton,
    IonTabs,
  },
  setup() {
    return {
      calendarOutline,
      createOutline,
      addOutline,
    };
  },
};
</script>

<style scoped>
.floating-button {
  bottom: 60px;
}
</style>
