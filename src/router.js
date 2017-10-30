import Vue from 'vue'
import Router from 'vue-router'
import index from './pages/index.vue'
import printlist from './pages/printlist.vue'
import printdetail from './pages/printdetail.vue'
import printpay from './pages/printpay.vue'
import printpreview from './pages/printpreview.vue'
import printscan from './pages/printscan.vue'
import printscannew from './pages/printscannew.vue'
import printmachine from './pages/printmachine.vue'
import printmachinenew from './pages/printmachinenew.vue'
import printmap from './pages/printmap.vue'
import printwaiting from './pages/printwaiting.vue'

import printlistfinished from './pages/printlistfinished.vue'
import printeddetail from './pages/printeddetail.vue'
import printlistunfinished from './pages/printlistunfinished.vue'
//终端
import init from './components/init.vue'
import operateList from './pages/operateList.vue'
import deviceList from './pages/deviceList.vue'
import setTime from './pages/setTime.vue'
import terminalDetails from './pages/terminalDetails.vue'
import fileDirectory from './pages/fileDirectory.vue'
import remoteControl from './pages/remoteControl.vue'
import fileDownload from './pages/fileDownload.vue'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },

    {
      path: '/deviceList',
      name: 'deviceList',
      component: deviceList
    },
    {
      path: '/operateList/:item',
      name: 'operateList',
      component: operateList
    },
    {
      path: '/setTime/:item',
      name: 'setTime',
      component: setTime
    },
    {
      path: '/remoteControl/:item',
      name: 'remoteControl',
      component: remoteControl
    },
    {
      path: '/terminalDetails/:item',
      name: 'terminalDetails',
      component: terminalDetails
    },
    {
      path: '/fileDirectory/:item',
      name: 'fileDirectory',
      component: fileDirectory
    },
    {
      path: '/fileDownload/:item',
      name: 'fileDownload',
      component: fileDownload
    },


    {
      path: '/printlist',
      name: 'printlist',
      component: printlist
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/printdetail/:item',
      name: 'printdetail',
      component: printdetail
    },
    {
      path: '/printpay/:item',
      name: 'printpay',
      component: printpay
    },
    {
      path: '/printpreview/:item',
      name: 'printpreview',
      component: printpreview
    },
    {
      path: '/printscan/:item',
      name: 'printscan',
      component: printscan
    },
    {
      path: '/printscannew/:item',
      name: 'printscannew',
      component: printscannew
    },
    {
      path: '/printmachine/:item',
      name: 'printmachine',
      component: printmachine
    },
    {
      path: '/printmachinenew/:item',
      name: 'printmachinenew',
      component: printmachinenew
    },
    {
      path: '/printmap/:item',
      name: 'printmap',
      component: printmap
    },
    {
      path: '/printwaiting',
      name: 'printwaiting',
      component: printwaiting
    },
    {
      path: '/printlistfinished',
      name: 'printlistfinished',
      component: printlistfinished
    },
    {
      path: '/printeddetail/:item',
      name: 'printeddetail',
      component: printeddetail
    },
    {
      path: '/printlistunfinished',
      name: 'printlistunfinished',
      component: printlistunfinished
    }
  ]
})
