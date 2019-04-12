import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'//首页
import NotFound from '@/pages/notFound'//404

import Login from '@/components/login' //登录
import Register from '@/components/register' //注册
import Agreement from '@/components/agreement' //协议

import UserIndex from '@/pages/userIndex' //用户主页
import Product from '@/pages/product' //产品列表页
import CpInfo from '@/pages/cpInfo' //产品详情页


import Applications from '@/pages/applications' //我的申请
import Apply from '@/pages/apply' //申请-认证
import ApplyTwo from '@/pages/applyTwo' //申请-申请
import ApplyThree from '@/pages/applyThree' //申请-签字


import Steps from '@/pages/steps' //关于我们

import AboutUs from '@/pages/aboutUs' //关于我们
import Questions from '@/pages/questions' //常见问题
import Messages from '@/pages/messages' //信息列表
import Message from '@/pages/message' //信息页

import Authentication from '@/pages/authentication' //企业认证
import ChangePWD from '@/pages/changePWD' //企业认证


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index,
    },
    {
      path:'/login',
      name:'登录',
      component: Login
    },
    {
      path:'/register',
      name:'注册',
      component: Register
    },
    {
      path:'/agreement',
      name:'协议书',
      component: Agreement
    },
    {
      path: '/userIndex',
      name: '用户主页',
      component: UserIndex
    },
    {
      path: '/product',
      name: '产品列表页',
      component: Product
    },
    {
      path: '/cpInfo/:id',
      name: '产品详情页',
      component: CpInfo
    },
    {
      path: '/applications',
      name: '我的申请',
      component: Applications
    },
    {
      path: '/apply/:id',
      name: '申请-认证',
      component: Apply
    },
    {
      path: '/applyTwo/:id',
      name: '申请-申请',
      component: ApplyTwo
    },
    {
      path: '/applyThree',
      name: '申请-签字',
      component: ApplyThree
    },
    {
      path: '/aboutUs',
      name: '关于我们',
      component: AboutUs
    },
    {
      path: '/questions',
      name: '常见问题',
      component: Questions
    },
    {
      path: '/steps',
      name: '申请流程',
      component: Steps
    },
    {
      path: '/authentication',
      name: '企业认证',
      component: Authentication
    },
    {
      path: '/changePWD',
      name: '修改密码',
      component: ChangePWD
    },
    {
      path: '/messages',
      name: '信息列表',
      component: Messages
    },
    {
      path: '/message/:id',
      name: '信息页',
      component: Message
    },
    {
      path: '*',
      name: '404页面',
      component: NotFound
    }
  ],
  scrollBehavior(to, from, pos) {
    return { x: 0, y: 0 }
  }
})
