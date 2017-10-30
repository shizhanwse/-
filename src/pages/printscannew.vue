<template>
  <div>
    <print-header title="确认打印"></print-header>

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

    <deviceDetail v-if="selectedMachine&&selectedMachine.zdbh?true:false"
                  :address="selectedMachine.afwz"
                  :deviceMc="selectedMachine.zdmc"
                  :zdxh="selectedMachine.zdxh"
                  :distance="parseDis(selectedMachine.distance)"
                  iconright @onClick="goMachineList" @onMap="goMap(selectedMachine)"
    >
    </deviceDetail>

    <p class="notice">请选择合适的终端完成打印</p>

    <div class="btnC">
      <button @click="alertMsg">确认打印</button>
    </div>

    <div id="bmap"></div>

  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import { MessageBox, Toast } from 'mint-ui'
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import utils from '../utils/utils'
  import { getLocationPoint, parseDistance } from '../utils/BMapUtils'
  import deviceDetail from '../components/deviceDetail.vue'
  import BMap from 'BMap'


  export default {
    components: {
      printHeader,
      deviceDetail,
    },
    async created(){
      if(this.item.printNums){
      	this.printNums = this.item.printNums;
      }else{
        await this.getProjectDetail(this.item.fwxmid);
        this.printNums = parseInt(this.item.count)*parseInt(this.projectDetail.pdfNums);
      }

      if(!this.selectedMachine || !this.selectedMachine.zdbh){
        let [mypoint] = await Promise.all([
          getLocationPoint(),
          this.getTerminal(this.item.fwxmid)
        ]);
        this.mypoint = mypoint;
        this.map = new BMap.Map('bmap');
        this.map.centerAndZoom(this.mypoint, 18);
      }

    },
    data(){
      return {
        mypoint: null,
        item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
        printNums: '',
        showList: [],
      }
    },
    computed: {
      ...mapState('project', ['projectDetail']),
      ...mapState('sysconfig', ['zzfwTsxxList']),
      ...mapState('terminal', ['machineList', 'selectedMachine']),
    },
    watch: {
      mypoint(newVal){
      	console.log(newVal);
        this.showList = this.machineList.map(el=>{
          if(el.lat && el.lng){
            el.distance = Number(this.map.getDistance(newVal, new BMap.Point(el.lng, el.lat)).toFixed(1));
          }else{
            el.distance = null;
          }
          return el
        }).sort((a, b)=>{
        	return a.distance - b.distance;
        });
        this.updateTerminal(this.showList);
        this.setSelectedMachine(this.showList[0]);
      },
    },
    methods: {
      goMachineList(){
        this.$router.push({
          name: 'printmachinenew',
          params: {item: JSON.stringify(this.item)}
        })
      },
      async alertMsg(){
      	if(this.selectedMachine && this.selectedMachine.zdbh){
          let data = await this.orderConfirm({
            serialId: this.item.ddid,
            terminalCode: this.selectedMachine.zdbh,
          });
          if(data){
            await MessageBox.confirm(this.zzfwTsxxList.ZZFW_PRINT_CONFIRM_MOBILE).then(async action => {
              await this.goPrint();
            }, ()=>{});
          }

        }else{
      		Toast('未找到打印设备');
        }
      },
      async goPrint(){
      	let result = await this.terminalCheck({
          serialId: this.item.ddid,
          terminalCode: this.selectedMachine.zdbh,
        });
      	if(result){
      		//终端校验成功
          await this.orderPrint({
            serialId: this.item.ddid,
            terminalCode: this.selectedMachine.zdbh,
          });
          this.$router.push({
            name: 'printwaiting',
          })
        }
      },
      goMap(params){
        this.$router.push({
          name: 'printmap',
          params: { item: JSON.stringify(params) },
        })
      },
      parseDis(v){
      	return parseDistance(v);
      },
      ...mapActions('project', ['getProjectDetail']),
      ...mapActions('order', ['orderPrint', 'orderConfirm']),
      ...mapActions('terminal', ['getTerminal', 'terminalCheck', 'updateTerminal', 'setSelectedMachine']),
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
