<template>
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Test/Quiz</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <form>
            <div class="form-group">
                <label for="task-name">Name: </label>
                <input type="text" class="form-control" id="task-name" placeholder="Ex. CSC209 Quiz" />
            </div>
            <div class="form-group">
                <label for="select-course">Course*: </label>
                <select class="form-control" id="select-course">
                    <option>Course 1</option>
                    <option>Course 2</option>
                    <option>Course 3</option>
                    <option>Course 4</option>
                    <option>Course 5</option>
                </select>
            </div>
            <div class="form-group">
                <label for="select-start">Start Time*: </label>
            </div>
            <div class="form-group">
                <label for="select-start">End Time*: </label>
            </div>
            <div class="form-group">
                <label for="select-start">Weight*: </label>
                <input type="number" class="form-control" id="select-start" placeholder="0" min="0" max="100" />
            </div>
            <div class="form-group">
                <label for="select-study">Estimated Time to Study*: </label>
                <input type="number" class="form-control" id="select-study" placeholder="0" min="0" />
            </div>
            <div class="form-group">
                <label for="select-repeat">Repeat*: </label>
                <select class="form-control" id="select-repeat">
                    <option selected>Never</option>
                    <option>Every day</option>
                    <option>Every week</option>
                    <option>Every 2 weeks</option>
                    <option>Custom</option>
                </select>
            </div>
            <div class="form-group">
                <label for="select-reminder">Reminder*: </label>
                <select class="form-control" id="select-reminder">
                    <option selected>Never</option>
                    <option>At time of event</option>
                    <option>10 minutes before</option>
                    <option>Custom</option>
                </select>
            </div>
            <div class="form-group">
                <label for="task-notes">Notes: </label>
                <textarea class="form-control" id="task-notes" rows="3"></textarea>
            </div>
        </form>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
textarea {
    resize: none;
}
</style>
