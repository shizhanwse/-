<template>
  <div>
    <print-header title="支付"></print-header>

    <p class="info">请选择支付方式</p>

    <div class="payType">
      <div v-for="el in payOptions" @click="selectId(el.id)" class="cell">
        <img :src="el.img" alt="">
        <p>{{el.name}}</p>
        <i :class="el.id===selectPay?'selected':''"></i>
      </div>
    </div>

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
    </div>

    <div class="nextStep">
      <p>
        <span>支付金额：</span>
        <span><span class="money">{{Math.round(item.totalFee*100)/100}}</span>元</span>
      </p>
      <span @click="pay">支付</span>
    </div>

  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import { Toast } from 'mint-ui'
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import { weixinPay } from '../utils/payments'
  import weixin from '../assets/weixin.png'
  import zhifubao from '../assets/zhifubao.png'
  import wangyin from '../assets/wangyin.png'

  export default {
    components: {
      printHeader,
    },
    async created(){
      await this.getProjectDetail(this.item.fwxmid);
      this.printNums = parseInt(this.item.count)*parseInt(this.projectDetail.pdfNums);
    },
    data(){
      return {
      	item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
        printNums: '',
        selectPay: 'weixin',
        payOptions: [
          {
          	id: 'weixin',
          	name: '微信',
            img: weixin
          },
          {
            id: 'zhifubao',
            name: '支付宝',
            img: zhifubao
          },
          {
            id: 'wangyin',
            name: '网银',
            img: wangyin
          },
        ],
      }
    },
    computed: {
      ...mapState('project', ['projectDetail']),
      ...mapState('sysconfig', ['zzfwXtcsList']),
    },
    methods: {
      selectId(id){
      	this.selectPay = id;
      },
      async pay(){
//        let paySuccess = await weixinPay({});
//        if(!paySuccess){
          let {serialId, result} = await this.createOrder({
            serviceProgramId: this.item.fwxmid,
            title: this.item.fwxmmc,
            totalFee: this.item.totalFee,
            copies: this.item.count,
          });
          if(result){
            if (this.zzfwXtcsList.ZZFW_PRINT_TYPE_MOBILE === '1') {
              //跳选择终端
              this.goLink('printscannew', serialId);
            } else {
              this.goLink('printscan', serialId);
            }
          }
//        }
      },
      goLink(name, serialId){
      	let params = {...this.item, ddid: serialId};
        this.$router.push({
          name,
          params: {item: JSON.stringify(params)}
        })
      },
      ...mapActions('order', ['createOrder']),
      ...mapActions('project', ['getProjectDetail']),
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .info{
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    color: #666;
    margin: 0 20px;
  }

  .payType{
    background-color: #fff;
    & .cell{
      margin: 0 20px;
      padding: 15px 0;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      &:not(:last-child){
        border-bottom: 1px solid #f1f1f1;
      }
      & >img{
        width: 20px;
        height: 20px;
      }
      & >p{
        width: calc(100vw - 100px);
        font-size: 16px;
      }
      & >i{
        display: block !important;
        position: relative;
        border-radius: 100%;
        background-color: #fff;
        border: 1px solid #ccc;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        &.selected{
          background-color: #52C7CA;
          border: 1px solid #52C7CA;
          &:after{
            border: 2px solid #fff;
            border-left: 0;
            border-top: 0;
            content: " ";
            top: 3px;
            left: 7px;
            position: absolute;
            width: 4px;
            height: 8px;
            transform: rotate(45deg) scale(1);
            transition: transform .2s;
          }
        }
      }
    }
  }

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
          width: calc(100% - 120px);
        }
      }
    }
  }


  .nextStep{
    position: fixed;
    bottom: 0;
    display: flex;
    color: #fff;
    & >p{
      opacity: 0.9;
      background-color: #2F343B;
      width: calc(100vw - 100px);
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      & >span{
        font-size: 14px;
        & .money{
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    & >span{
      width: 100px;
      height: 50px;
      background-color: #52C7CA;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

</style>
