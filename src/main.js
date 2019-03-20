// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import https from './common/https'
import store from './store/store'
import 'lib-flexible'
import './assets/css/public.less'

import { Select,Option,Radio,RadioGroup,DatePicker,Loading} from 'element-ui';

import { Loadmore } from 'mint-ui';
import  { ToastPlugin} from 'vux'

Vue.use(ToastPlugin,{position: 'top',type:'text',width:'20em'})

Vue.component('mt-loadmore', Loadmore);

Vue.component('el-select', Select);
Vue.component('el-option', Option);
Vue.component('el-radio', Radio);
Vue.component('el-radio-group', RadioGroup);
Vue.component('el-date-picker', DatePicker);

Vue.use(Loading.directive);

Vue.prototype.$https = https

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
