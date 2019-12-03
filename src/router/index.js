import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/appHome.vue'

import home from './home/index.js'


import yyslComponent from "@/components/index.js" // 自己封装的组件

Vue.use(yyslComponent)
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            meta: {
                title: '首页',
            },
            redirect: "/home/index",
        },
        {
            path: '/home',
            name: 'index',
            meta: {
                title: '首页',
            },
            component: Home,
            children: home
        },
        {
            name: "collection",
            path: "/collection",
            meta: {
                title: '收藏',
            },
            component: () =>
                import('@/views/index/collection.vue')
        },
        {
            path: '/wallet',
            name: 'wallet',
            meta: {
                title: '钱包'
            },
            component: () =>
                import('@/views/secondary/wallet.vue')
        },
        {
            path: '/search',
            name: 'search',
            meta: {
                title: '搜索'
            },
            component: () =>
                import('@/views/secondary/search.vue')

        },
        {
            path: '/goodsList',
            name: 'goodsList',
            meta: {
                title: '商品列表',
            },
            component: () =>
                import('@/views/secondary/goodsList.vue')

        },
        // 第三方
        {
            path: '/goodsDetails',
            name: 'goodsDetails',
            meta: {
                title: '商品详情',
            },
            component: () =>
                import('@/views/secondary/goodsDetails.vue')

        },
        {
            path: '/searchGoods',
            name: 'searchGoods',
            meta: {
                title: '搜索结果',
                keepAlive: false,
                ifDoFresh: false

            },
            component: () =>
                import('@/views/secondary/searchGoods.vue')

        },
        {
            path: '/webview',
            name: 'webview',
            meta: {
                title: 'webview'
            },
            component: () =>
                import('@/views/secondary/webview.vue')

        },
        {
            path: '/addressList',
            name: 'addressList',
            meta: {
                title: '收货地址'
            },
            component: () =>
                import('@/views/secondary/addressList.vue')

        },
        {
            path: '/upAddress',
            name: 'upAddress',
            meta: {
                title: '编辑地址'
            },
            component: () =>
                import('@/views/secondary/upAddress.vue')

        },
        {
            path: '/Address',
            name: 'Address',
            meta: {
                title: '添加收货地址'
            },
            component: () =>
                import('@/views/secondary/Address.vue')

        },
        {
            path: '/OrderPay',
            name: 'OrderPay',
            meta: {
                title: '订单确认'
            },
            component: () =>
                import('@/views/secondary/OrderPay.vue')

        },
        {
            path: '/selfrunorder',
            name: 'selfrunorder',
            meta: {
                title: '自营订单'
            },
            component: () =>
                import('@/views/secondary/selfrunorder.vue')

        },
        {
            path: '/orderdetails',
            name: ' orderdetails',
            meta: {
                title: '自营订单'
            },
            component: () =>
                import('@/views/secondary/orderdetails.vue')

        },
        {
            path: '/platformorder',
            name: 'platformorder',
            meta: {
                title: '平台订单'
            },
            component: () =>
                import('@/views/secondary/platformorder.vue')

        },
        {
            path: '/viewLogistics',
            name: 'viewLogistics',
            meta: {
                title: '平台订单'
            },
            component: () =>
                import('@/views/secondary/viewLogistics.vue')

        },
        {
            path: '/customerService',
            name: 'customerService',
            meta: {
                title: '客服'
            },
            component: () =>
                import('@/views/secondary/customerService.vue')

        },
        {
            path: '/payOK',
            name: 'payOK',
            meta: {
                title: '支付成功'
            },
            component: () =>
                import('@/views/secondary/payOK.vue')

        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }

})
