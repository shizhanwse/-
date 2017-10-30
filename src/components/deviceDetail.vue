<template>
  <div class="container" @click="onClick">
    <img :src="getZdImg()" alt="">
    <div class="textC">
      <p class="address">{{address}}</p>
      <p class="deviceNo">终端名称：{{deviceMc}}</p>
      <div class="map">
        <div @click.prevent.stop="onMap">
          <img src="../assets/map.png" alt="">
          <span>{{distance}}</span>
        </div>
      </div>
    </div>
    <i v-if="typeof iconright !== 'undefined'" class="iconright"></i>
  </div>
</template>

<script>
  import { Header, Button } from 'mint-ui'
  import Vue from 'vue'
  import zd1 from '../assets/001.jpg'
  import zd2 from '../assets/002.jpg'
  import zd3 from '../assets/003.jpg'
  import zd4 from '../assets/004.jpg'

  export default {
  	props: ['address', 'deviceMc', 'distance', 'zdxh', 'iconright'],
    components: {
      [Header.name]: Header,
      [Button.name]: Button,
    },
    async created(){
    },
    mounted(){
    },
    data(){
      return {
      }
    },
    filters: {

    },
    methods: {
      onClick(){
      	this.$emit('onClick');
      },
      onMap(){
        this.$emit('onMap');
      },
      getZdImg(){
        switch(this.zdxh){
          case 'DPZD':
            return zd1;
            break;
          case 'XPZD':
            return zd4;
            break;
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .container{
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 10px 17px 0 rgba(9,23,38,0.18);
    border-radius: 8px;
    & >img{
      width: 70px;
      height: 70px;
      display: block;
    }
    & .textC{
      width: calc(100% - 75px);
      padding: 0 5px 0 10px;
      & .address{
        font-size: 16px;
        color: #000;
        padding-bottom: 4px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      & .deviceNo{
        font-size: 14px;
        color: #666;
        padding-bottom: 4px;
      }
      & .map{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        & >div{
          display: flex;
          justify-content: flex-end;
          align-items: center;
          color: #666;
          font-size: 14px;
          padding: 2px 8px;
          background-color: #f4f4f4;
          border-radius: 3px;
          & img{
            width: 20px;
            height: 20px;
            margin-right: 4px;
          }
        }
      }
    }
  }
  i.iconright{
    position: absolute;
    right: 15px;
    top: 50%;
    &:after{
      width: 8px;
      height: 8px;
      border: solid 1px #ddd;
      border-bottom-width: 0;
      border-left-width: 0;
      content: " ";
      position: absolute;
      right: 0;
      -webkit-transform: translateY(-50%) rotate(45deg);
      transform: translateY(-50%) rotate(45deg);
    }
  }
</style>
