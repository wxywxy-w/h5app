// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "./style/reset.css" // 重置CSS
import "./style/index.css" // 设计全局css
import "./style/animate.css" //动画库
import Vue from 'vue'
import App from './App'
import 'lib-flexible' // 手机端自适应


import Vant from 'vant';//全局引入vant
import 'vant/lib/index.css';
Vue.use(Vant)


import router from './router'

import axios from "axios";
Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
router.beforeEach((to, from, next) => {
    console.log(to)
    document.title = to.meta.title;
    next()
});

