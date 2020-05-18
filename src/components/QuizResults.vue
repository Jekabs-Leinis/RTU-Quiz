<template>
    <div class="row">
        <div class="col-12">
            <div class="row">
                <div class="col-12">
                    <div class="progress">
                        <div :class="getAnswerProgressClass(answer, index)"
                             :style="{'width': questionProgressWidth + '%'}"
                             class="progress-bar progress-bar-striped progress-bar-animated"
                             role="progressbar" v-for="(answer, index) in answers">
                            {{`${answer.points} / ${getQuestionMaxPoints(quiz.questions[index])}`}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 border border-dark h2">
                    Pareizās atbildes: {{correctAnswers}} / {{quiz.questions.length}}
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div @click="restart" class="btn btn-outline-primary">Uz sākumu!</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Quiz } from '@/models/quiz.models';

    export default {
        name: 'QuizResults',
        props: {
            quiz: {
                type: Quiz,
                required: true
            },
            answers: {
                type: Array,
                required: true
            },
        },
        methods: {
            restart () {
                this.$emit('restart');
            },
            getAnswerProgressClass (answer, index) {
                if (this.isAnswerMostValuable(answer, index)) {
                    return 'bg-success';
                } else if (answer.points > 0) {
                    return 'bg-warning';
                } else {
                    return 'bg-danger';
                }
            },
            isAnswerMostValuable (answer, index) {
                const question = this.quiz.questions[index];
                if (question.answer) {
                    return answer.points > 0;
                }
                return this.getQuestionMaxPoints(question) === answer.points;
            },
            getQuestionMaxPoints (question) {
                if (question.answer) {
                    return question.answer.points;
                }

                return Math.max(...question.answers.map(a => a.points));
            }
        },
        computed: {
            correctAnswers () {
                return this.answers.filter(a => a.points > 0).length;
            },
            questionProgressWidth () {
                return 100 / this.answers.length;
            }
        }
    };
</script>