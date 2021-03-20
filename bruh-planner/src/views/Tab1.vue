<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- <ion-title>Calendar</ion-title> -->
      </ion-toolbar>
    </ion-header>
	
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Calendar</ion-title>
        </ion-toolbar>
      </ion-header>
		<vue-cal
			xsmall
			click-to-navigate
			:time="false"
			active-view="month"
			:disable-views="['years', 'year', 'day']"
			:min-date="minDate"
			:max-date="maxDate"
			style="height: 400px"
			class="vertical-center">
		</vue-cal>
		<!-- fab placed to the bottom end -->
		<ion-fab vertical="bottom" horizontal="end" slot="fixed">
			<ion-fab-button @click="openPopover">
				<ion-icon icon="add"></ion-icon>
			</ion-fab-button>
		</ion-fab>
		<Dashboard />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, popoverController } from '@ionic/vue';
import 'vue-cal/dist/i18n/zh-cn.js'
import 'vue-cal/dist/vuecal.css'
import VueCal from 'vue-cal';
import {defineComponent} from 'vue';
import Popover from '../components/popover.vue'
import Dashboard from '../components/Dashboard.vue'

export default defineComponent({
	components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, VueCal, IonFab, IonFabButton, IonIcon, Dashboard },
	methods: {
		async openPopover(ev: Event) {
			const popover = await popoverController.create({
				component: Popover,
				cssClass: '',
				event: ev,
				translucent: true
			})
			return popover.present();
		}
	}
})
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

.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

</style>