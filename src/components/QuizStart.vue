<template>
    <div class="row">
        <div class="col-12">
            <div class="input-group">
                <select class="form-control" v-model="selectedQuizUrl">
                    <option disabled hidden selected value="">Izvēlies testu!</option>
                    <option :value="quiz.url" v-for="quiz in quizList">{{quiz.name}}</option>
                </select>
                <div class="input-group-append">
                    <button :disabled="!quiz" @click="startQuiz" class="btn btn-outline-secondary">Sākt testu</button>
                </div>
            </div>

        </div>
        <div class="col-12 mt-4">
            <quiz-stats/>
        </div>
    </div>
</template>

<script>
    import QuizStats from '@/components/QuizStats';
    import { Quiz } from '@/models/quiz.models';
    import axios from 'axios';

    export default {
        name: 'quiz-start',
        components: { QuizStats },
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
                axios.get(`quizzes/${this.selectedQuizUrl}.json`, {})
                    .then(response => {
                        try {
                            this.quiz = Quiz.fromObject(response.data);
                        } catch (e) {
                            alert('Viss slikti');
                            console.log(e);
                        }
                    }).catch(response => {
                    alert('Nu bac!');
                    console.table(response);
                });
            },
            viewStats () {

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
