<template>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add Course</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title>Add Course</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item>
        <ion-label>Name*:</ion-label>
        <ion-input placeholder="Ex. CSC318"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Professor *:</ion-label>
        <ion-input></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Office Hours:</ion-label>
        <ion-input></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Lectures:</ion-label>
        <ion-input></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Notes:</ion-label>
        <ion-textarea></ion-textarea>
      </ion-item>
    </ion-content>
</template>

<script>
export default {};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
