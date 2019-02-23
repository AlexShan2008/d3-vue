import Vue from 'vue/dist/vue.esm.js'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false

import Home from './views/home'
import Stack from './views/stack'
import newStack from './views/stack/stack'
import Tree from './views/tree'
import Stock from './views/stock'

const routes = [{
    path: '/',
    component: Home
  },
  {
    path: '/stack',
    component: Stack
  },
  {
    path: '/stack/new',
    component: newStack
  },
  {
    path: '/tree',
    component: Tree
  },
  {
    path: '/stock',
    component: Stock
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")