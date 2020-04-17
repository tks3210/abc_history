import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '../components/Top.vue'
import Contents from '../components/Contents.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes : [
        {
            path: '/',
            component: Top
        },
        {
            path: '/Contents',
            component: Contents
        }
    ]
})

export default router
