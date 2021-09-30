import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const MulControl=()=> import('@/views/mulControl/MulControl')
const DataShow=()=> import('@/views/dataShow/DataShow')


const routes=[
    {
        path:'',
        redirect:'/mulControl'
    },
    {
        path: '/mulControl',
        component:MulControl
    },
    {
        path: '/dataShow',
        component:DataShow
    },

]

const router=new VueRouter({
    routes,
    mode:'history'
})

export default router