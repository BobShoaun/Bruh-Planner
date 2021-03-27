<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Add Test/Quiz</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="no-scroll" :fullscreen="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title>Add Test/Quiz</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-item>
      <ion-label>Name*:</ion-label>
      <ion-input v-model="name" placeholder="Ex. Quiz"></ion-input>
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
      <ion-label>Weight (for one)*:</ion-label>
      <ion-input v-model="weight" type="number" min="0" max="100"></ion-input>
      %
    </ion-item>
    <ion-item>
      Estimated Time to Study*:
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
      <ion-button fill="outline" v-on:click="closeModal()">Cancel</ion-button>
      <ion-button fill="solid" v-on:click="addTestQuiz()">Add to Calendar</ion-button>
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
  name: "AddTestQuiz",
  components: {
    IonButton,
    IonContent,
    IonCol,
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
    addTestQuiz() {
      const date = new Date(this.date).toDateString().toString();
      const startTime = new Date(this.startTime).formatTime();
      const endTime = new Date(this.endTime).formatTime();
      const testquiz = {
        name: this.name,
        course: this.course,
        date: date.substr(date.indexOf(" ") + 1),
        startTime: startTime,
        endTime: endTime,
        weight: Number(this.weight),
        estTimeHrs: Number(this.estTimeHrs),
        estTimeMins: Number(this.estTimeMins),
        repeat: this.repeat,
        reminder: this.reminder,
        notes: this.notes,
      };
      if (
          !testquiz.name ||
          !testquiz.course ||
          !testquiz.weight ||
          !testquiz.estTimeHrs ||
          !testquiz.estTimeMins
      ) {
        this.presentAlert("Empty Fields 😒", "Please fill in all the required fields! 🥺");
        return;
      }
      if (startTime >= endTime) {
        this.presentAlert("Invalid Time 😒", "Your test shouldn't end before it even starts! 🤔");
        return;
      }
      if (testquiz.weight < 0 || testquiz.weight > 100) {
        this.presentAlert("Invalid Weight 😒", "Please enter a valid weight between 0 to 100%! 🥺");
        return;
      }
      if (
          testquiz.estTimeMins > 59 ||
          testquiz.estTimeHrs < 0 ||
          (testquiz.estTimeHrs === 0 && testquiz.estTimeMins < 1) ||
          (testquiz.estTimeHrs > 0 && testquiz.estTimeMins < 0)
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
    date: new Date().toISOString(),
    startTime: new Date().toISOString(),
    endTime: (new Date()).addHours(1).toISOString(),
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
