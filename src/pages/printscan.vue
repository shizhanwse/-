<template>
  <div>
    <print-header title="扫码打印"></print-header>

    <div class="infoC">
      <p>项目信息</p>
      <div class="cell">
        <span>项目名称</span>
        <span>{{item.fwxmmc}}</span>
      </div>
      <div class="cell">
        <span>打印份数</span>
        <span>{{item.count}}</span>
      </div>
      <div class="cell">
        <span>页数合计</span>
        <span>{{printNums}}</span>
      </div>
      <!--<div class="cell">-->
        <!--<span>支付方式</span>-->
        <!--<span>微信</span>-->
      <!--</div>-->
      <div v-if="item.totalFee>0" class="cell">
        <span>支付金额</span>
        <span>{{item.totalFee}}元</span>
      </div>
    </div>

    <div class="checkMachine" @click="goMachineList">
      <div>
        <span>选择打印机器</span>
      </div>
      <i class="iconright"></i>
    </div>

    <p class="notice">请在终端机器上扫描打印用验证码，若退出该页面,可以在未完成订单中找到该打印项目</p>

    <div class="btnC">
      <button @click="goPrint">扫码打印</button>
    </div>

  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import wx from 'wx'
  import utils from '../utils/utils'


  export default {
    components: {
      printHeader,
    },
    async created(){
      if(this.item.printNums){
      	this.printNums = this.item.printNums;
      }else{
        await this.getProjectDetail(this.item.fwxmid);
        this.printNums = parseInt(this.item.count)*parseInt(this.projectDetail.pdfNums);
      }

      let conf = await utils.getWXConfig({
        url: window.location.href,
        forceTicket: 0,
      });

      console.log('conf: ', conf);

      wx.config({
        ...conf,
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

    },
    data(){
      return {
        item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
        printNums: '',
      }
    },
    computed: {
      ...mapState('project', ['projectDetail']),
    },
    methods: {
      goMachineList(){
        this.$router.push({
          name: 'printmachinenew',
          params: {item: JSON.stringify(this.item)}
        })
      },
      getQRCode(){
      	return new Promise((resolve, reject)=>{
          wx.scanQRCode({
            desc: 'scanQRCode desc',
            needResult: 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res) {
            	console.log('扫描结果：', res);
              resolve(res);
            },
            error: function(res) {
              if (res.errMsg.indexOf('function_not_exist') > 0) {
                alert('版本过低请升级')
              }
              reject(res);
            }
          });
        });
      },
      async goPrint(){
      	let qrcode = await this.getQRCode();
        let terminalCode = qrcode.resultStr;
//        let terminalCode = 'ZZFW#ZD#100';

      	let result = await this.terminalCheck({
          serialId: this.item.ddid,
          terminalCode,
        });
      	if(result){
      		//终端校验成功
          await this.orderPrint({
            serialId: this.item.ddid,
            terminalCode,
          });
          this.$router.push({
            name: 'printwaiting',
          })
        }
      },
      ...mapActions('project', ['getProjectDetail']),
      ...mapActions('order', ['orderPrint']),
      ...mapActions('terminal', ['terminalCheck']),
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .infoC{
    margin: 20px 0;
    padding: 20px;
    background-color: #fff;
    & >p{
      font-size: 16px;
    }
    & .cell{
      margin: 10px 0;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & >span{
        display: block;
        &:first-child{
          color: #888;
          width: 80px;
        }
        &:last-child{
          width: calc(100vw - 160px);
        }
      }
    }
  }

  .checkMachine{
    position: relative;
    height: 50px;
    padding: 0 30px 0 20px;
    margin: 20px 0;
    background-color: #fff;
    & >div{
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    & i.iconright{
      position: absolute;
      right: 15px;
      top: 50%;
      &:after{
        width: 8px;
        height: 8px;
        border: solid 1px #ddd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        position: absolute;
        right: 0;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
      }
    }
  }

  .notice{
    margin: 20px;
    font-size: 14px;
    color: #888;
  }

  .btnC{
    padding: 20px;
    & >button{
      display: block;
      border: none;
      background-color: #52C7CA;
      height: 44px;
      line-height: 44px;
      text-align: center;
      width: 100%;
      color: #fff;
      font-size: 16px;
      border-radius: 4px;
      outline: none;
    }
  }

</style>
