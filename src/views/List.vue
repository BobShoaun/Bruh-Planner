<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">List</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>
        <ion-row>
          <ion-col size="3" class="vertical-align">
            <ion-label>Show:</ion-label>
          </ion-col>
          <ion-col size="7.5">
            <ion-select
                v-model="showTasks"
                interface="action-sheet"
                @ionChange="filterTasks($event.detail.value)"
            >
              <ion-select-option value="upcoming">Upcoming Tasks</ion-select-option>
              <ion-select-option value="past">Past Tasks</ion-select-option>
            </ion-select>
          </ion-col>
          <ion-col v-if="false" class="align-help" size="1.5">
            <ion-icon size="large" :icon="helpCircleOutline"/>
          </ion-col>
        </ion-row>
      </div>
      <div v-if="upcoming">
        <ion-list class="button">
          <ion-button color="tertiary" expand="block" v-on:click="showCustomSortSettings()"
          >Custom Sort
          </ion-button>
        </ion-list>
        <ion-reorder-group @ionItemReorder="manualReorderPriority($event)" :disabled="false">
          <ListItem
              v-for="(event, index) in upcomingEvents"
              v-on:complete="completeEvent(event)"
              v-on:updateCompletion="updateCompletion(event, $event)"
              :key="index"
              :event="event"
              :number="index + 1"
          />
        </ion-reorder-group>
        <ion-list v-if="upcomingEvents.length === 0" class="tasks-end">
          <div>
            No more tasks! 😊
          </div>
        </ion-list>
        <ion-content class="ion-padding no-scroll">
          <CustomSortSettings v-if="customSortSettings"/>
        </ion-content>
      </div>
      <div v-else>
        <ListItem v-for="(event, index) in pastEvents" :key="index" :event="event"/>
        <ion-list v-if="pastEvents.length === 0" class="tasks-end">
          <div>
            Nothing here yet! 🤩
          </div>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonPage,
  IonReorderGroup,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  modalController,
} from "@ionic/vue";
import {defineComponent} from "vue";
import ListItem from "../components/ListItem.vue";
import {coursePriorities, priorities, events} from "@/database/db";
import CustomSortSettings from "@/components/CustomSortSettings.vue";

export default defineComponent({
  components: {
    IonButton,
    IonCol,
    IonContent,
    IonHeader,
    IonLabel,
    IonList,
    IonPage,
    IonReorderGroup,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
    ListItem,
    CustomSortSettings,
  },
  methods: {
    filterTasks(type) {
      this.upcoming = type !== "past";
    },
    async completeEvent(completedEvent) {
      this.upcomingEvents = this.upcomingEvents.filter((event) => {
        return event.completed != event.estTime;
      });
      this.pastEvents.push(completedEvent);
      await this.updateComponent();
    },
    async updateComponent() {
      this.upcoming = false;
      await this.$nextTick();
      this.upcoming = true;
    },
    updateCompletion(event, progress) {
      event.completed = progress / 60;
    },
    manualReorderPriority(e: CustomEvent) {
      this.upcomingEvents = e.detail.complete(this.upcomingEvents);
      this.updateDatabase();
    },
    async updateDatabase() {
      this.events.splice(0);
      const otherEvents = this.events.filter((e) => e.type != "testquiz" && e.type != "assignment");
      otherEvents.forEach((e) => {
        this.events.push(e);
      });
      this.upcomingEvents.forEach((e) => {
        this.events.push(e);
      });
      this.pastEvents.forEach((e) => {
        this.events.push(e);
      });
      await this.updateComponent();
    },
    async showCustomSortSettings() {
      const modal = await modalController.create({
        component: CustomSortSettings,
        componentProps: {
          closeSettings: () => {
            modalController.dismiss();
            this.customSortSettings = false;
          },
          sortBySettings: this.customSort,
        },
      });
      return modal.present();
    },
    async customSort(priorities, coursePriorities) {
      console.log(priorities);
      console.log(coursePriorities);

      console.log(this.priorities);
      console.log(this.coursePriorities);

      // update priority categories
      this.priorities.splice(0);
      priorities.forEach((category) => {
        this.priorities.push(category);
      });

      this.coursePriorities.splice(0);
      coursePriorities.forEach((course) => {
        this.coursePriorities.push(course);
      });
      this.upcomingEvents.forEach((event) => {
        event.priorityScore = this.getScore(event);
      });
      // sort list items
      this.upcomingEvents.sort(function (a, b) {
        return a.priorityScore - b.priorityScore;
      });
      await this.updateDatabase();
      await this.updateComponent();
      console.log("----------");
      console.log(priorities);
      console.log(coursePriorities);

      console.log(this.priorities);
      console.log(this.coursePriorities);
    },
    getScore(event) {
      const daysUntilDue = Math.abs(new Date(event.start).valueOf() - new Date().valueOf()) / 86400000;
      // lower score = higher priority
      const score =
          (5 / event.estTime) * (4 - priorities.indexOf("Estimated Time")) +
          (daysUntilDue / 5) * (4 - priorities.indexOf("Due Date")) +
          (coursePriorities.length / 2) *
          (4 - coursePriorities.indexOf(event.class)) *
          (4 - priorities.indexOf("Course")) +
          (20 / event.weight) * (4 - priorities.indexOf("Weight"));
      return score;
    },
  },
  data() {
    return {
      showTasks: "upcoming",
      customSortSettings: false,
      events: events,
      upcomingEvents: [],
      pastEvents: [],
      upcoming: true,
      coursePriorities: coursePriorities,
      priorities: priorities,
    };
  },
  ionViewDidEnter() {
    this.showTasks = "upcoming";
    const filteredEvents = this.events.filter((e) => e.type === "testquiz" || e.type === "assignment");
    this.upcomingEvents = filteredEvents.filter((event) => {
      return event.completed != event.estTime;
    });
    this.pastEvents = filteredEvents.filter((event) => {
      return event.completed == event.estTime;
    });
    this.updateComponent();
  },
});
</script>

<style scoped>
.button {
  text-align: center;
}

.tasks-end {
  padding: 2.5vh;
  height: 10vh;
  text-align: center;
  color: var(--ion-color-tertiary);
}
</style>
