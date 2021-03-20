<template>
	<section class="container my-5">
		<div class="btn-group mb-3" role="group" aria-label="Basic radio toggle button group">
			<input
				v-on:click="viewType = 'month'"
				type="radio"
				class="btn-check"
				name="btnradio"
				id="btnradio1"
				autocomplete="off"
				checked
			/>
			<label class="btn btn-outline-primary" for="btnradio1">Month</label>

			<input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
			<label v-on:click="viewType = 'week'" class="btn btn-outline-primary" for="btnradio2"
				>Week</label
			>

			<input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
			<label v-on:click="viewType = 'list'" class="btn btn-outline-dark" for="btnradio3"
				>List</label
			>
		</div>
		<Calendar v-if="viewType == 'month'" />
		<List v-if="viewType == 'list'" />

		<!-- <button type="button" class="add-button btn btn-primary btn-lg">
			<span class="fa fa-plus"></span>
		</button> -->

		<div class="">
			<button type="button" class="add-button btn btn-primary btn-lg" data-bs-toggle="dropdown">
				<span class="fa fa-plus"></span>
			</button>
			<ul class="dropdown-menu">
				<li>
					<button
						type="button"
						class="dropdown-item"
						data-bs-toggle="modal"
						data-bs-target="#add-modal"
						v-on:click="addType = 'course'"
					>
						Add Course
					</button>
				</li>
				<li>
					<button
						type="button"
						class="dropdown-item"
						data-bs-toggle="modal"
						data-bs-target="#add-modal"
						v-on:click="addType = 'assignment'"
					>
						Add Assignment
					</button>
				</li>
				<li>
					<button
						type="button"
						class="dropdown-item"
						data-bs-toggle="modal"
						data-bs-target="#add-modal"
						v-on:click="addType = 'testquiz'"
					>
						Add Test/Quiz
					</button>
				</li>
			</ul>
		</div>

		<!-- Modal -->
		<div
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
	</section>
</template>

<script>
import Calendar from "./CalendarView";
import List from "./ListView";
import AddCourse from "./AddCourse";
import AddAssignment from "./AddAssignment";
import AddTestQuiz from "./AddTestQuiz";

export default {
	data() {
		return {
			viewType: "month",
			addType: "",
		};
	},
	components: {
		Calendar,
		List,
		AddCourse,
		AddAssignment,
		AddTestQuiz,
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
