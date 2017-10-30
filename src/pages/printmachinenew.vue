<template>
  <div>
    <printHeader title="选择打印机器"></printHeader>

    <div class="listC">
      <div class="cell" v-for="el in machineList">
        <deviceDetail :address="el.afwz"
                      :deviceMc="el.zdmc"
                      :zdxh="el.zdxh"
                      :distance="el.distance | parseDistance"
                      @onClick="select(el)" @onMap="goLink(el)"
        >
        </deviceDetail>
      </div>
    </div>

  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import deviceDetail from '../components/deviceDetail.vue'
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      printHeader,
      deviceDetail,
    },
    async created(){
    },
    data(){
      return {
        item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
        showList: [],
      }
    },
    computed: {
      ...mapState('terminal', ['machineList'])
    },
    methods: {
      select(v){
        this.setSelectedMachine(v);
        this.$router.go(-1);
      },
      goLink(params){
        this.$router.push({
          name: 'printmap',
          params: { item: JSON.stringify(params) },
        })
      },
      ...mapActions('terminal', ['getTerminal', 'setSelectedMachine']),
    },
    filters: {
      parseDistance(distance){
      	if(distance){
          if(distance<1000){
            return distance + '米';
          }else{
            return (distance/1000).toFixed(1) + '千米';
          }
        }else{
      		return '计算中...'
        }
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .tabC{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    background-color: #fff;
    & >span{
      display: flex;
      align-items: center;
      height: 100%;
      box-sizing: border-box;
      font-size: 14px;
      border-bottom: 1px solid #fff;
      color: #888;
      &.active{
        border-bottom: 1px solid #52C7CA;
        color: #52C7CA;
      }
    }
  }

  .listC{
    margin: 20px 0;
    & .cell{
      margin-bottom: 10px;
      &:last-child{
        border-bottom: none;
      }
    }
  }

</style>
