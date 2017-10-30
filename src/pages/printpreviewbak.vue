<template>
  <div>
    <print-header title="打印预览"></print-header>

    <div class="previewC">
      <img ref="img" class="preview-img" v-for="(el, index) in previewList" :src="el.src" alt=""
           @click="$preview.open(index, previewList)"
      >
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
    async mountedd(){
      setTimeout(()=>{
        this.$refs.img[0].click();

        let [closebtn] = document.getElementsByClassName('pswp__button pswp__button--close');
        console.log(closebtn);

        closebtn.addEventListener('click', ()=>{
          this.$router.go(-1);
        })
      }, 2000);
    },
    data(){
      return {
      	item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
      }
    },
    computed: {
      ...mapState('project', ['previewList'])
    },
    methods: {
      ...mapActions('project', ['getPreview'])
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .previewC{
    margin: 5vw;
    overflow: hidden;
    & img{
      width: 90vw;
      &:not(:last-child){
        margin-bottom: 10px;
      }
    }
  }

</style>
