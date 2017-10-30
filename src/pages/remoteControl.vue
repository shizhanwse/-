<template>
  <div>
    <print-header class="headTitle" title="启动远程控制" ></print-header>
    <div class="box">
      <div class="name">远程控制账号</div>
      <div class="contentBox" v-if="copy">
        <div class="conv"></div>
        <input id="account" class="val" type="text" :value="accountNumber">
        <button class="button account" data-clipboard-target="#account" v-if="control">
          <div class="btnS">复制</div>
        </button>
      </div>
      <div class="contentBox" v-if="!copy">{{accountNumber}}</div>
    </div>
    <div class="box">
      <div class="name">远程控制密码</div>
      <div class="contentBox" v-if="copy">
        <div class="conv"></div>
        <input id="password" class="val" type="text" :value="accountPassword">
        <button class="button password" data-clipboard-target="#password" v-if="control">
          <div class="btnS">复制</div>
        </button>
      </div>
      <div class="contentBox" v-if="!copy">{{accountPassword}}</div>
    </div>
    <div class="submit">
      <mt-button class="submiting" size="large" type="primary" @click="submit">启动远程控制</mt-button>
    </div>

  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import Vue from 'vue'
  import { Toast } from 'mint-ui'
  import utils from '../utils/utils'
  import { opentv } from '../api'
  import Clipboard from 'clipboard';

  export default {
    components: {
      printHeader
    },
    data(){
      return {
        item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
        control:false,
        accountNumber:'',
        accountPassword:'',
        copy:true
      }
    },
    mounted () {
      if(navigator.userAgent.indexOf('iPhone OS 9') > -1 || navigator.userAgent.indexOf('iPhone OS 8') > -1){
        this.copy = false;
      }
      //复制账号密码
      let self = this;
      const account = new Clipboard('.account');
      account.on('success', function(e) {
        //判断安卓、苹果点击
        let ua = navigator.userAgent.toLowerCase();
        Toast('复制成功');
        self.copy = '可以';
        e.clearSelection();
      });
      account.on('error', function(e) {
        let ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
          self.copy = '不可以'
        }

      });
      const password = new Clipboard('.password');
      password.on('success', function(e) {
        //判断安卓、苹果点击
        let ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
          Toast('复制成功');
        }
        e.clearSelection();
      });
    },
    methods: {
      open(picker) {
        this.$refs[picker].open();
      },
      async submit () {
        let data = await utils.fetch(opentv, {
          zdbh:this.item.zdbh
        });
        if(data.data){
          this. accountNumber = data.data.tvid;
          this.accountPassword = data.data.tvpwd;
          this.control = true;
        }
      },
      openBottomToast() {
        Toast({
          message: '开机时间不能大于关机时间',
          position: 'bottom'
//          duration: 5000000
        });
      },
      openToastWithIcon() {
        Toast({
          message: '设置成功',
          iconClass: 'mintui mintui-success'
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .submiting{
    background-color: #3D97FF;
  }
  .headTitle{
    margin-bottom:15px;
  }
  .box{
    width:calc(100% - 40px);
    padding:0 20px;
    height:50px;
    line-height:50px;
    background:#ffffff;
    margin-bottom:15px;
    font-size:17px;
    display:flex;
    .name{
      color: #1E2329;
      flex:0 0 105px;
      width:105px;
    }
    .contentBox{
      flex:1;
      position:relative;
      font-size: 17px;
      text-align: right;
      color: #9B9B9B;
      .conv{
        position:absolute;
        width:calc(100% - 55px);
        height:50px;
        top:0;
        left:0;
      }
      .button{
        display:inline-block;
        color: #4492FF;
        width: 45px;
        text-align: right;
        border: none;
        background: #fff;
        outline:none;
        line-height:50px;
        font-size:17px;
      }
      .val{
        width:calc(100% - 55px);
        display:inline-block;
        color: #9B9B9B;
        border:none;
        text-align:right;
        height:50px;
        font-size:17px;
      }
    }

  }

  .submit{
    padding:30px 20px 0;
  }
</style>
