<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  .iconright:after {
    width: 14px;
    height: 14px;
  }
  .mint-msgbox-btn{
    font-size:16px;
  }
    /*终端详情进度条*/
  .mt-progress-runway{
    height:100px;
    border-radius: 86px;
  }
  .mt-progress-progress{
    background: #FFA613;
    border-radius: 86px;
  }
  .u-icon-warningO
  {
    margin:12px 0;
    position:relative;
    width:50px;
    height:6px;
    background: #fff;
    transform: rotate(45deg);
    display: inline-block;
  }
  .u-icon-warningO:after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width:50px;
    height:6px;
    background: #fff;
    -webkit-transform: rotate(270deg);
    -moz-transform: rotate(270deg);
    -o-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
  }
  /*提示框确定按钮颜色*/
  .mint-msgbox-btns .bh-mint-btn-confirm{
    background-color: #3D97FF !important;
  }
  *{
    padding: 0;
    margin: 0;
    font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif;
  }

  html, body{
    background-color: #f4f4f4 !important;
  }

  body{
    /*overflow: hidden;*/
  }

  .mint-header{
    background-color: #fff !important;
    color: #000 !important;
  }

  .loadingFlag{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    & .text{
      margin-left: 10px;
    }
  }

  .colorArray{
    border-radius: 1px;
    &.c0{
      background: #52C7CA;
    }
    &.c1{
      background: #52ADCA;
    }
    &.c2{
      background: #7A79C2;
    }
    &.c3{
      background: #6990BE;
    }
    &.c4{
      background: #83A865;
    }
  }

  .doclist{
    &:empty{
      background-color: inherit !important;
      &:after{
        content: '暂无数据';
        display: flex;
        justify-content: center;
        align-items: center;
        color: #666;
        margin-top: 50%;
      }
    }
  }

</style>
