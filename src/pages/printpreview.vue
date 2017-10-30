<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2.0, user-scalable=yes">
    <print-header title="打印预览"></print-header>

    <div class="previewC">
      <div class="imgC" v-for="(el, index) in previewList">
        <img :src="el.src" alt="">
      </div>
      <!--<div class="imgC">-->
        <!--<img src="http://zzfw3.wisedu.com/zzfw-api/api/serviceProgram/download?fileName=/ssadmin_dca2dab8f830436e87312556a7a1adcf_2017090410.jpg" alt="">-->
      <!--</div>-->
    </div>

  </div>
</template>

<script>
  import printHeader from '../components/printHeader.vue'
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      printHeader,
    },
    async created(){
      this.getPreview(this.item.fwxmid);
    },
    data(){
      return {
      	item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
        selectIndex: null,
      }
    },
    computed: {
      ...mapState('project', ['previewList'])
    },
    methods: {
      selectImg(index){
      	if(this.selectIndex == index){
          this.selectIndex = null;
        }else{
          this.selectIndex = index;
        }
      },
      ...mapActions('project', ['getPreview'])
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .previewC{
    margin: 5vw;
    & .imgC{
      transition: -webkit-transform 800ms ease;
      transform-origin: 0 0 0;
      transform: scale(1);
      overflow: auto;
      width: 90vw;
    }
    & img{
      width: 90vw;
      &:not(:last-child){
        margin-bottom: 10px;
      }
    }
  }

</style>
