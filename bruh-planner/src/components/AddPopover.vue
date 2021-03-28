<template>
	<ion-content class="ion-padding no-scroll">
		<ion-list>
			<ion-item v-on:click="openCourse()">Add safdasfsaf</ion-item>
			<ion-item v-on:click="openAssignment()">Add Assignment</ion-item>
			<ion-item v-on:click="openTestQuiz()">Add Test/Quiz</ion-item>
			<ion-item lines="none" v-on:click="close()">Close</ion-item>
		</ion-list>
	</ion-content>
</template>

<script>
import { IonContent, IonItem, IonList, modalController } from "@ionic/vue";
import { defineComponent } from "vue";


import AddAssignment from "@/components/AddAssignment";
import AddCourse from "@/components/AddCourse";
import AddTestQuiz from "@/components/AddTestQuiz";
import { events } from "@/database/db";

export default defineComponent({
	name: "AddPopover",
	components: { IonContent, IonItem, IonList },
	props: {
		closePopover: { type: Function },
		rerender: { type: Function },
	},
	methods: {
		async openCourse() {
			const modal = await modalController.create({
				component: AddCourse,
				componentProps: {
					close: () => modalController.dismiss(),
				},
			});
			await this.closePopover();
			return modal.present();
		},
		async openAssignment() {
			const modal = await modalController.create({
				component: AddAssignment,
				componentProps: {
					close: () => modalController.dismiss(),
				},
			});
			await this.closePopover();
			return modal.present();
		},
		async openTestQuiz() {
			const modal = await modalController.create({
				component: AddTestQuiz,
				componentProps: {
					close: () => modalController.dismiss(),
				},
			});
			await this.closePopover();
			return modal.present();
		},
	},
});
</script>
