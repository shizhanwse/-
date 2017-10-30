<template>
  <div>
    <print-header title="终端详情" ></print-header>

    <div class="box">
      <div class="title">基本信息</div>
      <dl>
        <dd>终端编号</dd>
        <dt>{{item.name}}</dt>
      </dl>
      <dl>
        <dd>安放位置</dd>
        <dt>{{item.address}}</dt>
      </dl>
      <dl>
        <dd>开机状态</dd>
        <dt>
          <span class="circle" :class="information.kjzt === '1' ? 'normalCircle' : 'abnormalCircle'"></span>
          {{information.kjzt === '1' ? '开机' : '未开机'}}
        </dt>
      </dl>
      <dl>
        <dd>服务状态</dd>
        <dt>
          <span class="circle" :class="information.fwzt === '000' ? 'normalCircle' : 'abnormalCircle'"></span>
          {{information.fwzt === '000' ? '正常状态' : '异常状态'}}
        </dt>
      </dl>
      <dl>
        <dd>网络状态</dd>
        <dt>
          <span class="circle" :class="information.wlzt === '1' ? 'normalCircle' : 'abnormalCircle'"></span>
          {{information.wlzt === '1' ? '连接通畅' : '连接中断'}}
        </dt>
      </dl>
      <dl>
        <dd>本次上报时间</dd>
        <dt>{{information.bcsbsj}}</dt>
      </dl>
      <dl>
        <dd>本次开机时间</dd>
        <dt>{{information.bckjsj}}</dt>
      </dl>
      <dl>
        <dd>上次开机时间</dd>
        <dt>{{information.sckjsj}}</dt>
      </dl>
    </div>
    <div class="box">
      <div class="title">终端状态</div>
      <dl>
        <dd>主板电压(V)</dd>
        <dt>{{information.zbsrdy || ' _ _ _'}}</dt>
      </dl>
      <dl>
        <dd>CPU温度(℃)</dd>
        <dt>{{information.cpuwd ||  ' _ _ _'}}</dt>
      </dl>
      <dl>
        <dd style=" width:118px;flex:0 0 118px;">CPU风扇转速(R/s)</dd>
        <dt>{{information.cpufszs ||  ' _ _ _'}}</dt>
      </dl>
      <dl>
        <dd>磁盘总容量</dd>
        <dt>{{information.mainletterfreesize}}可用 共{{information.mainlettersize}}</dt>
      </dl>
      <mt-progress class="progress" :value="scale" :bar-height="17"></mt-progress>
    </div>
    <div class="box">
      <div class="title">附件状态</div>
      <dl>
        <dd>一卡通读卡器</dd>
        <dt :class="information.yktsbljzt === '000' ? 'normal' : 'abnormal'">
          <img class="icon" :src="information.yktsbljzt === '000' ? src1 : src">
          {{information.yktsbljzt === '000' ? '连接正常' : '连接异常'}}
        </dt>
      </dl>
      <dl>
        <dd>身份证读卡器</dd>
        <dt :class="information.sfzsbljzt === '000' ? 'normal' : 'abnormal'">
          <img class="icon" :src="information.sfzsbljzt === '000' ? src1 : src">
          {{information.sfzsbljzt === '000' ? '连接正常' : '连接异常'}}
        </dt>
      </dl>
      <dl>
        <dd>触摸屏功能</dd>
        <dt :class="information.cmpcmgn === '000' ? 'normal' : 'abnormal'">
          <img class="icon" :src="information.cmpcmgn === '000' ? src1 : src">
          {{information.cmpcmgn === '000' ? '已启用' : '未启用'}}
        </dt>
      </dl>
      <dl>
        <dd>触摸屏</dd>
        <dt :class="information.cmpzt === '000' ? 'normal' : 'abnormal'">
          <img class="icon" :src="information.cmpzt === '000' ? src1 : src">
          {{information.cmpzt === '000' ? '状态正常' : '状态异常'}}
        </dt>
      </dl>
    </div>
    <div class="box">
      <div class="title">打印机状态</div>
      <dl>
        <dd>墨粉</dd>
        <dt>
          <span class="circle" :class="dyjdyzt ? 'normalCircle' : 'abnormalCircle'"></span>
          {{dyjdyzt ? '墨粉充足':'墨粉不足'}}
        </dt>
      </dl>
      <dl v-for="items in zhxxList">
        <dd>{{items.dyjmc}}</dd>
        <dt :class="items.syzzsl<50 ? 'deficiency':''">
          {{items.syzzsl}}张
        </dt>
      </dl>
    </div>
  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import Vue from 'vue'
  import { statusGet } from '../api'
  import utils from '../utils/utils'
  import abnormal from '../assets/abnormal.png'
  import unobstructed from '../assets/unobstructed.png'
  export default {
    components: {
      printHeader
    },
    data(){
      return {
        item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
        scale:0,
        information:{},
        zhxxList:[],
        src:abnormal,
        src1:unobstructed
      }
    },
    created () {
      if (this.item.zdbh) {
        this.getList(this.item);
      }
    },
    computed:{
      //墨粉状态
      dyjdyzt: function() {
        let data = '';
        if (typeof this.information.dyjdyzt === 'string') {
          data = parseInt(JSON.parse(this.information.dyjdyzt).PRT);
        }
        let x=false;
        switch(data)
        {
          case 3:
            x=  false;
            break;
          case 4:
            x=  false;
            break;
          default:
            x=  true;
        }
        return x
      }
    },
    methods:{
      async getList (params) {
        let data = await utils.fetch(statusGet, {
          zdbh:params.zdbh
        });
        if(data){
          this.zhxxList = data.data.zhxxList;
          this.information = data.data.zzfwFwzdZdzt;
          this.scale = (parseFloat(this.information.mainlettersize)-parseFloat(this.information.mainletterfreesize))/parseFloat(this.information.mainlettersize)*100;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .deficiency{
    color: #FFA613 !important;
  }
  .abnormal{
    color: #F42E22 !important;
  }
  .normal{
    color: #82CF42 !important;
  }
  .progress{
    margin-right:15px;
  }
  .circle{
    width:6px;
    height:6px;
    border-radius: 50%;
    display:inline-block;
    margin:11px 5px 11px 0;
    float:left;
  }
  .normalCircle{
    background:#80D135;
  }
  .abnormalCircle{
    background:#FF993C;
  }
  .icon{
    width:13px;
    height:13px;
    margin:7px 5px 7px 0;
    float:left;

  }
  .box:last-child{
    margin-bottom:15px;
  }
  .box{
    background:#ffffff;
    width:calc(100% - 20px);
    padding:0 0 18px 20px;
    margin-top:15px;
    .title{
      font-size: 17px;
      color: #1E2329;
      letter-spacing: 0;
      line-height: 54px;
    }
    dl{
      line-height:28px;
      font-size: 14px;
      letter-spacing: 0;
      display:flex;
      dd{
        color: #92969C;
        width:84px;
        margin-right:15px;
        flex:0 0 84px;
      }
      dt{
        flex:1;
        color: #1E2329;
      }
    }
  }
</style>
