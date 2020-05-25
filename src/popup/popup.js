import Vue from 'vue';
import App from './App';

import { Card,Button/* ,Divider */ } from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

import 'ant-design-vue/lib/base/style/css'
import 'ant-design-vue/lib/card/style/css'
import 'ant-design-vue/lib/button/style/css'

Vue.use(Card);
Vue.use(Button);

/* eslint-disable no-new */
new Vue({
  el: '#app',

  render: h => h(App),
});
