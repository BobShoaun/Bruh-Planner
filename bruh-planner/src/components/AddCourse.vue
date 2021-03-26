<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Add Course</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title>Add Course</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-item>
      <ion-label>Name*:</ion-label>
      <ion-input placeholder="Ex. CSC318"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Professor:</ion-label>
      <ion-input></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Office Hours:</ion-label>
      <ion-input placeholder="No office hours yet..."></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Lectures:</ion-label>
      <ion-input placeholder="No lectures yet..."></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Notes:</ion-label>
      <ion-textarea rows="4"></ion-textarea>
    </ion-item>
    <ion-list class="buttons">
      <ion-button fill="outline" v-on:click="closeModal()">Cancel</ion-button>
      <ion-button fill="solid">Add to Calendar</ion-button>
    </ion-list>
  </ion-content>
</template>

<script>
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import {defineComponent} from "vue";

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
    IonToolbar
  },
  props: {
    close: {type: Function},
  },
  methods: {
    closeModal() {
      this.close();
    },
  },
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
