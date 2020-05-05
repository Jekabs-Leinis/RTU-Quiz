<template>
    <div class="container" id="quiz">
        <div class="row">
            <div class="col-12">
                {{msg}}
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap';

    export default {
        name: 'app',
        data() {
            return {
                msg: 'Quiz goes here',
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
