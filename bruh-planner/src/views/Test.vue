<template>
	<ion-button @click="open = !open">Show Popover</ion-button>
	<ion-popover
		:is-open="open"
		css-class="my-custom-class"
		:event="event"
		:translucent="true"
		v-on:onWillDismiss="dismiss"
	>
		fasdfsadfasdf
	</ion-popover>
</template>

<script>
/* eslint-disable */
import { IonButton, IonPopover } from "@ionic/vue";
import { defineComponent, ref } from "vue";
// import Popver from './popover.vue'

export default defineComponent({
	data() {
		return {
			open: false,
		};
	},
	watch: {
		open() {
			console.log(this.open);
		},
	},
	components: { IonButton, IonPopover },
  methods: {
    dismiss() {
      this.open = false;
      console.log("dismissed");
    }
  }, 
	setup() {
		const isOpenRef = ref(false);
		const event = ref();
		const setOpen = (state, event) => {
			event.value = event;
			isOpenRef.value = state;
		};
		return { isOpenRef, setOpen, event };
	},
});
</script>

<style scoped></style>
