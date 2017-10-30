<template>
  <div>
    <printHeader title="位置详情"></printHeader>

    <div id="bmap" class="bmap"></div>

  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import BMap from 'BMap'
  import zd1 from '../assets/001.jpg'
  import zd2 from '../assets/002.jpg'
  import zd3 from '../assets/003.jpg'
  import zd4 from '../assets/004.jpg'

  export default {
    components: {
      printHeader
    },
    async created(){
      let showContent = `
        <div class="showContentC">
          <img src="${this.getZdImg(this.item.zdxh)}" alt="终端">
          <div>
            <p><span>安放位置：</span><span>${this.item.afwz}</span></p>
            <p><span>终端名称：</span><span>${this.item.zdmc}</span></p>
          </div>
        </div>
      `;

      let mypoint = await this.getLocationPoint();
      let map = new BMap.Map('bmap');
      map.centerAndZoom(mypoint, 18);
      let mk = new BMap.Marker(mypoint);
      map.addOverlay(mk);
      map.panTo(mypoint);

      map.addControl(new BMap.ScaleControl());
      map.addControl(new BMap.NavigationControl());

      let walking = new BMap.WalkingRoute(map, {
      	renderOptions:{map: map, autoViewport: true},
        onMarkersSet: ([p1, p2])=>{
//          console.log(p2.marker);
          p2.marker.openInfoWindow(new BMap.InfoWindow(showContent));
          p2.marker.removeEventListener('click');
        },
        onInfoHtmlSet: (poi, html)=>{
      		if(poi && poi.title=='终点'){
            html.innerHTML = showContent;
          }
        }
      });
      walking.search(mypoint, new BMap.Point(this.item.lng, this.item.lat));

    },
    data(){
      return {
        item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
      }
    },
    computed: {

    },
    methods: {
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
      getZdImg(v){
        switch(v){
          case 'DPZD':
            return zd1;
            break;
          case 'XPZD':
            return zd4;
        }
      }
    },
    filters: {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .showContentC{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    & >img{
      display: inline-block;
      width: 70px;
      height: 70px;
    }
    & >div{
      width: calc(100% - 75px);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      & p{
        font-size: 14px;
        & >span{
          &:first-child{
            color: #666;
          }
          &:last-child{
            color: #000;
          }
        }
      }
    }
  }
</style>
<style scoped lang="scss">
  .bmap{
    height: calc(100vh - 40px);
  }
</style>
