<template>
    <div class="row">
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
                        <td>{{quizStat.correctAnswers}} / {{quizStat.totalAnswers}}</td>
                        <td>{{new Date(quizStat.timeTaken * 1000).toISOString().substr(11, 8)}}</td>
                        <td>{{quizStat.date}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'QuizStats',
        /** stats {QuizStat[]} */
        props: {
            stats: {
                type: Array,
                required: true
            }
        }
    };
</script>

<style scoped>

</style>