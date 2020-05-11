<template>
    <div class="container" id="quiz">
        <quiz-start v-if="!isQuizStarted && !isQuizCompleted" @quiz-start="startQuiz"/>
        <quiz-interface v-else-if="isQuizStarted && !isQuizCompleted" :quiz="quiz" @quiz-completed="saveAnswers"/>
        <quiz-results v-else @restart="restartQuiz" :answers="answers"/>
    </div>
</template>

<script>
    import QuizInterface from '@/components/Quiz';
    import QuizResults from '@/components/QuizResults';
    import QuizStart from '@/components/QuizStart';
    import { Quiz } from '@/models/quiz.models';
    

    export default {
        name: 'App',
        components: { QuizStart, QuizResults, QuizInterface },
        data () {
            return {
                quiz: Quiz.fromObject({
                    name: 'Test',
                    questions: [
                        {
                            text: 'Q1',
                            answers: [
                                { text: 'R1', isCorrect: true },
                                { text: 'W1', isCorrect: false },
                                { text: 'W2', isCorrect: false },
                                { text: 'W3', isCorrect: false },
                            ]
                        },
                        {
                            text: 'Q2',
                            answers: [
                                { text: 'R1', isCorrect: true },
                                { text: 'W1', isCorrect: false },
                                { text: 'W2', isCorrect: false },
                                { text: 'W3', isCorrect: false },
                            ]
                        },
                        {
                            text: 'Q3',
                            answers: [
                                { text: 'R1', isCorrect: true },
                                { text: 'W1', isCorrect: false },
                                { text: 'W2', isCorrect: false },
                                { text: 'W3', isCorrect: false },
                            ]
                        },
                        {
                            text: 'Q4',
                            answers: [
                                { text: 'R1', isCorrect: true },
                                { text: 'W1', isCorrect: false },
                                { text: 'W2', isCorrect: false },
                                { text: 'W3', isCorrect: false },
                            ]
                        },
                    ]
                }),
                answers: [],
                isQuizStarted: false,
                isQuizCompleted: false,
            };
        },
        methods: {
            startQuiz() {
                this.isQuizStarted = true;
            },
            saveAnswers (answers) {
                this.answers = answers;
                this.isQuizCompleted = true;
            },
            restartQuiz() {
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
