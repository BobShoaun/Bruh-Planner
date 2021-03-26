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
      <section>
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
      </section>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {IonButton, IonContent, IonHeader, IonPage, IonReorderGroup, IonTitle, IonToolbar} from "@ionic/vue";
import ListItem from "../components/ListViewItem.vue";

export default {
  name: "List",
  components: {IonButton, IonContent, IonHeader, IonPage, IonReorderGroup, IonTitle, IonToolbar, ListItem},
  data() {
    return {
      events: [
        {
          name: "Quiz 1",
          course: "CSC222",
          estTime: 2,
          dueDate: "March 19",
          weight: 4,
        },
        {
          name: "Test 3",
          course: "CSC900",
          estTime: 8,
          dueDate: "March 30",
          weight: 20,
        },
        {
          name: "Assignment 22",
          course: "CSC318",
          estTime: 10,
          dueDate: "April 2",
          weight: 12,
        },
      ],
    };
  },
  setup() {
    const reorderPriority = (e: CustomEvent) => {
      e.detail.complete();
    };
    return {reorderPriority};
  },
};
</script>
