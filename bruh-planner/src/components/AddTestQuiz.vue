<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Add Test/Quiz</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title>Add Test/Quiz</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-item>
      <ion-label>Name*:</ion-label>
      <ion-input placeholder="Ex. CSC209 Quiz"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Course*:</ion-label>
      <ion-select placeholder="Select One">
        <ion-select-option value="CSC209">CSC209</ion-select-option>
        <ion-select-option value="CSC318">CSC318</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>Start Date*:</ion-label>
      <ion-datetime display-format="MMMM DD, YYYY" placeholder="Select Date"></ion-datetime>
      at
      <ion-datetime display-format="h:mm A" picker-format="h:mm A" value="1990-08-19T07:43Z"></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>End Date*:</ion-label>
      <ion-datetime display-format="MMMM DD, YYYY" placeholder="Select Date"></ion-datetime>
      at
      <ion-datetime display-format="h:mm A" picker-format="h:mm A" value="1990-09-19T07:43Z"></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>Weight (for one)*:</ion-label>
      <ion-input type="number" min="0" max="100"></ion-input>%
    </ion-item>
    <ion-item>
      <ion-label>Estimated Time to Study*:</ion-label>
      <ion-input type="number" min="0" placeholder="   1"></ion-input>
      hour
      <ion-input type="number" min="0" max="59" placeholder="  30"></ion-input>
      mins
    </ion-item>
    <ion-item>
      <ion-label>Repeat:</ion-label>
      <ion-select placeholder="Never">
        <ion-select-option>Never</ion-select-option>
        <ion-select-option>Every day</ion-select-option>
        <ion-select-option>Every week</ion-select-option>
        <ion-select-option>Every 2 weeks</ion-select-option>
        <ion-select-option>Custom</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>Reminder:</ion-label>
      <ion-select placeholder="Never">
        <ion-select-option>Never</ion-select-option>
        <ion-select-option>At time of event</ion-select-option>
        <ion-select-option>10 minutes before</ion-select-option>
        <ion-select-option>Custom</ion-select-option>
      </ion-select>
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
