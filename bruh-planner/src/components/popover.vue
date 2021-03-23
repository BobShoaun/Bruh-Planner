<template>
  <ion-content class="ion-padding">
    <ion-list mode="ios">
      <ion-item
          button
          v-on:click="openCourse();">Add Course
      </ion-item
      >
      <ion-item
          button
          v-on:click="openAssignment();">Add Assignment
      </ion-item
      >
      <ion-item
          button
          v-on:click="openTestQuiz();">Add Test/Quiz
      </ion-item>
    </ion-list>
  </ion-content>
</template>
<script>
import {IonContent, modalController} from "@ionic/vue";
import {addOutline} from "ionicons/icons";
import {defineComponent} from "vue";
import AddAssignment from "@/components/AddAssignment";
import AddCourse from "@/components/AddCourse";
import AddTestQuiz from "@/components/AddTestQuiz";


export default defineComponent({
  name: "Popover",
  components: {IonContent},
  data() {
    return {
      viewType: "month",
      addType: "",
    };
  },
  methods: {
    async openCourse() {
      const modal = await modalController.create({
        component: AddCourse,
      });
      return modal.present();
    },
    async openAssignment() {
      const modal = await modalController.create({
        component: AddAssignment,
      });
      return modal.present();
    },
    async openTestQuiz() {
      const modal = await modalController.create({
        component: AddTestQuiz,
      });
      return modal.present();
    },
  },
  setup() {
    return {
      addOutline,
    };
  },
});
</script>
