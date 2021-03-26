<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Add Assignment</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title>Add Assignment</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-item>
      <ion-label>Name*:</ion-label>
      <ion-input placeholder="Ex. CSC318 Assignment 3"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Course*:</ion-label>
      <ion-select placeholder="Select One">
        <ion-select-option value="CSC209">CSC209</ion-select-option>
        <ion-select-option value="CSC318">CSC318</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>Due Date*:</ion-label>
      <ion-datetime display-format="MMMM DD, YYYY" placeholder="Select Date"></ion-datetime>
      at
      <ion-datetime display-format="h:mm A" picker-format="h:mm A" value="15:00:15Z"></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>Weight (for one)*:</ion-label>
      <ion-input type="number" min="0" max="100"></ion-input>
      %
    </ion-item>
    <ion-item>
      <ion-label>Estimated Time to Complete*:</ion-label>
      <ion-input type="number" min="0" placeholder="   1"></ion-input>
      hour
      <ion-input type="number" min="0" max="59" placeholder="  30"></ion-input>
      mins
    </ion-item>
    <ion-item>
      <ion-label>Repeat:</ion-label>
      <ion-select placeholder="Never">
        <ion-select-option>Never</ion-select-option>
        <ion-select-option>Every day</ion-select-option>
        <ion-select-option>Every week</ion-select-option>
        <ion-select-option>Every 2 weeks</ion-select-option>
        <ion-select-option>Custom</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>Reminder:</ion-label>
      <ion-select placeholder="Never">
        <ion-select-option>Never</ion-select-option>
        <ion-select-option>At time of event</ion-select-option>
        <ion-select-option>10 minutes before</ion-select-option>
        <ion-select-option>Custom</ion-select-option>
      </ion-select>
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
  IonToolbar
} from "@ionic/vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "AddAssignment",
  components: {
    IonButton,
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
