<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {

    } 
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/reset.scss';
#app {
  // 解决滚轮消失问题
  overflow: auto;
  height: 100vh;
}
</style>
