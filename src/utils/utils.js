/**
 * Created by Gaven on 17/6/9.
 */
import 'whatwg-fetch'
import urlencode from 'urlencode'
import { Indicator, Toast, MessageBox } from 'mint-ui'
import { getToken, jsApiConfig } from '../api'

let _getToken = null;
if(process.env.NODE_ENV === 'production'){
  _getToken = ()=>{
    return new Promise((resolve, reject)=>{
      if(document.getElementById('roles')){
        window.roles = (document.getElementById('roles').value);
      }
      if(document.getElementById('contextPath')){
        window.subPath = document.getElementById("contextPath").value;
      }
      window.host = location.protocol +'//'+ location.host + window.subPath;

      if(document.getElementById('wistoken')){
        window.wistoken = (document.getElementById('wistoken').value);
        if(!window.wistoken || window.wistoken==''){
          let msg = (document.getElementById('msg').value);
          Toast(msg);
        }
        resolve();
      }else{
        reject();
      }
    })
  };
}else{
  _getToken = ()=>{
    if(document.getElementById('contextPath')){
      window.subPath = document.getElementById("contextPath").value;
    }
    window.host = 'http://zzfw3.wisedu.com' + window.subPath;
    console.log(window.host);
    return fetch(window.host+getToken+`?userId=${username}&password=${password}`, {
      method: 'POST',
      timeout: 30*1000
    })
      .then(res=>res.json())
      .then(res=>{
        if(res.ret === '0'){
          window.wistoken = res.data.token;
          return res.data.token
        }else{
          Toast(res.msg);
        }
      })
  };
}

const _fetch = (url, params={})=>{
  Indicator.open();
  return fetch(window.host+url+'?'+urlencode.stringify(params), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      token: wistoken,
    },
    timeout: 30*1000
  })
    .then(res=>res.json())
    .then(res=>{
      if(res.ret === '0'){
        Indicator.close();
        if(url.indexOf('command')!=-1){
          if(url === '/api/command/shutdown') {
            Toast({
              message: '关机请求发送成功',
              iconClass: 'mintui mintui-success'
            });
          }
          if(url === '/api/command/reboot') {
            Toast({
              message: '重启请求发送成功',
              iconClass: 'mintui mintui-success'
            });
          }
          return res.data?res:true
        }else{
          return res.data?res.data:true
        }
      }else if(res.msg&&res.msg.indexOf('token') > -1){
        Indicator.close();
        // window.location.href = 'http://zzfw3.wisedu.com/zzfw-api/';
      }else{
        Indicator.close();
        console.log(res.msg?res.msg:JSON.stringify(res));
        if(url === '/api/command/opentv'){
          MessageBox('启动失败', 'TCP未建立连接');
          return null;
        }else if(url === '/api/command/shutdown'){
          Toast({
            message: '关机失败',
            iconClass: 'mintui u-icon-warningO'
          });
          return null;
        }else if(url === '/api/command/reboot'){
          Toast({
            message: '重启失败',
            iconClass: 'mintui u-icon-warningO'
            //duration: 5000000
          });
          return null;
        }else{
          Toast('出错 msg：'+res.msg);
          return null;
        }

      }
  }).catch(e=>{
    Indicator.close();
    Toast(e.message);
  })
};

const _generateUUID = ()=>{
  let d = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid.replace(/-/g, '');
};

const _getWXConfig = (params)=>{
  return _fetch(jsApiConfig, params);
};

export default {
  getToken: _getToken,
  fetch: _fetch,
  generateUUID: _generateUUID,
  getWXConfig: _getWXConfig
};
