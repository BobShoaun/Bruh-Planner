<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Add Office Hours</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="no-scroll" :fullscreen="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title>Add Office Hours</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-item>
      <ion-label>Date*:</ion-label>
      <ion-datetime v-model="date" display-format="MMMM DD, YYYY"></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>Start Time*:</ion-label>
      <ion-datetime v-model="startTime" display-format="h:mm A" picker-format="h:mm A"></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>End Time*:</ion-label>
      <ion-datetime v-model="endTime" display-format="h:mm A" picker-format="h:mm A"></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>Repeat:</ion-label>
      <ion-select v-model="repeat">
        <ion-select-option value="never">Never</ion-select-option>
        <ion-select-option value="every day">Every day</ion-select-option>
        <ion-select-option value="every week">Every week</ion-select-option>
        <ion-select-option value="every 2 weeks">Every 2 weeks</ion-select-option>
        <ion-select-option value="custom">Custom</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>Reminder:</ion-label>
      <ion-select v-model="reminder">
        <ion-select-option value="never">Never</ion-select-option>
        <ion-select-option value="at time of event">At time of event</ion-select-option>
        <ion-select-option value="10 minutes before">10 minutes before</ion-select-option>
        <ion-select-option value="custom">Custom</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-list class="buttons">
      <ion-button fill="outline" v-on:click="closeModal()">Cancel</ion-button>
      <ion-button fill="solid" v-on:click="addOfficeHours()">Done</ion-button>
    </ion-list>
  </ion-content>
</template>

<script>
import {
  alertController,
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "AddOfficeHours",
  components: {
    IonButton,
    IonContent,
    IonDatetime,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
  },
  props: {
    closeOfficeHours: {type: Function},
  },
  methods: {
    closeModal() {
      this.closeOfficeHours();
    },
    addOfficeHours() {
      const date = new Date(this.date).toDateString().toString();
      const startTime = new Date(this.startTime).formatTime();
      const endTime = new Date(this.endTime).formatTime();
      const officeHours = {
        date: date.substr(date.indexOf(" ") + 1),
        startTime: startTime,
        endTime: endTime,
        repeat: this.repeat,
        reminder: this.reminder,
      };
      if (
          !officeHours.date ||
          !officeHours.startTime ||
          !officeHours.weight ||
          !officeHours.endTime
      ) {
        this.presentAlert("Empty Fields 😒", "Please fill in all the required fields! 🥺");
        return;
      }
      if (startTime <= endTime) {
        this.presentAlert("Invalid Time 😒", "The office hours shouldn't end before it even starts! 🤔");
        return;
      }
      this.presentAlert(
          "Not Implemented 😔",
          "You filled in all the fields correctly but this doesn't work yet aha 🤭"
      );
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
  data: () => ({
    date: new Date().toISOString(),
    startTime: new Date().toISOString(),
    endTime: (new Date()).addHours(1).toISOString(),
    repeat: "never",
    reminder: "never",
  }),
});
</script>

<style scoped>
.buttons {
  padding-top: 5vh;
  text-align: center;
}
</style>
