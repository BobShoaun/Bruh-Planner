import { defineComponent } from 'vue';
<template>
  <ion-page>
    <AddCourse v-if="addType == 'course'" />
    <AddAssignment v-if="addType == 'assignment'" />
    <AddTestQuiz v-if="addType == 'testquiz'" />
  </ion-page>
</template>

<script>
  import { defineComponent } from 'vue';
  import AddCourse from "./AddCourse";
  import AddAssignment from "./AddAssignment";
  import AddTestQuiz from "./AddTestQuiz";
  export default defineComponent({
    name: 'Modal',
    props: {
      addType: { type: String, default: 'none' },
    },
    data() {
      return {
        content: 'Content',
      }
    },
    components: { AddCourse, AddAssignment, AddTestQuiz }
  });
</script>