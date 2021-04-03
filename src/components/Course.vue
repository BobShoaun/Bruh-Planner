<template>
  <ion-content class="ion-padding">
    <ion-toolbar>
      <ion-title size="large">{{ course.name }}</ion-title>
    </ion-toolbar>
    <ion-item>
      <ion-label>Professor:</ion-label>
      {{ course.professor }}
    </ion-item>
    <ion-item>
      <ion-label>Lecture(s):</ion-label>
      N/A
    </ion-item>
    <ion-item>
      <ion-label>Office Hour(s):</ion-label>
      N/A
    </ion-item>
    <ion-item>
      <ion-label position="stacked" style="font-size: 17px;">Notes:</ion-label>
      <ion-textarea
          readonly>
        {{ course.notes }}
      </ion-textarea>
    </ion-item>
    <ion-list class="buttons">
      <ion-button fill="solid" v-on:click="editCourse()">Edit</ion-button>
      <ion-button fill="solid" color="danger" v-on:click="deleteCourse()">Delete</ion-button>
    </ion-list>
    <ion-list class="buttons">
      <ion-button fill="outline" v-on:click="close()">Cancel</ion-button>
    </ion-list>
  </ion-content>
</template>

<script>
import {
  alertController,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "Course",
  props: {
    course: {type: Object},
    closeCourse: {type: Function},
  },
  methods: {
    close() {
      this.closeCourse();
    },
    editCourse() {
      this.presentAlert("Not Implemented 😔", "Unfortunately editing courses isn't supported yet aha 🤭");
    },
    deleteCourse() {
      this.presentAlert("Not Implemented 😔", "Unfortunately deleting courses isn't supported yet aha 🤭");
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
  components: {IonButton, IonContent, IonItem, IonLabel, IonList, IonTextarea, IonTitle, IonToolbar,},
});
</script>

<style scoped>
.buttons {
  padding-top: 2vh;
  text-align: center;
}
</style>
