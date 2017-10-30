<template>
  <div>
    <print-header title="扫码打印"></print-header>

    <div :style="'width: '+process+'%;'" class="process"></div>

    <div class="imgC">
      <img :src="printwaitingpng" alt="">
      <p v-if="process<100">打印中，请稍等...</p>
      <p v-if="process>=100">请领取打印材料</p>
    </div>

    <div v-if="process>=100" class="btnC">
      <button @click="goLink">返回首页</button>
    </div>

  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import Vue from 'vue'
  import printwaitingpng from '../assets/printwaiting.png'

  export default {
    components: {
      printHeader,
    },
    async created(){
      let sid = setInterval(()=>{
      	if(this.process < 100){
          this.process += 20;
        }else{
      		clearInterval(sid);
        }
      }, 1000);
    },
    data(){
      return {
        process: 0,
        printwaitingpng,
      }
    },
    methods: {
      goLink(){
        this.$router.push({
          name: 'index',
        })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .process{
    border-bottom: 2px solid #52B5B7;
  }

  .imgC{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 142px);
    & img{
      width: 180px;
    }
    & p{
      margin-top: 20px;
      color: #888;
    }
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
