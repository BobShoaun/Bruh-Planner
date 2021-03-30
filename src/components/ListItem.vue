<template>
  <ion-item v-on:click="showEvent('course')" @click="openModal">
    <ion-reorder slot="start"></ion-reorder>
    <ion-label class="ion-text-wrap">
      <ion-row>
        <ion-col size="8">
          <ion-text color="primary">
            <h1>{{ event.title }}</h1>
          </ion-text>
        </ion-col>
        <ion-col> Due <span ref="dueDate"></span></ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="8">
          <ion-text color="secondary">
            <h2>{{ event.class }}</h2>
          </ion-text>
        </ion-col>
        <ion-col>
          <p>Weight: {{ event.weight }}%</p>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="10">
          <p v-if="this.event.completed === this.event.estTime">Estimated Time:</p>
          <p v-else>Estimated Time Remaining:</p>
          <p><span ref="estHrs"></span> hours <span ref="estMins"></span> minutes</p>
        </ion-col>
      </ion-row>
      <div v-if="this.event.completed !== this.event.estTime">
        <ion-range
            v-if="this.event.completed !== this.event.estTime"
            ref="progressBar"
            min="0"
            :value="this.event.completed * 60"
            :max="this.event.estTime * 60"
            step="15"
            snaps="true"
            ticks="false"
            @ionChange="calcProgress($event.detail.value)"
        >
          <ion-label v-if="this.event.completed !== this.event.estTime" slot="start">0%</ion-label>
          <ion-label v-if="this.event.completed !== this.event.estTime" slot="end">100%</ion-label>
        </ion-range>
      </div>
    </ion-label>
  </ion-item>
  <Event v-if="eventType === 'course'" :event="this.event"/>
</template>

<script>
import {
  IonCol,
  IonItem,
  IonLabel,
  IonRange,
  IonReorder,
  IonRow,
  IonText,
  alertController,
  modalController
} from "@ionic/vue";
import {defineComponent} from "vue";
import Event from "@/components/Event";

export default defineComponent({
  name: "ListItem",
  components: {Event, IonCol, IonItem, IonLabel, IonRange, IonReorder, IonRow, IonText},
  props: {
    event: {
      type: Object,
    },
  },
  mounted() {
    this.$refs.dueDate.innerText = new Date(this.event.start)
        .toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        })
        .replace(/ /g, " ");
    this.$refs.estHrs.innerText = Math.trunc(this.event.estTime);
    this.$refs.estMins.innerText = ((this.event.estTime % 1) * 60).toFixed(0);
  },
  methods: {
    async openModal() {
      const modal = await modalController
          .create({
            component: Event,
            componentProps: {
              event: this.event,
              closeEvent: () => modalController.dismiss(),
            },
          })
      return modal.present();
    },
    showEvent(type) {
      this.eventType = type;
    },
    calcProgress(e) {
      const progress = e;
      const estimatedTime = (this.event.estTime * 60 - progress) / 60;
      this.$refs.estHrs.innerText = Math.trunc(estimatedTime);
      this.$refs.estMins.innerText = ((estimatedTime % 1) * 60).toFixed(0);
      this.updateCompletion(progress);
      if (progress === this.event.estTime * 60) {
        this.presentAlert();
      }
    },
    async presentAlert() {
      const alert = await alertController.create({
        header: "Confirm you have completed the task for " + this.event.title + "!",
        message: "",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Yes!",
            handler: () => {
              this.$emit("complete");
            },
          },
        ],
      });
      return alert.present();
    },
    async updateCompletion(progress) {
      this.$emit("updateCompletion", progress);
    },
  },
  data() {
    return {
      eventType: "",
    };
  },
});
</script>

<style scoped></style>
