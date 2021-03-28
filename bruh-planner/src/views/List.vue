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
      <ion-segment value="upcoming" @ionChange="viewUpcomingPast($event)">
        <ion-segment-button value="upcoming">
          Upcoming Tasks
        </ion-segment-button>
        <ion-segment-button value="past">
          Past Tasks
        </ion-segment-button>
      </ion-segment>
      <div v-if="upcoming">
        <ion-button expand="full">Custom Sort</ion-button>
        <ion-reorder-group @ionItemReorder="reorderPriority($event)" :disabled="false">
          <ListItem
              v-for="(event, index) in upcomingEvents"
              v-on:complete="completeEvent(event)"
              v-on:updateCompletion="updateCompletion(event, $event)"
              :key="index"
              :name="event.title"
              :course="event.class"
              :estimatedTime="event.estTime"
              :dueDate="event.end"
              :weight="event.weight"
              :completed="event.completed"
          />
        </ion-reorder-group>
        <ion-list class="tasks-end">
          No more tasks! 😊
        </ion-list>
      </div>
      <div v-else>
        <ion-reorder-group @ionItemReorder="reorderPriority($event)" :disabled="false">
          <ListItem
              v-for="(event, index) in pastEvents"
              :key="index"
              :name="event.title"
              :course="event.class"
              :estimatedTime="event.estTime"
              :dueDate="event.end"
              :weight="event.weight"
              :completed="event.completed"
          />
        </ion-reorder-group>     
           <!-- else -->
        <ion-list class="tasks-end" v-if="pastEvents.length==0">
          Nothing here yet! 🤩
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonReorderGroup,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import {addOutline} from "ionicons/icons";
import {defineComponent} from "vue";
import ListItem from "../components/ListItem.vue";
import {events} from "@/database/db";

export default defineComponent({
  components: {
    IonButton,
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonReorderGroup,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar,
    ListItem,
  },
  methods: {
    viewUpcomingPast(e: CustomEvent) {
      this.upcoming = e.detail.value != 'past';
    },
    completeEvent(completedEvent) {
      this.listevents.forEach(event => {
        if (completedEvent.title == event.title && completedEvent.class == event.class){
          event.completed = event.estTime
        }
      })
      this.upcomingEvents = this.listevents.filter(event => {
        return event.completed != event.estTime
      })
      this.pastEvents.push(completedEvent)
      this.key += 1
    },
    updateCompletion(event, progress) {
      event.completed = progress / 60
    },
    reorderPriority (e: CustomEvent) {
      e.detail.complete();
      // const otherEvents = this.listevents.filter(e => e.type != "testquiz" && e.type != "assignment")
      // this.listevents.splice(0);
      // otherEvents.forEach(e => {
      //   this.listevents.push(e)
      // })
      // this.upcomingEvents.forEach(e => {
      //   this.listevents.push(e)
      // })
      // this.pastEvents.forEach(e => {
      //   this.listevents.push(e)
      // })
      // // console.log(this.listevents)
      // // console.log(events)

    }
  },
  setup() {
    const filteredEvents = events.filter(e => e.type === "testquiz" || e.type === "assignment")
    const upcomingEvents = filteredEvents.filter(event => {
      return event.completed != event.estTime
    })
    const pastEvents = filteredEvents.filter(event => {
      return event.completed == event.estTime
    })
    return {addOutline, upcomingEvents, pastEvents};
  },
  data: () => ({
    listevents: events,
    upcoming: true,
    key: 0
  }),
});
</script>

<style scoped>
.tasks-end {
  padding: 2.5vh;
  height: 10vh;
  text-align: center;
  color: var(--ion-color-tertiary);
}
</style>
