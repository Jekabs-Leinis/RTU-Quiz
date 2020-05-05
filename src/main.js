import Vue from 'vue'
import Quiz from './Quiz.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

new Vue({
  el: '#quiz',
  render: h => h(Quiz)
});
