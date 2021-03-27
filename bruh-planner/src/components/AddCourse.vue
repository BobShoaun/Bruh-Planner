<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Add Course</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="no-scroll" :fullscreen="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title>Add Course</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-item>
      <ion-label>Name*:</ion-label>
      <ion-input v-model="name" placeholder="Ex. CSC318"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Professor:</ion-label>
      <ion-input v-model="professor"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Office Hours:</ion-label>
      <ion-button fill="outline" color="primary" strong="true" v-on:click="addOfficeHours()">+</ion-button>
    </ion-item>
    <ion-item>
      <ion-label>Lectures:</ion-label>
      <ion-button fill="outline" color="primary" strong="true" v-on:click="addLecture()">+</ion-button>
    </ion-item>
    <ion-item>
      <ion-label>Notes:</ion-label>
      <ion-textarea v-model="notes" rows="4"></ion-textarea>
    </ion-item>
    <ion-list class="buttons">
      <ion-button fill="outline" v-on:click="$emit('close')">Cancel</ion-button>
      <ion-button fill="solid" v-on:click="addCourse()">Add to Calendar</ion-button>
    </ion-list>
  </ion-content>
</template>

<script>
import {
  alertController,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  IonTitle,
  IonToolbar,
  modalController,
} from "@ionic/vue";
import {defineComponent} from "vue";
import AddOfficeHours from "@/components/AddOfficeHours";
import AddLectures from "@/components/AddLectures";

export default defineComponent({
  name: "AddCourse",
  components: {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
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
    async addOfficeHours() {
      const modal = await modalController.create({
        component: AddOfficeHours,
        componentProps: {
          closeOfficeHours: () => modalController.dismiss(),
        },
      });
      return modal.present();
    },
    async addLecture() {
      const modal = await modalController.create({
        component: AddLectures,
        componentProps: {
          closeLecture: () => modalController.dismiss(),
        },
      });
      return modal.present();
    },
    addCourse() {
      const course = {
        name: this.name,
        professor: this.professor,
        notes: this.notes,
      };
      if (!course.name) {
        this.presentAlert("Empty Fields 😒", "Please fill in all the required fields! 🥺");
        return;
      }
      // this.presentAlert(
      //     "Not Implemented 😔",
      //     "You filled in all the fields correctly but this doesn't work yet aha 🤭"
      // );
      this.$emit("add", course);
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
    professor: "",
    notes: "",
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
