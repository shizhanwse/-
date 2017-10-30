<template>
  <div>
    <print-header class="headTitle" title="设置开关机时间" ></print-header>
    <div class="buttonBox">
      <mt-button class="box" @click.native="open('chooseUpTime')" size="large">
        <div class="upTime">
          <span class="name">每日开机时间</span>
        <span class="time">{{upTime}}
          <i class="mint-cell-allow-right"></i>
        </span>
        </div>
      </mt-button>
      <mt-button class="box" @click.native="open('chooseCloseTime')" size="large">
        <div class="upTime">
          <span class="name">每日关机时间</span>
          <span class="time">{{closeTime}}
            <i class="mint-cell-allow-right"></i>
          </span>
        </div>
      </mt-button>
    </div>
    <div class="submit">
      <mt-button class="submiting" :disabled="disabled" size="large" type="primary" @click="submit">确定</mt-button>
    </div>

    <mt-datetime-picker
      ref="chooseUpTime"
      type="time"
      v-model="chooseUpTime"
      @confirm="upChange">
    </mt-datetime-picker>
    <mt-datetime-picker
      ref="chooseCloseTime"
      type="time"
      v-model="chooseCloseTime"
      @confirm="closeChange">
    </mt-datetime-picker>
  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import Vue from 'vue'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { Toast } from 'mint-ui';
  import utils from '../utils/utils'
  import { settime,gettime } from '../api'
  export default {
    components: {
      printHeader
    },
    data(){
      return {
        item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
        chooseUpTime: null,
        upTime:'',
        chooseCloseTime: null,
        closeTime:'',
        disabled:true,
        cpUp:'',
        cpClose:''
      }
    },
    async mounted (){
      let data = await utils.fetch(gettime, {
        zdbh:this.item.zdbh
      });
      if(data){
        this.upTime = data.data.openTime;
        this.closeTime = data.data.downTime;
      }
    },
    methods: {
      open(picker) {
        this.$refs[picker].open();
      },
      // 开机时间变化
      upChange (value) {
        this.upTime = value;
        this.cpUp = value.split(":").join('');
        this.cpClose = this.closeTime.split(":").join('');
        this.compare();
      },
      // 关机时间变化
      closeChange (value) {
        this.closeTime = value;
        this.cpClose = value.split(":").join('');
        this.cpUp = this.upTime.split(":").join('');
        this.compare();
      },
      goLink(param){
        this.$router.push({
          name: param
        })
      },
      // 开始时间 结束时间比较
      compare () {
        if(this.cpClose && this.cpUp){
          if(this.cpClose<=this.cpUp){
            this.disabled = true;
            this.openBottomToast()
          }else{
            this.disabled = false;
          }
        }
      },
      async submit () {
        let data = await utils.fetch(settime, {
          zdbh:this.item.zdbh,
          openTime:this.upTime,
          downTime:this.closeTime
        });
        if(data){
          this.openToastWithIcon();
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
  .buttonBox{
    width:100%;
    background:#ffffff;
  }
  .box:last-child{
    border:none;
  }
  .box{
    width: calc(100% - 20px);
    margin-left:20px;
    height: 50px;
    box-shadow:none;
    border-bottom:1px solid #E8E8E8;
    border-radius:0;
    background:#ffffff;

    .upTime{
      width:100%;
      height:50px;
      display:flex;
      .name{
        flex:0 0 120px;
        width:120px;
        line-height:50px;
        font-size:17px;
        color: #1E2329;
        text-align:left;
        padding-left:10px;
      }
      .time{
        text-align:right;
        font-size: 17px;
        color: #92969C;
        line-height:50px;
        flex:1;
        padding-right:30px;
        .mint-cell-allow-right::after{
          width:9px;
          height:9px;
        }
      }
    }
  }
  .submit{
    padding:40px 20px 0;
  }
</style>
