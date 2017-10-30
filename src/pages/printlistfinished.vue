<template>
  <div>
    <print-header title="已完成订单"></print-header>

    <div class="doclist"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10"
    >
      <div v-for="(el, index) in ywcdd" class="cell" @click="goLink(el)">
        <div :class="'imgC colorArray c'+index%5">
          <img :src="index%3 | getImgFilter" alt="">
        </div>
        <div class="rightC">
          <p class="doctitle">{{el.fwxmmc}}</p>
          <p class="docinfo">
            <span class="depart">{{el.bmmc}}</span>
            <span class="date">{{el.gxsj?el.gxsj.split(' ')[0]:''}}</span>
          </p>
        </div>
      </div>

    </div>

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
      ...mapState('order', ['ywcdd', 'ywcddTotal']),
    },
    methods: {
      async loadMore(){
        if(this.ywcddTotal>this.ywcdd.length){
          this.loading = true;
          await this.getYwcdd();
          this.loading = false;
        }
      },
      goLink({fwxmid, fwxmmc, dyfs, bbys, sfje, gxsj, zdbh}){
        this.$router.push({
          name: 'printeddetail',
          params: {item: JSON.stringify({fwxmid, fwxmmc, dyfs, bbys, sfje, gxsj, zdbh})}
        })
      },
      ...mapActions('order', ['getYwcdd']),
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
        border-bottom: none;
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
          & .depart, & .date{
            color: #888;
          }
        }
      }
    }
  }

</style>
