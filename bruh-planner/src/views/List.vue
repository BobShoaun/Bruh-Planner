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
              v-for="(event, index) in events"
              :key="index"
              :name="event.name"
              :course="event.course"
              :estimatedTime="event.estTime"
              :dueDate="event.dueDate"
              :weight="event.weight"
          />
        </ion-reorder-group>
        <ion-list class="tasks-end">
          No more tasks! 😊
        </ion-list>
      </div>
      <div v-else>
        <ion-list class="tasks-end">
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
import {listevents} from "@/database/db";

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
  },
  setup() {
    const reorderPriority = (e: CustomEvent) => {
      e.detail.complete();
    };
    return {addOutline, reorderPriority};
  },
  data: () => ({
    events: listevents,
    upcoming: true,
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
