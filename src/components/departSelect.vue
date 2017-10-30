<template>
  <div class="container" @click.stop="hide">
      <div class="selectC" @click.stop="">
        <p class="title">选择部门</p>
        <div class="listC">
          <div class="cell" v-for="el in array" @click.stop="select(el)">
            <span>{{el.name}}</span>
            <i :class="el.value===selected.value?'selected':''"></i>
          </div>
        </div>
        <div class="btnC">
          <span @click.stop="hide">取消</span>
          <span @click.stop="setVal">确定</span>
        </div>
      </div>

  </div>
</template>

<script>
  import { Header } from 'mint-ui'
  import Vue from 'vue'

  export default {
  	props: ['array', 'defaultVal'],
    components: {
      [Header.name]: Header,
    },
    async created(){

    },
    data(){
      return {
      	selected: this.defaultVal?this.defaultVal:{},
      }
    },
    methods: {
      select(el){
      	this.selected = el;
      },
      hide(){
      	this.selected = this.defaultVal;
      	this.$emit('setVisible', false);
      },
      setVal(){
      	this.$emit('setDefaultVal', this.selected);
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    & .selectC{
      width: 80vw;
      background-color: #fff;
      border-radius: 8px;
      & .title{
        height: 60px;
        line-height: 60px;
        text-align: center;
      }

      & .listC{
        border-top: 1px solid #f1f1f1;
        border-bottom: 1px solid #f1f1f1;
        padding: 0 20px;
        height: 220px;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        & .cell{
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f1f1f1;
          box-sizing: border-box;
          &:last-child{
            border-bottom: none;
          }
          & i{
            display: block !important;
            position: relative;
            border-radius: 100%;
            background-color: #fff;
            border: 1px solid #ccc;
            width: 20px !important;
            height: 20px !important;
            /*vertical-align: middle;*/
            &.selected{
              background-color: #52C7CA;
              border: 1px solid #52C7CA;
              &:after{
                border: 2px solid #fff;
                border-left: 0;
                border-top: 0;
                content: " ";
                top: 3px;
                left: 7px;
                position: absolute;
                width: 4px;
                height: 8px;
                transform: rotate(45deg) scale(1);
                transition: transform .2s;
              }
            }
          }
        }
      }

      & .btnC{
        display: flex;
        justify-content: space-between;
        padding: 20px;
        & >span{
          width: calc((100% - 10px) / 2);
          box-sizing: border-box;
          border: 1px solid #f1f1f1;
          border-radius: 4px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          &:last-child{
            background-color: #52C7CA;
            border-color: #52C7CA;
            color: #fff;
          }
        }
      }
    }
  }
</style>
