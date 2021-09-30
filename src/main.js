import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import store from './store'

import'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
