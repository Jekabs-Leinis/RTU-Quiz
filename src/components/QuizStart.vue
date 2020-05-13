<template>
    <div class="row">
        <div class="col-12">
            <select class="form-control" v-model="selectedQuizUrl">
                <option disabled hidden selected value="">Select a quiz!</option>
                <option :value="quiz.url" v-for="quiz in quizList">{{quiz.name}}</option>
            </select>
        </div>
        <div class="col-12">
            <button :disabled="!quiz" @click="startQuiz" class="btn btn-outline-primary">Start quiz</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'quiz-start',
        data () {
            return {
                quiz: null,
                quizList: [
                    { name: 'Test quiz', url: 'test' }
                ],
                selectedQuizUrl: '',
            };
        },
        methods: {
            startQuiz () {
                this.$emit('quiz-start', this.quiz);
            },
            loadQuiz () {
                axios.get(`/quizzes/${this.selectedQuizUrl}.json`, {})
                    .then(response => {
                        try {
                            this.quiz = JSON.parse(response.data);
                        } catch (e) {
                            alert('Viss slikti');
                            console.log(e);
                        }
                    }).catch(response => {
                    alert('Nu bac!');
                    console.table(response);
                });
            }
        },
        watch: {
            selectedQuizUrl () {
                if (this.selectedQuizUrl) {
                    this.loadQuiz();
                }
            }
        }
    };
</script>
