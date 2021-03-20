<template>
    <ion-item>
		<ion-reorder slot="start"></ion-reorder>
        <ion-label class="ion-text-wrap">
            <ion-text color="primary">
                <h1>{{ name }}</h1>
            </ion-text>
            <ion-text color="secondary">
                <p>{{ course }}</p>
            </ion-text>
            <p>Estimated time: {{ estimatedTime }} hours</p>
        </ion-label>
    </ion-item>
</template>

<script>
import { IonReorder, IonItem } from "@ionic/vue";
import { reorderThreeOutline } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
    components: { IonReorder, IonItem },
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
    setup() {
        return {
            reorderThreeOutline,
        };
    },
});
</script>

<style scoped></style>
