import App from './App.vue';
import Vue from 'vue';
import store from './store.js';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
