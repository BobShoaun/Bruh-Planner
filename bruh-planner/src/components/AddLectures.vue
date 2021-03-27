<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Add Lectures</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="no-scroll" :fullscreen="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title>Add Lectures</ion-title>
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
      <ion-select v-model="repeat" placeholder="Never">
        <ion-select-option>Never</ion-select-option>
        <ion-select-option>Every day</ion-select-option>
        <ion-select-option>Every week</ion-select-option>
        <ion-select-option>Every 2 weeks</ion-select-option>
        <ion-select-option>Custom</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>Reminder:</ion-label>
      <ion-select v-model="reminder" value="never" placeholder="Never">
        <ion-select-option>Never</ion-select-option>
        <ion-select-option>At time of event</ion-select-option>
        <ion-select-option>10 minutes before</ion-select-option>
        <ion-select-option>Custom</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-list class="buttons">
      <ion-button fill="outline" v-on:click="closeModal()">Cancel</ion-button>
      <ion-button fill="solid" v-on:click="addLectures()">Done</ion-button>
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
  name: "AddLectures",
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
    closeLecture: {type: Function},
  },
  methods: {
    closeModal() {
      this.closeLecture();
    },
    addLectures() {
      const date = new Date(this.date).toDateString().toString();
      const startTime = new Date(this.startTime).formatTime();
      const endTime = new Date(this.endTime).formatTime();
      const lecture = {
        date: date.substr(date.indexOf(" ") + 1),
        startTime: startTime,
        endTime: endTime,
        repeat: this.repeat,
        reminder: this.reminder,
      };
      if (
          !lecture.date ||
          !lecture.startTime ||
          !lecture.weight ||
          !lecture.endTime
      ) {
        this.presentAlert("Empty Fields 😒", "Please fill in all the required fields! 🥺");
        return;
      }
      if (startTime <= endTime) {
        this.presentAlert("Invalid Time 😒", "The lecture shouldn't end before it even starts! 🤔");
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
    endTime: new Date().toISOString(),
    repeat: "",
    reminder: "",
  }),
});
</script>

<style scoped>
.buttons {
  padding-top: 5vh;
  text-align: center;
}
</style>
