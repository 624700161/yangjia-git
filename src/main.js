// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import https from './common/https'
import store from './store/store'

import Mint from 'mint-ui';

import './assets/css/element.sass'

import 'lib-flexible'
import 'mint-ui/lib/style.css'
import './assets/css/public.less'
import './assets/css/mint.less'



import { Select,Option,Radio,RadioGroup,DatePicker,Badge,Icon,Collapse,CollapseItem,Button,Form,FormItem,Input,InputNumber} from 'element-ui';


Vue.use(Mint);

import  { ToastPlugin } from 'vux'

Vue.use(ToastPlugin,{position: 'top',type:'text',width:'20em'})

Vue.component('el-select', Select);
Vue.component('el-option', Option);
Vue.component('el-radio', Radio);
Vue.component('el-radio-group', RadioGroup);
Vue.component('el-date-picker', DatePicker);



Vue.use(Badge);
Vue.use(Icon);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(InputNumber);

Vue.prototype.$https = https

Vue.config.productionTip = false

window.EventBus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
