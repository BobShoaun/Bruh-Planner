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
      <div>
        <ion-row>
          <ion-col size="3" class="vertical-align">
            <ion-label>Show:</ion-label>
          </ion-col>
          <ion-col size="7.5">
            <ion-select
                v-model="showCourse"
                interface="action-sheet"
                @ionChange="filterCourse($event.detail.value)"
            >
              <ion-select-option value="all">All</ion-select-option>
              <ion-select-option v-for="course in courses" :key="course.name" :value="course.name">
                {{ course.name }}
              </ion-select-option>
            </ion-select>
          </ion-col>
          <ion-col v-if="false" class="align-help" size="1.5">
            <ion-icon size="large" :icon="helpCircleOutline"/>
          </ion-col>
        </ion-row>
      </div>
      <ion-row>
        <vue-cal
            xsmall
            click-to-navigate
            active-view="month"
            :disable-views="['years', 'year', 'day']"
            :time-from="8 * 60"
            :time-to="24 * 60"
            todayButton
            :editable-events="{ title: true, drag: false, resize: true, delete: true, create: false }"
            :events="events"
            startWeekOnSunday
            style="height: 65vh; width: 100%;"
        >
        </vue-cal>
      </ion-row>
      <ion-row>
        <ion-chip v-on:click="openCourse(course)" v-for="course in courses" :key="course.name"
                  :class="course.name">
          {{ course.name }}
        </ion-chip>
      </ion-row>
    </ion-content>
    <Course v-if="viewCourse === true" :event="this.course"/>
  </ion-page>
</template>

<script>
import {
  IonChip,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  modalController,
} from "@ionic/vue";
import {addOutline, helpCircleOutline} from "ionicons/icons";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import {defineComponent} from "vue";
import Course from "../components/Course";

import {events, courses} from "@/database/db";

export default defineComponent({
  components: {
    Course,
    IonChip,
    IonCol,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonPage,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
    VueCal,
  },
  methods: {
    filterCourse(course) {
      if (course === "all") {
        this.events = events;
      } else {
        this.events = events.filter((e) => e.class === course);
      }
    },
    openCourse(course) {
      this.viewCourse = true;
      this.course = course;
      this.openCourseModal();
    },
    async openCourseModal() {
      const modal = await modalController.create({
        component: Course,
        componentProps: {
          course: this.course,
          closeCourse: () => {
            modalController.dismiss();
            this.viewCourse = false;
          }
        },
      });
      return modal.present();
    },
  },
  setup() {
    return {addOutline, helpCircleOutline};
  },
  data() {
    return {
      showCourse: "all",
      events: events,
      courses: courses,
      viewCourse: false,
    };
  },
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
  border-color: var(--ion-color-light-shade);
}

.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
  background-color: var(--ion-color-light);
}

.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
  background-color: var(--ion-color-light);
}

.vuecal__event,
ion-chip {
  font-size: 15px;
  font-weight: 600;
}

.course1 {
  color: var(--ion-color-course1-text);
  background-color: var(--ion-color-course1);
}

.course2 {
  color: var(--ion-color-course2-text);
  background-color: var(--ion-color-course2);
}

.course3 {
  color: var(--ion-color-course3-text);
  background-color: var(--ion-color-course3);
}

.course4 {
  color: var(--ion-color-course4-text);
  background-color: var(--ion-color-course4);
}

.course5 {
  color: var(--ion-color-course5-text);
  background-color: var(--ion-color-course5);
}

.course6 {
  color: var(--ion-color-course6-text);
  background-color: var(--ion-color-course6);
}

.course7 {
  color: var(--ion-color-course7-text);
  background-color: var(--ion-color-course7);
}

/*HARD CODING CALENDAR COLOURS*/

.CSC318, .csc318, .Csc318, .cSC318, .csC318, .CsC318 {
  color: var(--ion-color-course7-text);
  background-color: var(--ion-color-course7);
}

.EAS120 {
  color: var(--ion-color-course1-text);
  background-color: var(--ion-color-course1);
}

.CSB201 {
  color: var(--ion-color-course4-text);
  background-color: var(--ion-color-course4);
}
</style>
