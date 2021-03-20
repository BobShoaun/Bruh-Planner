<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Month</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Month</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="d-flex justify-content-center mb-3">
		<button type="button" class="btn btn-outline-secondary btn-lg">
			<span class="fa fa-chevron-left"></span>
		</button>
		<h1 class="text-center display-3 mx-3">March 2021</h1>
		<button type="button" class="btn btn-outline-secondary btn-lg">
			<span class="fa fa-chevron-right"></span>
		</button>
	</div>
	<div class="calendar bg-secondary p-2">
		<h4 class="bg-light text-center overflow-hidden">Sunday</h4>
		<h4 class="bg-light text-center overflow-hidden">Monday</h4>
		<h4 class="bg-light text-center overflow-hidden">Tuesday</h4>
		<h4 class="bg-light text-center overflow-hidden">Wednesday</h4>
		<h4 class="bg-light text-center overflow-hidden">Thursday</h4>
		<h4 class="bg-light text-center overflow-hidden">Friday</h4>
		<h4 class="bg-light text-center overflow-hidden">Saturday</h4>
		<div v-for="i in 31" :key="i" class="calendar-day bg-light ">
			{{ i }}
		</div>
	</div>
	<Dashboard />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import Dashboard from '../components/Dashboard.vue';

export default  {
  name: 'Tab1',
  components: { Dashboard, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>

<style scoped>
.calendar {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: 2em, repeat(5, 1fr);
	row-gap: 0.2em;
	column-gap: 0.2em;
}

.calendar-day {
	height: 100px;
}
</style>