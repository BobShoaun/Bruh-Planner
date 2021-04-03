<template>
  <ion-content class="ion-padding">
    <ion-toolbar>
      <ion-title size="large">{{ event.title }}</ion-title>
    </ion-toolbar>
    <ion-item>
      <ion-label>Course:</ion-label>
      {{ event.class }}
    </ion-item>
    <ion-item>
      <ion-label>Due Date:</ion-label>
      {{ new Date(event.start).format() }}
    </ion-item>
    <ion-item>
      <ion-label>Weight (for one):</ion-label>
      {{ event.weight }}%
    </ion-item>
    <ion-item>
      Estimated Time to Complete:
      {{ event.estTime }} hours
    </ion-item>
    <ion-item>
      <ion-label>Repeat:</ion-label>
      {{ event.repeat }}
    </ion-item>
    <ion-item>
      <ion-label>Reminder:</ion-label>
      {{ event.reminder }}
    </ion-item>
    <ion-item>
      <ion-label position="stacked" style="font-size: 17px;">Notes:</ion-label>
      <ion-textarea
          readonly>
        {{ event.notes }}
      </ion-textarea>
    </ion-item>

    <ion-list class="buttons">
      <ion-button fill="solid" v-on:click="editEvent()">Edit</ion-button>
      <ion-button fill="solid" color="danger" v-on:click="deleteEvent()">Delete</ion-button>
    </ion-list>
    <ion-list class="buttons">
      <ion-button fill="outline" v-on:click="close()">Cancel</ion-button>
    </ion-list>
  </ion-content>
</template>

<script>
import {alertController, IonButton, IonContent, IonItem, IonLabel, IonList, IonTitle, IonToolbar} from "@ionic/vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "Event",
  props: {
    event: {type: Object},
    closeEvent: {type: Function},
  },
  methods: {
    close() {
      this.closeEvent();
    },
    editEvent() {
      this.presentAlert("Not Implemented 😔", "Unfortunately editing events isn't supported yet aha 🤭");
    },
    deleteEvent() {
      this.presentAlert("Not Implemented 😔", "Unfortunately deleting events isn't supported yet aha 🤭");
    },
    async presentAlert(header, message) {
      const alert = await alertController.create({
        header: header,
        message: message,
        buttons: ["Got it!"],
      });
      return alert.present();
    },
  },
  components: {IonButton, IonContent, IonItem, IonLabel, IonList, IonTitle, IonToolbar,},
});
</script>

<style scoped>
.buttons {
  padding-top: 2vh;
  text-align: center;
}
</style>
