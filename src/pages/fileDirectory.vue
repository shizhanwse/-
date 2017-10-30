<template>
  <div>
    <print-header class="headTitle" title="设备文件" ></print-header>
    <div class="buttonBox doclist">
      <div class="box" v-for="items in dataList" @click="goLink(item,items)">
          <span class="name">{{items.descibes}}</span>
          <i class="mint-cell-allow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import Vue from 'vue'
  import utils from '../utils/utils'
  import { pathurl } from '../api'

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
     let data  = await utils.fetch(pathurl, {

      });
      if(data){
        this.dataList = data.data;
      }
    },
    methods: {
      goLink(params,items){
        this.$router.push({
          name: 'fileDownload',
          params: { item: JSON.stringify({
            name:items.descibes,
            zdbh: params.zdbh,
            operation:'search',
            directorypath:items.filepath
          }) }
        })
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
  .mint-cell-allow-right::after{
    width:9px;
    height:9px;
  }

  }
</style>
