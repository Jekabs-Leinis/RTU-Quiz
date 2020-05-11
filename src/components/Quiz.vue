<template>
<div class="row">
    <div class="col-12">
        <div class="row">
            <div class="col-12">
                <div class="progress">
                    <div :style="{'width': progressPercent + '%'}" class="progress-bar progress-bar-striped"
                         role="progressbar">{{progressPercent + '%'}}
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 border border-dark">
                {{currentQuestion.text}}
            </div>
        </div>
        <div class="row p-3">
            <div @click="saveAnswer(answer.isCorrect)" class="col-6 btn btn-outline-dark"
                 v-for="answer in currentQuestion.answers">
                {{answer.text}}
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import { Quiz } from '../models/quiz.models';

    export default {
        name: 'Quiz',
        props: {
            quiz: {
                type: Quiz,
                required: true
            }
        },
        data () {
            return {
                currentQuestionIndex: 0,
                answers: [],
            };
        },
        methods: {
            saveAnswer (isCorrect) {
                this.answers.push(isCorrect);
                if (this.currentQuestionIndex < this.questionCount - 1) {
                    this.currentQuestionIndex++;
                } else {
                    this.$emit('quiz-completed', this.answers);
                }
            }
        },
        computed: {
            currentQuestion () {
                return this.quiz.questions[this.currentQuestionIndex];
            },
            questionCount () {
                return this.quiz.questions.length;
            },
            progressPercent () {
                return this.currentQuestionIndex / this.questionCount * 100;
            }
        }
    };
</script>
