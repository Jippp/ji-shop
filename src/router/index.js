import Vue from 'vue'
import Router from 'vue-router'
import Vuex from "Vuex"
import index from '@/components/index'
import car from '@/components/car'
import previewProduct from '@/components/previewProduct'
import payment from '@/components/payment'
import success from '@/components/success'

Vue.use(Router)
Vue.use(Vuex)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: index
    }, {
        path: '/car',
        component: car,
        children: [{
            path: "/",
            component: previewProduct
        }, {
            path: "/car/payment",
            name: "payment",
            component: payment
        }, {
            path: "/car/success",
            name: "success",
            component: success
        }]
    }]
})