<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Calendar</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Calendar</ion-title>
				</ion-toolbar>
			</ion-header>
			<div>
				<ion-row>
					<ion-col size="3" class="vertical-align">
						<ion-label>Show:</ion-label>
					</ion-col>
					<ion-col size="7.5">
						<ion-select
							v-model="showCourse"
							interface="action-sheet"
							@ionChange="filterCourse($event.detail.value)"
						>
							<ion-select-option value="all">All</ion-select-option>
							<ion-select-option v-for="course in courses" :key="course.name" :value="course.name">
								{{ course.name }}
							</ion-select-option>
						</ion-select>
					</ion-col>
					<ion-col class="align-help" size="1.5">
						<ion-icon size="large" :icon="helpCircleOutline" />
					</ion-col>
				</ion-row>
			</div>
			<ion-row>
				<vue-cal
					ref="vuecal"
					xsmall
					click-to-navigate
					active-view="month"
					:disable-views="['years', 'year', 'day']"
					:time-from="8 * 60"
					:time-to="24 * 60"
					todayButton
					:editable-events="{ title: true, drag: false, resize: true, delete: true, create: false }"
					:events="events"
					startWeekOnSunday
					style="height: 450px; width: 100%;"
				>
				</vue-cal>
			</ion-row>
			<ion-row>
				<ion-chip v-for="course in courses" :key="course.name" :class="course.name">
					{{ course.name }}
				</ion-chip>
			</ion-row>
			<ion-fab vertical="bottom" horizontal="end" slot="fixed">
				<ion-fab-button @click="openAdd = !openAdd">
					<ion-icon :icon="addOutline" />
				</ion-fab-button>
			</ion-fab>

			<ion-popover
				:is-open="openAdd"
				:backdropDismiss="false"
				:translucent="true"
			>
				<div>
					<ion-content class="ion-padding no-scroll">
						<ion-list>
							<ion-item v-on:click="openAddType('course')">Add Course</ion-item>
							<ion-item v-on:click="openAddType('assignment')">Add Assignment</ion-item>
							<ion-item v-on:click="openAddType('testquiz')">Add Test/Quiz</ion-item>
							<ion-item lines="none" v-on:click="openAdd = false">Close</ion-item>
						</ion-list>
					</ion-content>
				</div>
			</ion-popover>
			<ion-row> </ion-row>
		</ion-content>
	</ion-page>
	<AddAssignment
		v-if="addType == 'assignment'"
		v-on:add="addAssignment"
		v-on:close="addType = ''"
	/>
	<AddCourse v-if="addType == 'course'" v-on:add="addCourse" v-on:close="addType = ''" />
	<AddTestQuiz v-if="addType == 'testquiz'" v-on:add="addTestQuiz" v-on:close="addType = ''" />
</template>

<script>
/* eslint-disable */
import {
	IonChip,
	IonCol,
	IonContent,
	IonFab,
	IonFabButton,
	IonHeader,
	IonIcon,
	IonLabel,
	IonPage,
	IonSelect,
	IonSelectOption,
	IonRow,
	IonTitle,
	IonToolbar,
	IonPopover,
} from "@ionic/vue";
import { addOutline, helpCircleOutline } from "ionicons/icons";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { defineComponent } from "vue";

import Popover from "../components/Popover.vue";
import AddPopover from "../components/AddPopover.vue";
import AddAssignment from "@/components/AddAssignment";
import AddCourse from "@/components/AddCourse";
import AddTestQuiz from "@/components/AddTestQuiz";

import { events, courses } from "@/database/db";

export default defineComponent({
	data() {
		return {
			showCourse: "all",
			events: events,
			courses: courses,
			openAdd: false,
			addType: "",
		};
	},
	components: {
		IonChip,
		IonCol,
		IonContent,
		IonFab,
		IonFabButton,
		IonHeader,
		IonIcon,
		IonLabel,
		IonPage,
		IonSelect,
		IonSelectOption,
		IonRow,
		IonTitle,
		IonToolbar,
		IonPopover,
		VueCal,
		Popover,
		AddPopover,
		AddAssignment,
		AddCourse,
		AddTestQuiz,
		AddCourse,
	},
	methods: {
		filterCourse(course) {
			switch (course) {
				case "all":
					this.events = events;
					break;
				default:
					this.events = events.filter(e => e.class === course);
			}
		},
		closeAdd() {
			this.openAdd = false;
			this.addType = "";
		},
		openAddType(type) {
			this.openAdd = false;
			this.addType = type;
		},
		addAssignment(assignment) {
			closeAdd();
			this.events.push({
				start: "2021-03-27 11:00",
				end: "2021-03-27 15:00",
				title: assignment.name,
				class: assignment.course,
			});
		},
		addCourse(course) {
			closeAdd();
		},
		addTestQuiz(testquiz) {
			closeAdd();
		},
	},
	setup() {
		return { addOutline, helpCircleOutline };
	},
});
</script>

<style>
.vuecal__menu,
.vuecal__cell-events-count {
	color: var(--ion-color-primary-contrast);
	background-color: var(--ion-color-primary);
}

.vuecal__title-bar {
	background-color: var(--ion-color-light);
}

.vuecal__cell--today,
.vuecal__cell--current {
	background-color: var(--ion-color-light);
}

.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
	background-color: var(--ion-color-light);
}

.vuecal__cell--selected:before {
	border-color: var(--ion-color-light-shade);
}

.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
	background-color: var(--ion-color-light);
}

.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
	background-color: var(--ion-color-light);
}

.vuecal__event,
ion-chip {
	font-size: 15px;
	font-weight: 600;
}

.course1 {
	color: var(--ion-color-course1-text);
	background-color: var(--ion-color-course1);
}

.course2 {
	color: var(--ion-color-course2-text);
	background-color: var(--ion-color-course2);
}

.course3 {
	color: var(--ion-color-course3-text);
	background-color: var(--ion-color-course3);
}

.course4 {
	color: var(--ion-color-course4-text);
	background-color: var(--ion-color-course4);
}

.course5 {
	color: var(--ion-color-course5-text);
	background-color: var(--ion-color-course5);
}

.course6 {
	color: var(--ion-color-course6-text);
	background-color: var(--ion-color-course6);
}

.course7 {
	color: var(--ion-color-course7-text);
	background-color: var(--ion-color-course7);
}

.vertical-align {
	padding-top: 15px;
	text-align: center;
}

.align-help {
	padding-top: 10px;
}
</style>
