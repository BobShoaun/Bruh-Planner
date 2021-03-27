<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Calendar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="no-scroll" :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Calendar</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-row>
      <ion-col size="2" style="padding-top: 13px;">
        <ion-label>Show:</ion-label>
      </ion-col>
      <ion-col>
        <ion-select interface="action-sheet" value="all">
          <ion-select-option value="all">All</ion-select-option>
        <ion-select-option v-for="course in courses" :key="course.name" :value="course.name">
          {{ course.name }}
        </ion-select-option>
      </ion-select>
      </ion-col>
    </ion-row>
      <vue-cal
          xsmall
          click-to-navigate
          active-view="month"
          :disable-views="['years', 'year', 'day']"
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
import Popover from "../components/Popover.vue";
import {events, courses} from "../database/db";

export default defineComponent({
  components: {IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, VueCal},
  methods: {
    async openPopover(ev: Event) {
      const popover = await popoverController.create({
        component: Popover,
        event: ev,
        componentProps: {
          closePopover: () => popoverController.dismiss(),
        },
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
    courses: courses,
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
  font-size: 15px;
  font-weight: 600;
}

.vuecal__event.course1 {
  color: var(--ion-color-course1-text);
  background-color: var(--ion-color-course1);
}

.vuecal__event.course2 {
  color: var(--ion-color-course2-text);
  background-color: var(--ion-color-course2);
}

.vuecal__event.course3 {
  color: var(--ion-color-course3-text);
  background-color: var(--ion-color-course3);
}

.vuecal__event.course4 {
  color: var(--ion-color-course4-text);
  background-color: var(--ion-color-course4);
}

.vuecal__event.course5 {
  color: var(--ion-color-course5-text);
  background-color: var(--ion-color-course5);
}

.vuecal__event.course6 {
  color: var(--ion-color-course6-text);
  background-color: var(--ion-color-course6);
}

.vuecal__event.course7 {
  color: var(--ion-color-course7-text);
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
