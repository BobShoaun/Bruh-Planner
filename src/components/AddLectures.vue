<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Add Lectures</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title>Add Lectures</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-item>
      <ion-label>Date*:</ion-label>
      <ion-datetime v-model="startDate" display-format="MMMM DD, YYYY"></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>Start Time*:</ion-label>
      <ion-datetime v-model="startDate" display-format="h:mm A" picker-format="h:mm A"></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>End Time*:</ion-label>
      <ion-datetime v-model="endDate" display-format="h:mm A" picker-format="h:mm A"></ion-datetime>
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
    <ion-item v-if="repeat !== 'never'">
      <ion-label>End Repeat:</ion-label>
      <ion-datetime v-model="endRepeat" display-format="MMMM DD, YYYY"></ion-datetime>
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
    <ion-item>
      <ion-label>Notes:</ion-label>
      <ion-textarea v-model="notes" rows="4"></ion-textarea>
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
  IonTextarea,
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
    IonTextarea,
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
      const startTime = new Date(this.startDate).format("YYYY-MM-DD HH:mm");
      const endTime = startTime.split(" ")[0] + new Date(this.endDate).format(" HH:mm");
      const lecture = {
        start: startTime,
        end: endTime,
        title: "Lecture",
        class: "N/A",
        type: "lecture",
        repeat: this.repeat,
        reminder: this.reminder,
        notes: this.notes,
      };
      if (startTime >= endTime) {
        this.presentAlert("Invalid Time 😒", "The lecture shouldn't end before it even starts! 🤔");
        return;
      }
      if (lecture.repeat !== "never") {
        this.presentAlert(
            "Not Implemented 😔",
            "You filled in all the fields correctly but repeats other than 'Never' aren't supported yet aha 🤭"
        );
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
    startDate: new Date().toISOString(),
    endDate: new Date().addHours(1).toISOString(),
    repeat: "never",
    endRepeat: new Date().addDays(7).toISOString(),
    reminder: "never",
    notes: "",
  }),
});
</script>

<style scoped>
.buttons {
  padding-top: 5vh;
  text-align: center;
}
</style>
