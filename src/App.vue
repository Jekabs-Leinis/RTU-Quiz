<template>
    <div class="container" id="quiz">
        <quiz-start @quiz-start="startQuiz" v-if="!isQuizStarted && !isQuizCompleted"/>
        <quiz-interface :quiz="quiz" @quiz-completed="saveAnswers" v-else-if="isQuizStarted && !isQuizCompleted"/>
        <quiz-results :answers="answers" @restart="restartQuiz" v-else/>
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
            };
        },
        methods: {
            startQuiz (quiz) {
                this.quiz = quiz;
                this.isQuizStarted = true;
            },
            saveAnswers (answers) {
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
    #quiz {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
