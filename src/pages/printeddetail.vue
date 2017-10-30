<template>
  <div>
    <print-header title="打印详情"></print-header>

    <div class="infoC">
      <p>项目信息</p>
      <div class="cell">
        <span>项目名称</span>
        <span>{{item.fwxmmc}}</span>
      </div>
      <div class="cell">
        <span>打印份数</span>
        <span>{{item.dyfs}}</span>
      </div>
      <div class="cell">
        <span>页数合计</span>
        <span>{{(item.dyfs*item.bbys)}}</span>
      </div>
      <div v-if="item.sfje>0" class="cell">
        <span>支付方式</span>
        <span>微信</span>
      </div>
      <div v-if="item.sfje>0" class="cell">
        <span>支付金额</span>
        <span>{{item.sfje}}元</span>
      </div>
      <div class="cell">
        <span>打印机器</span>
        <span>{{terminalDetail.zdmc}}</span>
      </div>
      <div class="cell">
        <span>打印时间</span>
        <span>{{item.gxsj}}</span>
      </div>
    </div>


  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      printHeader,
    },
    async created(){
    	if(this.item.zdbh){
        await this.getTerminalDetail(this.item.zdbh);
      }
    },
    data(){
      return {
        item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
      }
    },
    computed: {
      ...mapState('terminal', ['terminalDetail']),
    },
    methods: {
      ...mapActions('terminal', ['getTerminalDetail']),
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

</style>
