<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">List</ion-title>
        </ion-toolbar>
      </ion-header>
      <section>
		<ListItem
			v-for="(event, index) in events"
			:key="index"
			:name="event.name"
			:course="event.course"
			:estimatedTime="event.estTime"
		/>
	</section>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ListItem from '../components/ListViewItem.vue';

export default  {
  name: 'List',
  components: { ListItem, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
		return {
			events: [
				{
					name: "Quiz 1",
					course: "CSC222",
					estTime: 2,
				},
				{
					name: "Test 3",
					course: "CSC900",
					estTime: 8,
				},
				{
					name: "Assignment 22",
					course: "CSC318",
					estTime: 10,
				},
			],
		};
	},
}
</script>