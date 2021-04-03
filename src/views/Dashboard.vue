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

      <ion-fab class="floating-button" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openAdd = !openAdd">
          <ion-icon :icon="addOutline"/>
        </ion-fab-button>
      </ion-fab>

      <ion-popover :is-open="openAdd" :backdropDismiss="false" :translucent="true">
        <ion-content class="ion-padding no-scroll">
          <ion-list>
            <ion-item v-on:click="openAddType('course')">Add Course</ion-item>
            <ion-item v-on:click="openAddType('assignment')">Add Assignment</ion-item>
            <ion-item v-on:click="openAddType('testquiz')">Add Test/Quiz</ion-item>
            <ion-item lines="none" v-on:click="openAdd = false">Close</ion-item>
          </ion-list>
        </ion-content>
      </ion-popover>
    </ion-content>
  </ion-page>
  <AddAssignment v-if="addType === 'assignment'" v-on:add="addAssignment" v-on:close="addType = ''"/>
  <AddCourse v-if="addType === 'course'" v-on:add="addCourse" v-on:close="addType = ''"/>
  <AddTestQuiz v-if="addType === 'testquiz'" v-on:add="addTestQuiz" v-on:close="addType = ''"/>
</template>

<script>
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/vue";
import {calendarOutline, createOutline} from "ionicons/icons";
import {addOutline} from "ionicons/icons";

import AddAssignment from "@/components/AddAssignment";
import AddCourse from "@/components/AddCourse";
import AddTestQuiz from "@/components/AddTestQuiz";
import {events, courses} from "@/database/db";

export default {
  name: "Dashboard",
  components: {
    AddAssignment,
    AddCourse,
    AddTestQuiz,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonPopover,
    IonTabBar,
    IonTabButton,
    IonTabs,
  },
  data() {
    return {
      events: events,
      courses: courses,
      openAdd: false,
      addType: "",
    };
  },
  methods: {
    closeAdd() {
      this.openAdd = false;
      this.addType = "";
    },
    openAddType(type) {
      this.openAdd = false;
      this.addType = type;
    },
    addAssignment(assignment) {
      this.closeAdd();
      this.events.push(assignment);
    },
    addCourse(course) {
      this.closeAdd();
      this.courses.push(course);
    },
    addTestQuiz(testquiz) {
      this.closeAdd();
      this.events.push(testquiz);
    },
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
