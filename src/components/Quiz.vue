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
            <div class="row" v-if="currentQuestion.image || currentQuestion.video">
                <div class="col-12 border border-dark">
                    <img :src="currentQuestion.image" v-if="currentQuestion.image"/>
                    <iframe :src="currentQuestion.video"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen frameborder="0"
                            height="480"
                            v-else-if="currentQuestion.video"
                            width="854"></iframe>
                </div>
            </div>
            <div class="row" v-if="currentQuestion.text">
                <div class="col-12 border border-dark">
                    {{currentQuestion.text}}
                </div>
            </div>
            <div class="row p-3" v-if="currentQuestion.answers">
                <div :class="getAnswerWidthClass(index)" @click="saveAnswer(answer)" class="btn btn-outline-dark"
                     v-for="(answer, index) in currentQuestion.answers"
                >
                    {{answer.text}}
                </div>
            </div>
            <div class="row p-2" v-else-if="currentQuestion.answer">
                <div class="col-12">
                    <input class="form-control" type="text" v-model="currentAnswer"/>
                    <button @click="checkAnswer" class="btn btn-success">Iesniegt atbildi</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Answer, Quiz } from '../models/quiz.models';

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
                currentAnswer: '',
            };
        },
        methods: {
            saveAnswer (answer) {
                this.answers.push(answer);
                if (this.currentQuestionIndex < this.questionCount - 1) {
                    this.currentQuestionIndex++;
                } else {
                    this.$emit('quiz-completed', this.answers);
                }
            },
            checkAnswer () {
                const answer = new Answer();
                answer.text = this.currentAnswer;
                // noinspection EqualityComparisonWithCoercionJS
                answer.points = (this.currentQuestion.answer.text == this.currentAnswer)
                    ? this.currentQuestion.answer.points : 0;
                this.saveAnswer(answer);
            },
            getAnswerWidthClass (index) {
                const answerCount = this.currentQuestion.answers.length;

                return answerCount % 2 === 1 && index === answerCount - 1 ? 'col-12' : 'col-6';
            },
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
