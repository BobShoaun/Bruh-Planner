<template>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
            <ion-icon :icon="addOutline" />
        </ion-fab-button>
        <ion-fab-list side="start">
            <button
                v-on:click="
                    addType = 'course';
                    openModal();
                "
            >
                <h3>Add Course</h3>
            </button>
            <button
                v-on:click="
                    addType = 'assignment';
                    openModal();
                "
            >
                <h3>Add Assignment</h3>
            </button>
            <button
                v-on:click="
                    addType = 'testquiz';
                    openModal();
                "
            >
                <h3>Add Test/Quiz</h3>
            </button>
        </ion-fab-list>
    </ion-fab>
</template>

<script>
import { modalController } from "@ionic/vue";
import Add from "./Add";
import { addOutline } from "ionicons/icons";

export default {
    data() {
        return {
            viewType: "month",
            addType: "",
        };
    },
    methods: {
        async openModal() {
            const modal = await modalController.create({
                component: Add,
                cssClass: "my-custom-class",
                componentProps: {
                    addType: this.addType,
                },
            });
            return modal.present();
        },
    },
    setup() {
        return {
            addOutline,
        };
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
