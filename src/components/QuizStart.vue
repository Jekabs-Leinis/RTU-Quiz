<template>
    <div class="row">
        <div class="col-12">
            <div class="btn btn-outline-primary" @click="startQuiz">Start quiz</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'quiz-start',
        methods: {
            startQuiz() {
                this.$emit('quiz-start');
            }
        }
    };
</script>
