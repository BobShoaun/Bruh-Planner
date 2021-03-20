<template>
    <ion-content class="ion-padding">
        <ion-list mode="md">
            <ion-item
                button
                v-on:click="
                    addType = 'course';
                    openModal();
                "
                >Add Course</ion-item
            >
            <ion-item
                button
                v-on:click="
                    addType = 'assignment';
                    openModal();
                "
                >Add Assignment</ion-item
            >
            <ion-item
                button
                v-on:click="
                    addType = 'testquiz';
                    openModal();
                "
                >Add Test/Quiz</ion-item
            >
        </ion-list>
    </ion-content>
</template>
<script>
import { IonContent, modalController } from "@ionic/vue";
import Add from "./Add";
import { addOutline } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
    name: "Popover",
    components: { IonContent },
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
});
</script>
