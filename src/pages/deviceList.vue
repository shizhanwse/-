<template>
  <div>
    <print-header title="终端状态" ></print-header>
      <div class="devlist doclist" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <mt-loadmore :top-method="loadTop" ref="loadmore">
          <dl v-for="item in dataList" class="deviceBox" @click="goLink(item)">
            <dd><img :src="[legeng[item.zdxh]]" alt=""></dd>
            <dt>
            <div class="name">{{item.zdmc}}</div>
            <div class="address">{{item.afwz}}</div>
            <div class="ip">IP：{{item.ip}}</div>
            <div class="stateBox">
              <div class="netWork state" :class="[netWorkClass[item.netWork]]">
                <img :src="[icon[item.wlzt]]" alt="">
                {{netWork[item.wlzt]}}
              </div>
            </div>
            <i class="mint-cell-allow-right"></i>
            </dt>
          </dl>
        </mt-loadmore>
      </div>



    <p v-show="loading" class="loadingFlag">
      <mt-spinner color="#26a2ff" :type="2"></mt-spinner>
      <span class="text">加载中...</span>
    </p>
    <div class="nav">
      <div class="navs print choose" @click="goLink1()">
        <div class="conts">
          <img src="../assets/printerC.png" alt="">
          <div>自助打印</div>
        </div>
      </div>
      <div class="navs control">
        <div class="conts">
          <img src="../assets/terminal.png" alt="">
          <div>终端管理</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import { Button,Spinner } from 'mint-ui'
  import Vue from 'vue'
  import utils from '../utils/utils'
  import { statusList } from '../api'
  import { Toast } from 'mint-ui';
  import machine1 from '../assets/machine1.png'
  import machine2 from '../assets/machine2.png'
  import machine3 from '../assets/machine3.png'
  import breaks from '../assets/break.png'
  import unobstructed from '../assets/unobstructed.png'
  import unused from '../assets/unused.png'
  export default {
    components: {
      printHeader
    },
    data(){
      return {
        //列表页数
        nowPage:1,
        pages:1,
        role:'',
        dataList:[],
        refresh:false,
        //图标
        legeng:{
          'DPZD':machine2,
          'XPZD':machine1
        },
        // 是否展示加载动画
        loading: false,
        // 网络,终端状态样式
        netWorkClass:['break','clear'],
        netWork:['网络中断','网络通畅'],
        icon:[breaks,unobstructed,unused]
      }
    },
    async created () {
      if(wistoken===null || wistoken===''){
        await utils.getToken();
      }
      this.getList();
      this.role = window.roles;
    },
    methods: {
      loadTop() {
      // 刷新操作
        this.$refs.loadmore.onTopLoaded();
        this.nowPage = 1;
        this.refresh = true;
        this.getList();
      },
      goLink1(){
        this.$router.push({
          name: 'index'
        })
      },
      async getList () {
        if(this.pages<this.nowPage){
          return
        }else{
          if(document.getElementById('userId')){
            window.userId = (document.getElementById('userId').value);
          }
          let data = await utils.fetch(statusList, {
            userid:window.userId,
            rows: 5,
            page: this.nowPage
          });
          if(data){
            this.nowPage++;
            this.pages = data.data.pages;
            if(this.refresh){
              this.dataList = data.data.list;
              this.refresh = false;
            }else{
              this.dataList = [...this.dataList,...data.data.list];
            }

          }
        }
      },
      goLink(params){
        if(params.wlzt === '1'){
          this.$router.push({
            name: 'operateList',
            params: { item: JSON.stringify({
              zdbh: params.zdbh,
              name:params.zdmc+params.zdxh,
              address:params.afwz
            }) }
          })
        }else{
          Toast({
            message: '网络中断无法访问！',
            position: 'bottom'
//          duration: 5000000
          });
        }
      },
      // 加载更多
      async loadMore(){
        this.loading = true;
        await this.getList();
        this.loading = false;

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .nav{
    width:100%;
    height:50px;
    background:#ffffff;
    position:fixed;
    bottom:0;
    left:0;
    .choose{
      color: #3682DA !important;
    }
    .navs{
      width:49%;
      font-size:17px;
      color: #9FADC7;
      text-align:center;
      height:23px;
      line-height:23px;
      margin-top:13px;
      display:inline-block;
      .conts{
        height:23px;
        display:inline-block;
        font-size:0;
      img{
        width:23px;
        height:23px;
        float:left;
      }
      div{
        height:23px;
        line-height:23px;
        font-size:17px;
        display:inline-block;
        margin-left:10px;
      }
    }
  }
  .print{
    border-right:1px solid #9FADC7;
  }
  }
  .clear{
    color:#82CF42;
  }
  .break{
    color:#FF993C;
  }
  .unused{
    color:#999999;
  }
  .mint-cell-allow-right::after{
    border: solid 2px #B5B5B5;
    width:14px;
    height:14px;
    border-bottom-width: 0;
    border-left-width: 0;
  }
  .devlist {
    height: calc(100vh - 90px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .deviceBox{
      background: #FFFFFF;
      box-shadow: 0 10px 17px 0 rgba(9,23,38,0.18);
      border-radius: 8px;
      padding:5px 0 15px 15px;
      margin:15px auto;
      width:88%;
      display:flex;
      dd{
        flex:0 0 86px;
        width:86px;
        height:100px;
        margin-top: 10px;
        img{
          width:100%;
          height:100%;
        }
      }
      dt{
        flex:1;
        padding-left:20px;
        position:relative;
        div{
          width:85%;
        }
        .name{
          padding-bottom:5px;
          font-size: 18px;
          color: #3682DA;
          letter-spacing: 0;
          margin-top:10px;
        }
        .address,.ip{
          font-size:12px;
          line-height:21px;
          color: #959595;
          letter-spacing: 0;
        }
        .stateBox{
          font-size:0;
          height:18px;
          margin-top:8px;
          .state{
            font-size:12px;
            margin-right:15px;
            display:inline-block;
            position:relative;
            padding-left:20px;
            img{
              width:18px;
              height:18px;
              position:absolute;
              left:0;
              top:0;
            }
          }
        }
      }
    }
  }
</style>
