<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Add Assignment</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="no-scroll" :fullscreen="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title>Add Assignment</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-item>
      <ion-label>Name*:</ion-label>
      <ion-input v-model="name" placeholder="Ex. Assignment 3"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Course*:</ion-label>
      <ion-select v-model="course" placeholder="Select One">
        <ion-select-option v-for="course in courses" :key="course.name" :value="course.name">
          {{ course.name }}
        </ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>Due Date*:</ion-label>
      <ion-datetime v-model="dueDate" display-format="MMMM DD, YYYY"></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>Due Time*:</ion-label>
      <ion-datetime v-model="dueTime" display-format="h:mm A" picker-format="h:mm A"></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>Weight (for one)*:</ion-label>
      <ion-input v-model="weight" type="number" min="0" max="100"></ion-input>
      %
    </ion-item>
    <ion-item>
      Estimated Time to Complete*:
      <ion-col size="3">
        <ion-input v-model="estTimeHrs" type="number" min="0" placeholder="1"></ion-input>
        hours
      </ion-col>
      <ion-col size="3">
        <ion-input v-model="estTimeMins" type="number" min="1" max="59" placeholder="30"></ion-input>
        minutes
      </ion-col>
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
      <ion-select v-model="reminder" placeholder="Never">
        <ion-select-option>Never</ion-select-option>
        <ion-select-option>At time of event</ion-select-option>
        <ion-select-option>10 minutes before</ion-select-option>
        <ion-select-option>Custom</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>Notes:</ion-label>
      <ion-textarea v-model="notes" rows="4"></ion-textarea>
    </ion-item>
    <ion-list class="buttons">
      <ion-button fill="outline" v-on:click="closeModal()">Cancel</ion-button>
      <ion-button fill="solid" v-on:click="addAssignment()">Add to Calendar</ion-button>
    </ion-list>
  </ion-content>
</template>

<script>
import {
  alertController,
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
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
import {courses} from "@/database/db";

export default defineComponent({
  name: "AddAssignment",
  components: {
    IonButton,
    IonCol,
    IonContent,
    IonDatetime,
    IonHeader,
    IonInput,
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
    close: {type: Function},
  },
  methods: {
    closeModal() {
      this.close();
    },
    addAssignment() {
      const dueDate = new Date(this.dueDate).toDateString().toString();
      const dueTime = new Date(this.dueTime).formatTime();
      const assignment = {
        name: this.name,
        course: this.course,
        dueDate: dueDate.substr(dueDate.indexOf(" ") + 1),
        dueTime: dueTime,
        weight: Number(this.weight),
        estTimeHrs: Number(this.estTimeHrs),
        estTimeMins: Number(this.estTimeMins),
        repeat: this.repeat,
        reminder: this.reminder,
        notes: this.notes,
      };
      if (
          !assignment.name ||
          !assignment.course ||
          !assignment.weight ||
          !assignment.estTimeHrs ||
          !assignment.estTimeMins
      ) {
        this.presentAlert("Empty Fields 😒", "Please fill in all the required fields! 🥺");
        return;
      }
      if (assignment.weight < 0 || assignment.weight > 100) {
        this.presentAlert("Invalid Weight 😒", "Please enter a valid weight between 0 to 100%! 🥺");
        return;
      }
      if (
          assignment.estTimeMins > 59 ||
          assignment.estTimeHrs < 0 ||
          (assignment.estTimeHrs === 0 && assignment.estTimeMins < 1) ||
          (assignment.estTimeHrs > 0 && assignment.estTimeMins < 0)
      ) {
        this.presentAlert("Invalid Time 😒", "Please enter a valid estimated to complete time! 🥺");
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
    name: "",
    course: "",
    dueDate: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    weight: "",
    estTimeHrs: "",
    estTimeMins: "",
    repeat: "",
    reminder: "",
    notes: "",
    courses: courses,
  }),
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
