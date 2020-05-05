<template>
  <div id="quiz" class="container">
      <div class="row">
          <div class="col-12">
              {{msg}}
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
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
