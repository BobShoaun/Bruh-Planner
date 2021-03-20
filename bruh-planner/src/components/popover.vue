<template>
  <ion-content class="ion-padding">
    <ion-list mode='md'>
        <ion-item button>Add Course</ion-item>
        <ion-item button>Add Assignment</ion-item>
        <ion-item button>Add Test/Quiz</ion-item>
        <ion-item lines="none" detail="false" button onClick="dismissPopover()">Close</ion-item>
    </ion-list>
  </ion-content>
</template>

<script>
import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Popover',
  components: { IonContent }
});
</script>