<template>
  <ion-item>
    <ion-reorder slot="start"></ion-reorder>
    <ion-label class="ion-text-wrap">
      <ion-text color="primary">
        <h1>{{ number }}. {{ name }}</h1>
      </ion-text>
      <div v-if="name === 'Course'">
        <ion-reorder-group @ionItemReorder="updateCoursePriorities($event)" :disabled="false">
          <SortCategory
              v-for="(course, index) in coursePriorities"
              :key="index"
              :name="course"
              :number="index + 1"
          />
        </ion-reorder-group>
      </div>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import {IonItem, IonLabel, IonReorder, IonReorderGroup, IonText} from "@ionic/vue";
import {defineComponent} from "vue";
import {coursePriorities} from "@/database/db";

export default defineComponent({
  name: "SortCategory",
  components: {IonItem, IonLabel, IonReorder, IonReorderGroup, IonText},
  props: {
    name: {
      type: String,
    },
    number: {
      type: Number,
    },
  },
  methods: {
    updateCoursePriorities(e: CustomEvent) {
      this.coursePriorities = e.detail.complete(this.coursePriorities);
      this.$emit("updateCoursePriorities", this.coursePriorities);
      // does this change db priorities? i hope not
    },
  },
  data() {
    return {
      coursePriorities: Array.from(coursePriorities),
    };
  },
});
</script>

<style scoped></style>
