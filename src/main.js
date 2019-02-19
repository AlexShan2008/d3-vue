import Vue from 'vue/dist/vue.esm.js'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false

import Home from './views/home'
import Stack from './views/stack'

const routes = [{
    path: '/',
    component: Home
  },
  {
    path: '/stack',
    component: Stack
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")