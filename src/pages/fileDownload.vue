<template>
  <div>
    <print-header class="headTitle" :title="item.name" ></print-header>
    <div class="buttonBox">
        <div class="box" v-for="items in dataList" @click="downLoad(items)">
          <span class="name">{{items}}</span>
          <img class="icon" src="../assets/download.png" alt="">
        </div>
    </div>
  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import Vue from 'vue'
  import utils from '../utils/utils'
  import { searchfile,downloadfile,backupfile } from '../api'

  export default {
    components: {
      printHeader
    },
    data(){
      return {
        item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
        dataList:[]
      }
    },
    async created () {
      let data = await utils.fetch(searchfile, {
        zdbh:this.item.zdbh,
        operation:this.item.operation,
        directorypath:this.item.directorypath
      });
        if(data){
          this.dataList = data.data.split(',');
        }

    },
    methods: {
      async downLoad (filename) {
        let data = await utils.fetch(backupfile, {
          zdbh:this.item.zdbh,
          filenames:filename,
          operation:'backupori',
          directorypath:this.item.directorypath
        });
        if(data.ret === '0'){
          window.location.href = window.host + downloadfile + '?zdbh='+this.item.zdbh+'&filename='+filename;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .buttonBox{
    width:100%;
    background:#ffffff;
    margin-top:15px;
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
    position:relative;
    .name{
      flex:0 0 120px;
      width:120px;
      line-height:50px;
      font-size:17px;
      color: #1E2329;
      text-align:left;
      padding-left:10px;
    }
    .icon{
      float: right;
      width: 24px;
      margin: 13px 20px 0 0;
    }
  }
</style>
