// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import { InfiniteScroll } from 'mint-ui'
import Mint from 'mint-ui';
import init from 'bh-mixin-sdk'
import utils from './utils/utils'
import { jsApiConfig } from './api'
import urlencode from 'urlencode'
import 'whatwg-fetch'

import VuePreview from 'vue-preview'
Vue.use(VuePreview);
Vue.use(Mint);

Vue.use(InfiniteScroll);

window.userId = null;
window.roles = null;
window.wistoken = null;
if(process.env.NODE_ENV !== 'production'){
  window.username = 'ssadmin';
  window.password = 1;
  window.userId = '2000027';
  window.roles = '系统管理员，本科生';
}
window.srcRegionCode = 'zzfw-mobile';

Vue.config.productionTip = false;

// window.onload = function () {
//   document.addEventListener("touchmove", function(evt){
//     evt.preventDefault();
//   }, true);
// };
if (window.smile) {
  window.Vue = Vue
  window.axios = axios
  if (WEBPACK_CONIFG_HOST) {
    window.WEBPACK_CONIFG_HOST = WEBPACK_CONIFG_HOST
  }
  // 初始化eventBus
  window.smile.eventBus = new Vue()
}

router.beforeEach((to, from, next) => {
  // 加载页面smile依赖
  if (window.smile) {
    var require = []
    var promiseArr = []
    // 拉取require配置中的表单
    if (to.meta.require && to.meta.require.length > 0) {
      require = require.concat(to.meta.require)
    }
    // 拉取传参中的表单
    if (to.query.smileForm) {
      require.push(to.query.smileForm)
    }
    require.map(function(item) {
      if (!window.smile.components[item]) {
        promiseArr.push(window.smile.loadPage(item))
      }
    })
    if (promiseArr.length > 0) {
      Promise.all(promiseArr).then(function() {
        next()
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
global.SDK = null;
let getSDKConfig = async function() {
  if(wistoken===null || wistoken===''){
    await utils.getToken();
  }
  return new Promise((resolve, reject) => {
    let config = {
      // 微信sdk初始化参数
      wx: {
        /**
         * 微信端上传图片的流程是：
         * 1、选取文件通过微信jsdk上传到微信服务器后获取文件的serverId
         * 2、将serverId发送到应用服务端，服务端接收请求后根据serverId，将文件从微信服务拉取到应用服务
         *
         * uploadImgsToEmapUrl 参数 就是步骤2中 将serverId发送到应用服务的请求接口
         */
        // TODO: 上传接口
        //uploadImgsToEmapUrl: WEBPACK_CONIFG_HOST + '/sys/yxapp/WechatServiceStu/saveFileFromWechat.do' //TODO: 上传接口
      },
      dd: {}, //钉钉jdk初始化参数
    }
    if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
      /**
       * 判断运行环境为微信时，向后端发送请求获取微信jsdk的授权签名，（此接口应该有后端来提供），请求返回应包含以下参数
       * corpId - 企业号的corpid
       * nonceStr - 生成签名的随机串
       * timestamp - 生成签名的时间戳
       * signature - 签名
       */
        // TODO: 发请求获取微信签名
      config.wx.url = window.host;
      let params =  {
        url: window.location.href.replace(/#(\S+)?/, ''),
        forceTicket: 1
      };
      fetch(window.host+jsApiConfig+'?'+urlencode.stringify(params), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          token: wistoken
        },
        timeout: 30*1000
      })
        .then(res=>res.json())
        .then(res=>{
          if (res.ret == "0") {
            let signData = res.data
            config.wx.signData = signData
            resolve(config)
          } else {
            Toast('微信jsdk初始化失败 ' + res.code);
            reject(res)
          }
        }).catch(e=>{
        setTimeout(function () {
          resolve(config)
        }, 0)
      })
    }else {
      setTimeout(function () {
        resolve(config)
      }, 0)
    }
    return config
  })
}

getSDKConfig().then((config) => {
  init((res) => {
    if (res.type === 'success') {
      global.SDK = res.sdk;

      new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: {
          App
        }
      });
    }
  }, config)
})
