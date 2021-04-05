<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="calendar" href="/dashboard/calendar" @click="showButton = !showButton">
            <ion-icon :icon="calendarOutline"/>
            <ion-label>Calendar</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="list" href="/dashboard/list" @click="showButton = !showButton">
            <ion-icon :icon="createOutline"/>
            <ion-label>Todo List</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
      <div v-if="showButton">
        <ion-fab class="floating-button" vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button @click="openAdd = !openAdd">
            <ion-icon :icon="addOutline"/>
          </ion-fab-button>
        </ion-fab>
      </div>
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
  alertController,
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
      showButton: true,
    };
  },
  mounted: function () {
    if (window.location.href.includes("calendar")) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
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
      const conflict = this.checkCourseConflict(course.name);
      if (conflict){
        const response = this.presentAlert("Name Conflict", "There is already a course with that name!");
        if (response === "add"){
          console.log("adding course anyway")
          this.events.push(course);
        }
      }
      else{
        this.events.push(course);
      }
    },
    addTestQuiz(testquiz) {
      this.closeAdd();
      const conflict = this.hasEventConflict(testquiz.start, testquiz.end);
      if (conflict) {
        const response = this.presentAlert("Event Conflict", "There is an event conflict with " + 
        conflict.class + " " + conflict.title + "!");
        if (response === "add"){
          console.log("adding test anyway")
          this.events.push(testquiz);
        }
      }
      else {
        this.events.push(testquiz);
      }
    },
    hasEventConflict(start, end) {
      let conflict = null; 
      const startDate = new Date(start);
      const endDate = new Date(end);
      console.log(start, "to", end)
      console.log(startDate, "to", endDate)
      this.events.forEach(event => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        if (event.type === "testquiz" && !((eventStart >= endDate && eventEnd >= endDate) 
        || (eventStart <= startDate && eventEnd <= startDate))){
          conflict = event;
        }
      });
      return conflict;
    },
    hasCourseConflict(name) {
      let conflict = null; 
      this.testevents.forEach(course => {
        if (course.name === name){
          conflict = course;
        }
      });
      return conflict;
    },
    async presentAlert(header, message) {
      const alert = await alertController.create({
        header: header,
        message: message,
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              return("cancel");
            },
          },
          {
            text: "Add Anyway",
            handler: () => {
              return("add");
            },
          },
        ],
      });
      return alert.present();
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
