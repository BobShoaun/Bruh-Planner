<template>
	<section>
		<ListItem
			v-for="(event, index) in events"
			:key="index"
			:name="event.name"
			:course="event.course"
			:estimatedTime="event.estTime"
		/>
	</section>
</template>

<script>
import ListItem from "./ListViewItem";

export default {
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
	components: {
		ListItem,
	},
};
</script>

<style></style>
