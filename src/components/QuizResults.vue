<template>
    <div class="row">
        <div class="col-12">
            <div class="row">
                <div class="col-12">
                    <div class="progress">
                        <div :class="answer ? 'bg-success' : 'bg-danger'"
                             :style="{'width': questionProgressWidth + '%'}"
                             class="progress-bar progress-bar-striped progress-bar-animated"
                             role="progressbar" v-for="answer in answers"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 border border-dark h2">
                    Pareizās atbildes: {{correctAnswers}} / {{answers.length}}
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="btn btn-outline-primary" @click="restart">Start again!</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'QuizResults',
        props: {
            answers: {
                type: Array,
                required: true
            },
        },
        methods: {
            restart() {
                this.$emit('restart')
            }
        },
        computed: {
            correctAnswers () {
                return this.answers.filter(Boolean).length;
            },
            questionProgressWidth () {
                return 100 / this.answers.length;
            }
        }
    };
</script>