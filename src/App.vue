<template>
    <div class="container" id="quiz">
        <div class="row">
            <div class="col-12">
                {{currentQuestion.text}}
            </div>
            <div class="col-6" v-for="answer in currentQuestion.answers">
                {{answer.text}}
            </div>
        </div>
    </div>
</template>

<script>
    import {Quiz} from './models/quiz.models';
    
    export default {
        name: 'App',
        data() {
            return {
                currentQuestionIndex: 0,
                quiz: Quiz.fromObject({
                    name: "Test",
                    questions: [
                        {
                            text: "Q1",
                            answers: [
                                {text: "R1", isCorrect: true},
                                {text: "W1", isCorrect: false},
                                {text: "W2", isCorrect: false},
                                {text: "W3", isCorrect: false},
                            ]
                        },
                        {
                            text: "Q2",
                            answers: [
                                {text: "R1", isCorrect: true},
                                {text: "W1", isCorrect: false},
                                {text: "W2", isCorrect: false},
                                {text: "W3", isCorrect: false},
                            ]
                        },
                        {
                            text: "Q3",
                            answers: [
                                {text: "R1", isCorrect: true},
                                {text: "W1", isCorrect: false},
                                {text: "W2", isCorrect: false},
                                {text: "W3", isCorrect: false},
                            ]
                        },
                        {
                            text: "Q4",
                            answers: [
                                {text: "R1", isCorrect: true},
                                {text: "W1", isCorrect: false},
                                {text: "W2", isCorrect: false},
                                {text: "W3", isCorrect: false},
                            ]
                        },
                    ]
                })
            }
        },
        methods: {

        },
        computed: {
            currentQuestion() {
                return this.quiz.questions[this.currentQuestionIndex]
            }
        }
    }
</script>

<style lang="scss">
    #quiz {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
