<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Calendar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Calendar</ion-title>
        </ion-toolbar>
      </ion-header>
      <vue-cal
          xsmall
          click-to-navigate
          active-view="month"
          :disable-views="['years', 'day']"
          :time-from="8 * 60"
          :time-to="24 * 60"
          todayButton
          :events="events"
          startWeekOnSunday
          style="height: 450px; width: 100%;"
          class="vertical-center"
      >
      </vue-cal>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openPopover">
          <ion-icon :icon="addOutline"/>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  popoverController
} from "@ionic/vue";
import {addOutline} from "ionicons/icons";
import "vue-cal/dist/vuecal.css";
import VueCal from "vue-cal";
import {defineComponent} from "vue";
import Popover from "../components/popover.vue";
import {events} from "../database/db";

export default defineComponent({
  components: {IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, VueCal},
  methods: {
    async openPopover(ev: Event) {
      const popover = await popoverController.create({
        component: Popover,
        event: ev,
      });
      return popover.present();
    },
  },
  setup() {
    return {
      addOutline,
    };
  },
  data: () => ({
    events: events,
  }),
});
</script>

<style>
.vuecal__menu,
.vuecal__cell-events-count {
  color: var(--ion-color-primary-contrast);
  background-color: var(--ion-color-primary);
}

.vuecal__title-bar {
  background-color: var(--ion-color-light);
}

.vuecal__cell--today,
.vuecal__cell--current {
  background-color: var(--ion-color-light);
}

.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: var(--ion-color-light);
}

.vuecal__cell--selected:before {
  border-color: var(--ion-color-secondary);
}

.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
  background-color: var(--ion-color-light);
}

.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
  background-color: var(--ion-color-light);
}

.vuecal__event {
  color: var(--ion-color-primary-contrast);
  font-size: 15px;
}

.vuecal__event.course1 {
  background-color: var(--ion-color-course1);
}

.vuecal__event.course2 {
  background-color: var(--ion-color-course2);
}

.vuecal__event.course3 {
  background-color: var(--ion-color-course3);
}

.vuecal__event.course4 {
  background-color: var(--ion-color-course4);
}

.vuecal__event.course5 {
  background-color: var(--ion-color-course5);
}

.vuecal__event.course6 {
  background-color: var(--ion-color-course6);
}

.vuecal__event.course7 {
  background-color: var(--ion-color-course7);
}

.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
