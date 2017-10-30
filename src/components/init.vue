<template>
  <div>
  </div>
</template>

<script>
  export default {
    mounted () {
      if(document.getElementById('roles')){
        window.roles = (document.getElementById('roles').value);
        }
      if(window.roles.indexOf('管理员')>-1){
        this.$router.push({
          name: 'index'
        })
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
