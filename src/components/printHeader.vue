<template>
  <mt-header :title="title">
    <mt-button v-if="typeof(hideLeftBtn)==='undefined'" @click="back" slot="left" icon="back"></mt-button>
    <div slot="right">
      <slot name="right"></slot>
    </div>
  </mt-header>
</template>

<script>
  import { Header, Button } from 'mint-ui'
  import Vue from 'vue'

  export default {
  	props: ['title', 'hideLeftBtn'],
    components: {
      [Header.name]: Header,
      [Button.name]: Button,
    },
    async created(){
    SDK.setTitleText(this.title);
    document.title = this.title;
    },
    data(){
      return {
      }
    },
    methods: {
      back(){
        this.$router.go(-1);
      }
    },
  }
</script>

<style>
  .mint-header-title{
    font-size: 18px !important;
  }
</style>
<style scoped lang="scss">

</style>
