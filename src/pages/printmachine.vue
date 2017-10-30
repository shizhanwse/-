<template>
  <div>
    <printHeader title="选择打印机器"></printHeader>

    <!--<div class="tabC">-->
      <!--<span @click="toggleTab(0)" :class="tabIndex===0?'active':''">常用机器</span>-->
      <!--<span @click="toggleTab(1)" :class="tabIndex===1?'active':''">所有机器</span>-->
    <!--</div>-->

    <div class="listC">
      <div v-for="el in showList" class="cell" @click="goLink(el)">
        <p>{{el.zdmc}}</p>
        <div>
          <img src="../assets/map.png" alt="">
          <span>{{el.distance | parseDistance}}</span>
        </div>
      </div>
    </div>

    <div id="bmap"></div>

  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import BMap from 'BMap'

  export default {
    components: {
      printHeader
    },
    async created(){
      await this.getTerminal(this.item.fwxmid);

      this.showList = this.machineList.map(el=>{
      	el.distance = null;
      	return el;
      });

      this.mypoint = await this.getLocationPoint();
      this.map = new BMap.Map('bmap');
      this.map.centerAndZoom(this.mypoint, 18);

    },
    data(){
      return {
        tabIndex: 0,
        item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
        mypoint: null,
        map: null,
        showList: [],
      }
    },
    computed: {
      ...mapState('terminal', ['machineList'])
    },
    watch: {
      mypoint(newVal){
        this.showList = this.machineList.map(el=>{
          if(el.lat && el.lng){
            el.distance = this.map.getDistance(newVal, new BMap.Point(el.lng, el.lat)).toFixed(0);
          }else{
            console.log(el.zdmc+'：该终端暂无坐标');
            el.lng = '118.79634081';
            el.lat = '31.9063310';
            el.distance = this.map.getDistance(newVal, new BMap.Point(el.lng, el.lat)).toFixed(0);
          }
          return el
        });
      }
    },
    methods: {
      toggleTab(val){
      	this.tabIndex = val;
      },
      getLocationPoint(){
      	return new Promise((resolve, reject)=>{
          let geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
              resolve(new BMap.Point(r.point.lng, r.point.lat))
            }
            else {
              console.log('failed'+this.getStatus());
              reject();
            }
          },{enableHighAccuracy: true})
        })
      },
      goLink(params){
        this.$router.push({
          name: 'printmap',
          params: { item: JSON.stringify({
            lng: params.lng,
            lat: params.lat,
          }) },
        })
      },
      ...mapActions('terminal', ['getTerminal']),
    },
    filters: {
      parseDistance(distance){
      	if(distance){
          if(distance<1000){
            return distance + '米';
          }else{
            return (distance/1000).toFixed(0) + '千米';
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
    background-color: #fff;
    & .cell{
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f1f1f1;
      &:last-child{
        border-bottom: none;
      }
      & >p{
        width: calc(100% - 80px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      & >div{
        width: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        & >img{
          width: 20px;
        }
        & >span{
          color: #888;
          font-size: 14px;
        }
      }
    }
  }

</style>
