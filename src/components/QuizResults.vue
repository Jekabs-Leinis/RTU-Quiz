<template>
    <div class="row">
        <div class="col-12">
            <div class="row">
                <div class="col-12">
                    <div class="progress">
                        <div :class="getAnswerProgressClass(answer, index)"
                             :style="{'width': questionProgressWidth + '%'}"
                             class="progress-bar progress-bar-striped progress-bar-animated"
                             role="progressbar" v-for="(answer, index) in answers"
                             @click="currentQuestionIndex = index">
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
            <div v-if="currentQuestion">
                <div class="row" v-if="currentQuestion.text">
                    <div class="col-12 border border-dark">
                        {{currentQuestion.text}}
                    </div>
                </div>
                <div class="row p-3" v-if="currentQuestion.answers">
                    <div class="btn" v-for="(answer, index) in currentQuestion.answers"
                         :class="[`btn-outline-${getAnswerButtonClass(answer)}`, getAnswerWidthClass(index)]" disabled>
                        {{answer.text}}
                    </div>
                </div>
                <div class="row p-2" v-else-if="currentQuestion.answer">
                    <div class="col-12">
                        <input class="form-control" type="text" v-model="answers[currentQuestionIndex].text" disabled/>
                    </div>
                </div>
            </div>
            <div v-if="answers[currentQuestionIndex].description" class="alert"
                 :class="`alert-${getAnswerButtonClass(answers[currentQuestionIndex])}`">
                {{answers[currentQuestionIndex].description}}
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
    import { Quiz, QuizStat } from '@/models/quiz.models';
    import moment from 'moment';

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
            startTime: {
                type: Date,
                required: true
            },
            endTime: {
                type: Date,
                required: true
            }
        },
        data () {
            return {
                currentQuestionIndex: 0,
            };
        },
        mounted () {
            const json = localStorage.getItem('quiz-stats');
            const stats = json ? JSON.parse(json) : [];
            const stat = new QuizStat();
            stat.quizName = this.quiz.name;
            stat.correctQuestions = this.answers.filter(a => a.points > 0).length;
            stat.totalQuestions = this.quiz.questions.length;
            stat.date = moment().format('YYYY-MM-DD 00:00:00.000');
            stat.timeTaken = moment(this.endTime).diff(this.startTime) / 1000;
            stats.push(stat);
            localStorage.setItem('quiz-stats', JSON.stringify(stats));
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
            getAnswerButtonClass (answer) {
                if (this.answers[this.currentQuestionIndex].text === answer.text) {
                    if (this.isAnswerMostValuable(answer, this.currentQuestionIndex)) {
                        return 'success';
                    } else if (this.answers[this.currentQuestionIndex].points > 0) {
                        return 'warning';
                    } else {
                        return 'danger';
                    }
                }

                return 'dark';
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
            },
            getAnswerWidthClass (index) {
                const answerCount = this.currentQuestion.answers.length;

                return answerCount % 2 === 1 && index === answerCount - 1 ? 'col-12' : 'col-6';
            }
        },
        computed: {
            currentQuestion () {
                return this.quiz.questions[this.currentQuestionIndex];
            },
            correctAnswers () {
                return this.answers.filter(a => a.points > 0).length;
            },
            questionProgressWidth () {
                return 100 / this.answers.length;
            },
        }
    };
</script>