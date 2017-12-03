import Vue from 'vue'
import Router from 'vue-router'
import Explorer from '@/components/Explorer'

Vue.use(Router)

Vue.prototype.$eventHub = new Vue()

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Explorer',
            component: Explorer
        }
    ]
})
