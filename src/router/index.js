import Vue from 'vue'
import Router from 'vue-router'
import Explorer from '@/components/Explorer'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Explorer',
            component: Explorer
        }
    ]
})
