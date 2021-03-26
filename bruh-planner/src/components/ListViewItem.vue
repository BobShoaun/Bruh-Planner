<template>
  <ion-item>
    <ion-reorder slot="start"></ion-reorder>
    <ion-label class="ion-text-wrap">
      <ion-row>
        <ion-col size="8">
          <ion-text color="primary">
            <h1>{{ name }}</h1>
          </ion-text>
        </ion-col>
        <ion-col> Due {{ dueDate }}</ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="8">
          <ion-text color="secondary">
            <h2>{{ course }}</h2>
          </ion-text>
        </ion-col>
        <ion-col>
          <p>Weight: {{ weight }}%</p>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="10">
          <p>Estimated Time Remaining: <span ref="estimatedTime"></span> hours</p>
        </ion-col>
      </ion-row>
      <ion-range min="0" max="100" step="10" snaps="true" ticks="true" @ionChange="calcProgress($event)">
        <ion-label slot="start">0%</ion-label>
        <ion-label slot="end">100%</ion-label>
      </ion-range>
    </ion-label>
  </ion-item>
</template>

<script>
import {IonCol, IonItem, IonLabel, IonRange, IonReorder, IonRow, IonText} from "@ionic/vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {IonCol, IonItem, IonLabel, IonRange, IonReorder, IonRow, IonText},
  props: {
    name: {
      type: String,
    },
    course: {
      type: String,
    },
    estimatedTime: {
      type: Number,
    },
    dueDate: {
      type: String,
    },
    weight: {
      type: Number,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
  },
  mounted() {
    this.$refs.estimatedTime.innerText = this.estimatedTime.toFixed(1);
  },
  methods: {
    calcProgress(e) {
      const estimatedTime = this.estimatedTime - (e.detail.value/100 * this.estimatedTime)
      this.$refs.estimatedTime.innerText = estimatedTime.toFixed(1)
    },
  },
});
</script>

<style scoped></style>
