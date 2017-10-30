<template>
  <div>
    <print-header title="终端管理" ></print-header>

    <div class="listC">
      <div class="columnBox" v-for="items in columnList">
        <div class="column" @click="goLink(formList,items.name,items.link)">
          <img :src="items.icon" alt="">
          <p>{{items.name}}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import Vue from 'vue'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { MessageBox,Toast } from 'mint-ui'
  import { shutdown,reboot } from '../api'
  import utils from '../utils/utils'
  import state from '../assets/state.png'
  import shutdowns from '../assets/shutdown.png'
  import restart from '../assets/restart.png'
  import time from '../assets/time.png'
  import retrieve from '../assets/retrieve.png'
  import control from '../assets/control.png'
  export default {
    components: {
      printHeader
    },
    data(){
      return {
        item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
        formList:'',
        columnList:[
          {
            name:'终端状态',
            icon:state,
            link:'terminalDetails'
          },
          {
            name:'关机',
            icon:shutdowns,
            link:'setTime'
          },
          {
            name:'重启',
            icon:restart,
            link:'setTime'
          },
          {
            name:'定时开关机',
            icon:time,
            link:'setTime'
          },
          {
            name:'检索文件',
            icon:retrieve,
            link:'fileDirectory'
          },
//          {
//            name:'录制屏幕',
//            icon:'./static/img/tutorial.png',
//            link:'setTime'
//          },
          {
            name:'开启远程控制',
            icon:control,
            link:'remoteControl'
          }
        ]
      }
    },
    created () {
      if(this.item.zdbh){
        this.formList = this.item;
      }
    },
    methods: {
      goLink(params,name,param){
        const self = this;
        if(name === '关机'){
           MessageBox.confirm('确定关机吗?').then(action => {
            let data = utils.fetch(shutdown, {
            zdbh:this.item.zdbh
          });
        });
          return;
        }
        if(name === '重启'){
          MessageBox.confirm('确定重启吗?').then(action => {
            let data = utils.fetch(reboot, {
              zdbh:this.item.zdbh
            });
        });
          return;
        }
        this.$router.push({
          name: param,
          params: {params}
        })
      },
      //操作成功提示
      successfully(name) {
        Toast({
          message: name+'成功',
          iconClass: 'mintui mintui-success'
        });
      },
      //操作失败提示
      failed(name) {
        Toast({
          message: name+'失败',
          iconClass: 'mintui u-icon-warningO'
        });
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .listC{
    margin: 20px 10px 0;
    font-size:0;
    .columnBox{
      width:33.33%;
      display:inline-block;
      .column{
        margin:7px;
        background: #FFFFFF;
        box-shadow: 0 10px 17px 0 rgba(9,23,38,0.18);
        border-radius: 15px;
        text-align:center;
          img{
            margin-top:36px;
            width: 43px;
            height:43px;
            display:inline-block;
          }
          p{
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 0;
            line-height: 42px;
          }
      }
    }
  }
</style>
