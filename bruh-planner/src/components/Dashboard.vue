<template>
	<section class="container my-5">
		<!-- <List v-if="viewType == 'list'" /> -->

		<div class="">
			<ion-fab bvertical="bottom" horizontal="end" edge slot="fixed">
				<ion-fab-button>
					<h1>+</h1>
				</ion-fab-button>
				<ion-fab-list side="start">
					<button v-on:click="addType = 'course'; openModal()"><h3>Add Course</h3></button>
					<button v-on:click="addType = 'assignment'; openModal()"><h3>Add Assignment</h3></button>
					<button v-on:click="addType = 'testquiz'; openModal()"><h3>Add Test/Quiz</h3></button>
				</ion-fab-list>
			</ion-fab>
		</div>

    <!-- <ion-fab vertical="bottom" horizontal="start" edge slot="fixed">
      <ion-fab-button>
		hi
        <ion-icon name="settings"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="end">
        <ion-fab-button>hi<ion-icon name="logo-vimeo"></ion-icon></ion-fab-button>
      </ion-fab-list>
    </ion-fab> -->

		<!-- Modal -->
		<!-- <div
			class="modal fade"
			id="add-modal"
			tabindex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog-centered">
				<AddCourse v-if="addType == 'course'" />
				<AddAssignment v-if="addType == 'assignment'" />
				<AddTestQuiz v-if="addType == 'testquiz'" />
			</div>
		</div>
		-->
	</section>
</template>

<script>

import {modalController} from '@ionic/vue'
import Add from "./Add";

export default {
	data() {
		return {
			viewType: "month",
			addType: "",
		};
	},
	// components: {
	// 	AddCourse,
	// 	AddAssignment,
	// 	AddTestQuiz,
	// },
	methods: {
		async openModal() {
		const modal = await modalController
			.create({
			component: Add,
			cssClass: 'my-custom-class',
			componentProps: {
				addType: this.addType
			},
			})
		return modal.present();
		},
	},
};
</script>

<style scoped>
.container {
	position: relative;
}

.add-button {
	position: fixed;
	bottom: 2rem;
	right: 2rem;
	border-radius: 50%;
	width: 3rem;
	height: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
