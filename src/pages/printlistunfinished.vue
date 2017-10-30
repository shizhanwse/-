<template>
  <div>
    <print-header title="未完成订单"></print-header>

    <div class="doclist"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10"
         infinite-scroll-immediate-check="false"
    >
      <div v-for="(el, index) in wwcdd" class="cell" @click="goLink(el)">
        <div :class="'imgC colorArray c'+index%5">
          <img :src="index%3 | getImgFilter" alt="">
        </div>
        <div class="rightC">
          <p class="doctitle">{{el.fwxmmc}}</p>
          <p class="docinfo">
            <span class="depart">学工处</span>
          </p>
        </div>
      </div>
    </div>

    <p v-show="loading" class="loadingFlag">
      <mt-spinner color="#26a2ff" :type="2"></mt-spinner>
      <span class="text">加载中...</span>
    </p>

  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import { Spinner } from 'mint-ui'
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import doc1 from '../assets/doc1.png'
  import doc2 from '../assets/doc2.png'
  import doc3 from '../assets/doc3.png'

  export default {
    components: {
      printHeader,
      [Spinner.name]: Spinner,
    },
    async created(){

    },
    data(){
      return {
        loading: false,
        canLoading: true,
      }
    },
    computed: {
      ...mapState('order', ['wwcdd', 'wwcddTotal']),
    },
    methods: {
      async loadMore(){
        if(this.wwcddTotal > this.wwcdd.length){
          this.loading = true;
          await this.getWwcdd();
          this.loading = false;
        }
      },
      goLink(el){
      	this.setSelectedMachine(null);
        this.$router.push({
          name: 'printscannew',
          params: {item: JSON.stringify({
            fwxmid: el.fwxmid,
            fwxmmc: el.fwxmmc,
            count: el.dyfs,
            printNums: el.bbys*el.dyfs,
            ddid: el.ddid,
          })}
        })
      },
      ...mapActions('order', ['getWwcdd']),
      ...mapActions('terminal', ['setSelectedMachine']),
    },
    filters: {
      getImgFilter(type){
      	switch (type){
          case 0:
          	return doc1;
          	break;
          case 1:
            return doc2;
            break;
          case 2:
            return doc3;
            break;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .doclist{
    background-color: #fff;
    margin: 20px 0 0;
    height: calc(100vh - 60px);
    overflow: auto;
    -webkit-overflow-scrolling : touch;
    & .cell{
      padding: 15px 20px;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      &:last-child{
        /*border-bottom: none;*/
      }
      & .imgC{
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        & img{
          height: 40px;
        }
      }
      & .rightC{
        width: calc(100vw - 100px);
        min-height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & .doctitle{
          font-size: 16px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        & .docinfo{
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          & .depart{
            color: #888;
          }
        }
      }
    }
  }

</style>
