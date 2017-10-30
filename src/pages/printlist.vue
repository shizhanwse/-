<template>
  <div>
    <print-header title="打印列表">
      <span slot="right" class="bmbtn" @click="setVisible(true)">部门</span>
    </print-header>
    <p class="showinfo">
      <span>已选择：</span>
      <span>{{defaultVal.name}}</span>
    </p>

    <div class="doclist"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10"
         infinite-scroll-immediate-check="false"
    >
      <div v-for="(el, index) in dylb" class="cell" @click="goLink(el)">
        <div :class="'imgC colorArray c'+index%5">
          <img :src="index%3 | getImgFilter" alt="">
        </div>
        <div class="rightC">
          <p class="doctitle">{{el.fwxmmc}}</p>
          <div class="docinfo">
            <span class="depart">{{findBmById(el.bmid)}}</span>
            <p class="unit">
              <span v-if="el.djmffs>0">(前<span class="red">{{el.djmffs}}</span>份免费)</span>
              <span><span class="red">{{el.djmfjg}}</span>元/份</span>
            </p>
          </div>
        </div>
      </div>

    </div>
    <p v-show="loading" class="loadingFlag">
      <mt-spinner color="#26a2ff" :type="2"></mt-spinner>
      <span class="text">加载中...</span>
    </p>

    <depart-select v-if="visible" :array="departArray" :defaultVal="defaultVal"
                   @setVisible="setVisible"
                   @setDefaultVal="setDefaultVal"
    ></depart-select>


  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import { Spinner } from 'mint-ui'
  import Vue from 'vue'
  import departSelect from '../components/departSelect.vue'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import doc1 from '../assets/doc1.png'
  import doc2 from '../assets/doc2.png'
  import doc3 from '../assets/doc3.png'

  export default {
    components: {
    	[Spinner.name]: Spinner,
      printHeader,
      departSelect,
    },
    async created(){
      // 获取部门列表
      await this.getDepart();
      // 当前选中部门
      this.defaultVal = this.departArray[0];
      // 置空数据
      this.resetProData();
      // 获取列表数据
      await this.getDylb(this.defaultVal.value);
    },
    data(){
      return {
        visible: false,
        defaultVal: {},

        loading: false,
        canLoading: true,

      }
    },
    computed: {
      ...mapState('project', {
          // 列表数据
        dylb: state => state.dylb,
        dylbTotal: state => state.dylbTotal,
      }),
      ...mapGetters('department', ['departArray']),
    },
    methods: {
      // 取消部门选择
      setVisible(val){
      	this.visible = val;
      },
      // 选择部门后重新获取数据
      async setDefaultVal(val){
        this.visible = false;
        if(this.defaultVal.value !== val.value){
          this.defaultVal = val;
          this.resetProData();
          await this.getDylb(this.defaultVal.value);
        }
      },
      // 跳转详情页
      goLink(params){
        // 重置打印数量
      	this.setCount(1);
        this.$router.push({
          name: 'printdetail',
          params: { item: JSON.stringify({
            fwxmid: params.fwxmid,
            fwxmmc: params.fwxmmc,
          }) },
        })
      },
      // 加载更多
      async loadMore(){
      	if(this.dylbTotal > this.dylb.length){
          this.loading = true;
          await this.getDylb(this.defaultVal.value);
          this.loading = false;
        }
      },
      ...mapActions('project', [
        'getDylb',
        'resetProData',
      ]),
        // 获取部门列表
      ...mapActions('department', [
        'getDepart',
      ]),
      ...mapActions('order', [
        'setCount',
      ]),
      findBmById(id){
        let tmp = this.departArray.filter(el=>el.value===id);
        return tmp&&tmp.length>0?tmp[0].name:'';
      }
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
  .showinfo{
    padding: 10px 20px;
    font-size: 14px;
    height: 20px;
    & >span{
      &:first-child{
        color: #888;
      }
      &:last-child{
        color: #000;
      }
    }
  }

  .doclist{
    background-color: #fff;
    height: calc(100vh - 80px);
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
          & .unit{
            color: #888;
            & .red{
              color: #f26666;
            }
          }
        }
      }
    }
  }

  .bmbtn{
    width: 40px;
    display: inline-block;
    text-align: center;
    height: 26px;
    line-height: 26px;
    background-color: #52C7CA;
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
  }

</style>
