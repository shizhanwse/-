<template>
  <div>
    <print-header title="打印详情"></print-header>

    <div class="previewC" @click="goLink('printpreview')">
      <div>
        <span>预览</span>
        <p>{{item.fwxmmc}}</p>
      </div>
      <i class="iconright"></i>
    </div>


    <div class="printCount">
      <span>打印份数</span>
      <div>
        <!--<span v-if="count===1" class="nomoreless">不能再少啦~</span>-->
        <span :class="'counter '+(count>1?'minus':'disabled')" @click="minus">-</span>
        <!--<span class="txt">{{count}}</span>-->
        <input v-model="count" type="number" class="txt">
        <span :class="'counter '+(maxNumber>count?'add':'disabled')" @click="add">+</span>
      </div>
    </div>

    <div class="nextStep">
      <p>
        <span>页数合计：</span>
        <span>{{count}}</span>
      </p>
      <span @click="payfee">下一步</span>
    </div>

  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import { Toast } from 'mint-ui'
  import Vue from 'vue'
  import utils from '../utils/utils'
  import { chargeRule, fee } from '../api'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      printHeader,
    },
    async created(){
    let data = await utils.fetch(chargeRule, {
        serviceProgramId: this.item.fwxmid,
      });
      this.maxNumber = data&&data.maxNumber?data.maxNumber:1;

    },
    data(){
      return {
      	item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
        maxNumber: null,
        totalFee: 0,
        // 打印数量
        countTmp: 1,
      }
    },
    computed: {
      ...mapState('order', ['count']),
      ...mapState('sysconfig', ['zzfwXtcsList']),
    },
    methods: {
      minus(){
        this.countTmp = this.count
      	let num = Number(this.countTmp);
      	if(num>1){
      		this.countTmp = num-1;
        }
      },
      add(){
        this.countTmp = this.count
        let num = Number(this.countTmp);
      	if(this.maxNumber > num){
          this.countTmp = num+1;
        }else if(this.maxNumber == num){
          Toast('超过打印上限');
        }
      },
      async payfee(){
      	let data = await utils.fetch(fee, {
          serviceProgramId: this.item.fwxmid,
          copies: this.count,
        });
      	console.log(data);
      	if(data){
      		if(data.totalFee > 0){
      			//需要付费
            this.totalFee = data.totalFee;
            this.goLink('printpay');
          }else if(data.totalFee == 0){
      			//无需付费
            let {serialId, result} = await this.createOrder({
              serviceProgramId: this.item.fwxmid,
              title: this.item.fwxmmc,
              totalFee: 0,
              copies: this.count,
            });
            if(result) {
              if (this.zzfwXtcsList.ZZFW_PRINT_TYPE_MOBILE === '1') {
                this.setSelectedMachine(null);
                //跳选择终端
                this.goLink('printscannew', serialId);
              } else {
                this.goLink('printscan', serialId);
              }
            }
          }
        }
      },
      goLink(name, serialId){
      	let params = this.item;
      	if(name==='printscan' || name==='printscannew' || name==='printpay'){
          params = {...params, count: this.count}
        }
        if(name==='printscan' || name==='printscannew' && serialId){
          params = {...params, ddid: serialId}
        }
        if(name==='printpay'){
          params = {...params, totalFee: this.totalFee}
        }
        this.$router.push({
          name,
          params: {item: JSON.stringify(params)}
        })
      },
      ...mapActions('order', ['createOrder', 'setCount']),
      ...mapActions('terminal', ['setSelectedMachine']),
    },
    watch: {
      countTmp(v, oldvalue){
      	console.log(v);
      	let num = Number(this.countTmp);
      	if(typeof num === 'number' && !isNaN(num)){
      		if(this.maxNumber < num){
            Toast('超过打印上限');
            this.countTmp = oldvalue;
          }else{
            this.setCount(num);
          }
        }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .previewC{
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
      & >span{
        width: 40px;
      }
      & >p{
        width: calc(100% - 40px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: right;
        color: #666;
      }
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

  .printCount{
    height: 50px;
    padding: 0 20px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & >div{
      display: flex;
      align-items: center;
      & .nomoreless{
        font-size: 14px;
        color: #f26666;
        margin-right: 8px;
      }
      & .txt{
        width: 60px;
        height: 26px;
        box-sizing: border-box;
        border: 1px solid #f1f1f1;
        margin: 0 8px;
        text-align: center;
        font-size: 16px !important;
        display: inline-block !important;
        outline: none;
      }
      & .counter{
        color: #fff;
        width: 26px;
        height: 26px;
        font-size: 26px;
        border-radius: 100%;
        text-align: center;
        line-height: 22px;
        display: inline-block !important;
        &.minus{
          background-color: #F26666;
        }
        &.add{
          background-color: #52C7CA;
        }
        &.disabled{
          background-color: #E8E8E8;
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
        &:first-child{
          font-size: 14px;
        }
        &:last-child{
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
