<template>
    <div class="row">
        <div class="col-12">
            <div class="row">
                <div class="col-12">
                    <div class="progress fixed-footer">
                        <div :class="getAnswerProgressClass(answer, index)"
                             :style="{'width': questionProgressWidth + '%'}"
                             class="progress-bar progress-bar-animated progress-bar--clickable"
                             role="progressbar" v-for="(answer, index) in answers"
                             @click="currentQuestionIndex = index">
                            {{`${answer.points} / ${getQuestionMaxPoints(quiz.questions[index])}`}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 h2">
                    Pareizās atbildes: {{correctAnswers}} / {{quiz.questions.length}}
                </div>
                <div class="col-12 h2">
                    Punkti: {{points}} / {{totalPoints}}
                </div>
            </div>
            <div v-if="currentQuestion">
                <div class="row row--textfield mt-3" v-if="currentQuestion.text">
                    <div class="col-12">
                        {{currentQuestion.text}}
                    </div>
                </div>
                <div class="row row--buttonfield" v-if="currentQuestion.answers">
                    <div class="btn--answers" v-for="(answer, index) in currentQuestion.answers"
                         :class="[`btn--answers--${getAnswerButtonClass(answer)}`, getAnswerWidthClass(index)]" disabled>
                        {{answer.text}}
                    </div>
                </div>
                <div class="row row--buttonfield" v-else-if="currentQuestion.answer">
                    <div class="col-12">
                        <input class="form-control epic-and-cool-inputfield epic-and-cool-inputfield--margin" type="text" v-model="answers[currentQuestionIndex].text" disabled/>
                    </div>
                </div>
            </div>
            <div v-if="answers[currentQuestionIndex].description" class="row row--descriptionfield"
                 :class="`row--descriptionfield--${getAnswerButtonClass(answers[currentQuestionIndex])}`"
                 v-html="answers[currentQuestionIndex].description">
            </div>
            <div class="row row--answers-lower">
                <div class="col-12">
                    <div @click="restart" class="btn btn--quiz">Uz sākumu!</div>
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
            stat.totalPoints = this.totalPoints;
            stat.correctPoints = this.points;
            stat.date = moment().format('YYYY-MM-DD h:mm:ss.SSS');
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
                    return 'progress-bar--green';
                } else if (answer.points > 0) {
                    return 'progress-bar--yellow';
                } else {
                    return 'progress-bar--red';
                }
            },
            getAnswerButtonClass (answer) {
                if (this.answers[this.currentQuestionIndex].text === answer.text) {
                    if (this.isAnswerMostValuable(answer, this.currentQuestionIndex)) {
                        return 'green';
                    } else if (this.answers[this.currentQuestionIndex].points > 0) {
                        return 'yellow';
                    } else {
                        return 'red';
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
            },
            getMostValuableAnswer (question) {
                if (question.answer) {
                    return question.answer;
                }
                const maxPoints = Math.max(...question.answers.map(a => a.points));

                return question.answers.find(a => a.points === maxPoints);
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
            points () {
                return this.answers.map(a => a.points).reduce((s, p) => s + p);
            },
            totalPoints () {
                return this.quiz.questions.map(this.getMostValuableAnswer).map(a => a.points).reduce((s, p) => s + p);
            }
        }
    };
</script>