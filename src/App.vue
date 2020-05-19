<template>
    <div class="center-helper">
        <div class="container container--window" id="quiz">
            <quiz-start @quiz-start="startQuiz" v-if="!isQuizStarted && !isQuizCompleted"/>
            <quiz-interface :quiz="quiz" @quiz-completed="saveAnswers" v-else-if="isQuizStarted && !isQuizCompleted"/>
            <quiz-results :quiz="quiz" :start-time="startTime" :end-time="endTime" :answers="answers" @restart="restartQuiz"
                        v-else/>
        </div>
    </div>
</template>
<script>
    import QuizInterface from '@/components/Quiz';
    import QuizResults from '@/components/QuizResults';
    import QuizStart from '@/components/QuizStart';

    export default {
        name: 'App',
        components: { QuizStart, QuizResults, QuizInterface },
        data () {
            return {
                quiz: null,
                answers: [],
                isQuizStarted: false,
                isQuizCompleted: false,
                startTime: null,
                endTime: null,
            };
        },
        methods: {
            startQuiz (quiz) {
                this.startTime = new Date();
                this.quiz = quiz;
                this.isQuizStarted = true;
            },
            saveAnswers (answers) {
                this.endTime = new Date();
                this.answers = answers;
                this.isQuizCompleted = true;
            },
            restartQuiz () {
                this.isQuizStarted = false;
                this.isQuizCompleted = false;
            }
        },
        computed: {}
    };
</script>

<style lang="scss">
    @import './scss/global.scss';
</style>