import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'//首页
import NotFound from '@/pages/notFound'//404
import Intro from '@/pages/intro'//智估简介
import Fast from '@/pages/fast' //快速估值
import Profession from '@/pages/profession' //专业估值
import History from '@/pages/history'//智估历史
import InfoReport from '@/pages/infoReport'//估值详情

import StepOne from '@/components/stepOne'//第一页表单
import StepTwo from '@/components/stepTwo'//第二页表单
import StepThree from '@/components/stepThree'//第二页表单
import CompanyInfo from '@/components/companyInfo'//公司信息
import ReportContent from '@/components/reportContent'//报告信息

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index
    },
    {
      path: '/intro',
      name: '智估简介',
      component: Intro
    },
    {
      path: '/fast',
      name: '快速估值',
      component: Fast,
      children: [
        {
          path: '',
          name: 'fastStepOne',
          component: StepOne
        },
        {
          path: 'stepTwo',
          name: 'fastStepTwo',
          component: StepTwo
        }
      ]
    },
    {
      path: '/profession',
      name: '专业估值',
      component: Profession,
      children: [
        {
          path: '',
          name: 'professionStepOne',
          component: StepOne
        },
        {
          path: 'stepTwo',
          name: 'professionStepTwo',
          component: StepTwo
        },
        {
          path: 'stepThree',
          name: 'professionStepThree',
          component: StepThree
        }
      ]
    },
    {
      path: '/history',
      name: '智估历史',
      component: History
    },
    {
      path: '/infoReport',
      name: '公司信息及估值报告',
      component: InfoReport,
      children: [
        {
          path: '',
          name: '公司信息',
          component: CompanyInfo,
        },
        {
          path:'report',
          name:'估值报告',
          component:ReportContent
        }
      ]

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
