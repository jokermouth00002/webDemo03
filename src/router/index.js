import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue')
  }
  // {
  //   path: '/loading',
  //   name: 'loading',
  //   component: () => import('../pages/Loading.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
