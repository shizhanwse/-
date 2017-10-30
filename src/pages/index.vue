<template>
  <div>
    <print-header title="自助打印" hideLeftBtn ></print-header>

    <div class="listC">
      <div class="cell" @click="goLink('printlist')">
        <img src="../assets/index1.png" alt="">
        <p>打印列表</p>
        <i class="iconright"></i>
      </div>
      <div class="cell" @click="goLink('printlistunfinished')">
        <img style="width: 54px;" src="../assets/index2.png" alt="">
        <p>未完成订单</p>
        <span v-if="wwcddTotal>0 && showWwcdd" class="badge">{{wwcddTotal}}</span>
        <i class="iconright"></i>
      </div>
      <div class="cell" @click="goLink('printlistfinished')">
        <img style="width: 46px; top: 12px;" src="../assets/index3.png" alt="">
        <p>已完成订单</p>
        <i class="iconright"></i>
      </div>
    </div>
    <div class="nav" v-if="role>-1">
      <div class="navs print">
        <div class="conts">
          <img src="../assets/printer.png" alt="">
          <div>自助打印</div>
        </div>
      </div>
      <div class="navs control choose" @click="goLink1()">
        <div class="conts">
          <img src="../assets/terminalC.png" alt="">
          <div>终端管理</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import { Button } from 'mint-ui'
  import Vue from 'vue'
  import utils from '../utils/utils'
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      printHeader,
      [Button.name]: Button,
    },
    async created(){
    	if(wistoken===null || wistoken===''){
        await utils.getToken();
      }
      await this.getWwcdd();

    	this.showWwcdd = true;

      await this.getSysConfig();

      this.role = window.roles.indexOf('管理员');
    },
    async mounted(){
    },
    data(){
      return {
        showWwcdd: false,
        role:''
      }
    },
    computed: {
      ...mapState('order', {
        wwcddTotal: state => state.wwcddTotal,
      }),
    },
    methods: {
      goLink1(){
        this.$router.push({
          name: 'deviceList'
        })
      },
      goLink(param){
        this.$router.push({
          name: param,
        })
      },
      ...mapActions('order', [
        'getWwcdd',
      ]),
      ...mapActions('sysconfig', [ 'getSysConfig', ]),
    },
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
  .listC{
    margin-top: 20px;
    & .cell{
      height: 80px;
      position: relative;
      color: #fff;
      padding: 10px 60px 10px 90px;
      box-sizing: border-box;
      margin-bottom: 10px;
      &:first-child{
        background-color: #69C3CE;
      }
      &:nth-child(2){
        background-color: #EDC65D;
      }
      &:last-child{
        background-color: #72CFA3;
      }
      & >img{
        width: 50px;
        /*height: 50px;*/
        position: absolute;
        top: 15px;
        left: 25px;
      }
      & >p{
        font-size: 16px;
        height: 60px;
        line-height: 60px;
      }
      & >.badge{
        position: absolute;
        right: 30px;
        top: 28px;
        background-color: #f26666;
        display: block;
        width: 24px;
        height: 24px;
        line-height: 22px;
        border-radius: 12px;
        text-align: center;
        font-size: 12px;
      }
      & >i.iconright{
        position: absolute;
        right: 15px;
        top: 50%;
        &:after{
          width: 10px;
          height: 10px;
          border: solid 2px #fff;
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
  }
</style>
