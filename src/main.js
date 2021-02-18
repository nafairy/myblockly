// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
// import VueAxios from "vue-axios";
// element-ui
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import VueHighlightJS from 'vue-highlightjs'
//圆形悬浮图标
// import CircleMenu from 'vue-circle-menu'
//圆形图标
// Vue.component('CircleMenu', CircleMenu)
Vue.config.productionTip = false;
Vue.config.devtools = true
/*Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.use(VueHighlightJS );*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
