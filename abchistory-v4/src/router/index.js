import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '../views/Top.vue'
import ContentsList from '../views/ContentsList.vue'
import ContentsDetail from '../views/ContentsDetail.vue'
import Add from '../views/Add.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/Contents',
    name: 'ContentsList',
    component: ContentsList
  },
  {
    path: '/Contents/:id',
    name: 'ContenstDetail',
    component: ContentsDetail,
    props: route => ({id : String(route.params.id)})
  },
  {
    path: '/Add',
    name: 'Add',
    component: Add
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
