import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Test from '../components/Test'

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path:'/home',
            component: () => import('../components/HelloWorld')
        }
    ]
})

//动态添加路由
router.$append = (index) => {
    router.addRoute(``,{
        name:`Test${index}`,
        path: `/test${index}`,
        component:  {
            ...Test,
            name: `Test${index}`
        },
    })
}

router.$push = (index) => {
    router.push({
        path:`/test${index}`,
        query:{
            name:`Test${index}`
        }
    })
}
export default  router