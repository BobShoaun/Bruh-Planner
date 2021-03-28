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
        <ion-col> Due <span ref="dueDate"></span></ion-col>
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
          <p>Estimated Time Remaining:</p>
          <p><span ref="estHrs"></span> hours <span ref="estMins"></span> minutes</p>
        </ion-col>
      </ion-row>
      <ion-range
          ref="progressBar"
          min="0"
          :max="estimatedTime * 60"
          step="15"
          snaps="true"
          ticks="false"
          @ionChange="calcProgress($event.detail.value)"
      >
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
  name: "ListItem",
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
    this.$refs.dueDate.innerText = new Date(this.dueDate).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    }).replace(/ /g, ' ');
    this.$refs.estHrs.innerText = Math.trunc(this.estimatedTime);
    this.$refs.estMins.innerText = ((this.estimatedTime % 1) * 60).toFixed(0);
  },
  methods: {
    calcProgress(e) {
      const progress = e;
      if (progress == this.estimatedTime * 60) {
        console.log("completed task!");
      }
      const estimatedTime = (this.estimatedTime * 60 - progress) / 60;
      this.$refs.estHrs.innerText = Math.trunc(estimatedTime);
      this.$refs.estMins.innerText = ((estimatedTime % 1) * 60).toFixed(0);
    },
  },
});
</script>

<style scoped></style>
