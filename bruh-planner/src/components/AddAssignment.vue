<template>
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
      <ion-datetime v-model="dueDate" display-format="h:mm A" picker-format="h:mm A"></ion-datetime>
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
    <ion-item>
      <ion-label>Notes:</ion-label>
      <ion-textarea v-model="notes" rows="4"></ion-textarea>
    </ion-item>
    <ion-list class="buttons">
      <ion-button fill="outline" v-on:click="$emit('close')">Cancel</ion-button>
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
      const startDate = new Date(this.dueDate).format("YYYY-MM-DD HH:mm");
      const endDate = new Date(this.dueDate).addHours(1).format("YYYY-MM-DD HH:mm");
      const assignment = {
        start: startDate,
        end: endDate,
        title: this.name,
        class: this.course,
        type: "assignment",
        weight: Number(this.weight),
        estTime: 0,
        repeat: this.repeat,
        reminder: this.reminder,
        notes: this.notes,
      };
      const estTimeHrs = Number(this.estTimeHrs);
      const estTimeMins = Number(this.estTimeMins);
      if (!assignment.title || !assignment.class || !assignment.weight || !estTimeHrs || !estTimeMins) {
        this.presentAlert("Empty Fields 😒", "Please fill in all the required fields! 🥺");
        return;
      }
      if (assignment.weight < 0 || assignment.weight > 100) {
        this.presentAlert("Invalid Weight 😒", "Please enter a valid weight between 0 to 100%! 🥺");
        return;
      }
      if (
          estTimeMins > 59 ||
          estTimeHrs < 0 ||
          (estTimeHrs === 0 && estTimeMins < 1) ||
          (estTimeHrs > 0 && estTimeMins < 0)
      ) {
        this.presentAlert("Invalid Time 😒", "Please enter a valid estimated to complete time! 🥺");
        return;
      }
      assignment.estTime = estTimeHrs + estTimeMins / 60;
      this.$emit("add", assignment);
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
    weight: "",
    estTimeHrs: "",
    estTimeMins: "",
    repeat: "never",
    reminder: "never",
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
