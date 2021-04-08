<template>
  <ion-content :fullscreen="true">
    <ion-header>
      <ion-toolbar>
        <ion-title>Custom Sort</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-reorder-group @ionItemReorder="updatePriorities($event)" :disabled="false">
      <SortCategory
          v-for="(category, index) in priorities"
          v-on:updateCoursePriorities="updateCoursePriorities"
          :key="index"
          :name="category"
          :number="index+1"
      />
    </ion-reorder-group>
    <ion-list class="buttons">
      <ion-button fill="outline" v-on:click="close()">Cancel</ion-button>
      <ion-button fill="solid" v-on:click="sort()">Sort Todo List</ion-button>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonReorderGroup,
  IonList,
  IonButton,
} from "@ionic/vue";
import {defineComponent} from "vue";
import { coursePriorities, priorities } from "@/database/db";
import SortCategory from "@/components/SortCategory.vue";

export default defineComponent({
  name: "CustomSortSettings",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    SortCategory,
    IonReorderGroup,
    IonList,
    IonButton,
  },
  props: {
    closeSettings: {type: Function},
    sortBySettings: {type: Function},
  },
  methods: {
    close() {
      this.closeSettings();
    },
    async sort() {
      this.closeSettings();
      this.sortBySettings(this.priorities, this.coursePriorities);
    },
    updatePriorities(e: CustomEvent) {
      this.priorities = e.detail.complete(this.priorities); 
      // does this change db priorities? i hope not
    },
    updateCoursePriorities(coursePriorities) {
      this.coursePriorities = coursePriorities;
    },
  },
  data() {
    return {
      priorities: Array.from(priorities),
      coursePriorities: Array.from(coursePriorities),
    };
  },
});
</script>

<style scoped>
textarea {
  resize: none;
}

.buttons {
  padding-top: 5vh;
  text-align: center;
}
</style>