<template>
	<div class="card">
		<div class="card-body row justify-content-start">
			<p class="col-1 d-flex justify-content-center align-items-center">
				<i class="fas fa-lg fa-grip-vertical text-secondary"></i>
			</p>
			<div class="col">
				<h2>{{ name }}</h2>
				<h3>{{ course }}</h3>
				<p>Estimated time: {{ estimatedTime }} hours</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
		},
		course: {
			type: String,
		},
		estimatedTime: {
			type: Number,
		},
		startTime: {
			type: String,
		},
		endTime: {
			type: String,
		},
	},
};
</script>

<style scoped>
.card {
	display: flex;
}
</style>
