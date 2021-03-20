<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Course</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group">
                    <label for="task-name">Name *: </label>
                    <input type="text" class="form-control" id="task-name" placeholder="Ex. CSC318" />
                </div>
                <div class="form-group">
                    <label for="task-prof">Professor *: </label>
                    <input type="text" class="form-control" id="task-prof" />
                </div>
                <div class="form-group">
                    <label for="select-start">Office Hours: </label>
                </div>
                <div class="form-group">
                    <label for="select-start">Lectures: </label>
                </div>
                <div class="form-group">
                    <label for="task-notes">Notes: </label>
                    <textarea class="form-control" id="task-notes" rows="3"></textarea>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Add to Calendar</button>
        </div>
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
