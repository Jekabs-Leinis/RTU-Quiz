<template>
    <div class="row">
        <div class="col-12">
            <div class="row">
                <div class="col-12">
                    <div class="progress fixed-footer">
                        <div :style="{'width': progressPercent + '%'}" class="progress-bar progress-bar--epic"
                             role="progressbar">{{progressPercent + '%'}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row row--content" v-if="hasVisuals">
                <div class="col-12">
                    <img :src="currentQuestion.image" class="row--content" v-if="currentQuestion.image"/>
                    <iframe :src="currentQuestion.video"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen frameborder="0"
                            height="400"
                            v-else-if="currentQuestion.video"
                            width="711"></iframe>
                </div>
            </div>
            <div class="row row--textfield" :class="{'mt-3': hasVisuals}" v-if="currentQuestion.text">
                <div class="col-12" v-html="currentQuestion.text">
                </div>
            </div>
            <div class="row row--buttonfield" v-if="currentQuestion.answers">
                <div :class="getAnswerWidthClass(index)" @click="saveAnswer(answer)" class="btn btn--quiz"
                     v-for="(answer, index) in currentQuestion.answers"
                >
                    {{answer.text}}
                </div>
            </div>
            <div class="row row--buttonfield" v-else-if="currentQuestion.answer">
                <div class="col-12">
                    <div class="input-group my-3" :class="{'mt-3': hasVisuals}">
                        <input class="form-control epic-and-cool-inputfield" type="text" @keyup.enter="checkAnswer"
                               v-model="currentAnswer"/>
                        <div class="input-group-append">
                            <button @click="checkAnswer" class="btn btn--input">Iesniegt atbildi</button>
                        </div>
                    </div>
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
                answer.description = answer.description || this.currentQuestion.description;
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
                const isCorrectAnswer = this.currentQuestion.answer.text == this.currentAnswer;
                answer.points = isCorrectAnswer ? this.currentQuestion.answer.points : 0;
                answer.description = isCorrectAnswer ? this.currentQuestion.answer.description
                    : this.currentQuestion.description;
                this.saveAnswer(answer);
                this.currentAnswer = '';
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
            },
            hasVisuals () {
                return !!(this.currentQuestion.image || this.currentQuestion.video);
            }
        }
    };
</script>
