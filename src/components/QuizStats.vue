<template>
    <div class="row" v-if="stats.length">
        <div class="col-12">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Tests</th>
                        <th>Pareizās atbildes</th>
                        <th>Patērētais laiks</th>
                        <th>Datums</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="quizStat in stats">
                        <td>{{quizStat.quizName}}</td>
                        <td>{{quizStat.correctQuestions}} / {{quizStat.totalQuestions}}</td>
                        <td>{{new Date(quizStat.timeTaken * 1000).toISOString().substr(11, 12)}}</td>
                        <td>{{quizStat.date}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { QuizStat } from '@/models/quiz.models';

    export default {
        name: 'QuizStats',
        /** stats {QuizStat[]} */
        data () {
            return {
                stats: []
            };
        },
        mounted () {
            const stats = localStorage.getItem('quiz-stats');
            if (!stats) {
                return;
            }

            this.stats = JSON.parse(stats).map(QuizStat.fromObject);
        }
    };
</script>

<style scoped>

</style>