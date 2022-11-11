<template>
  <div>
    <div class="header-background"></div>
    <div class="main">
      <div class="left"></div>
      <div class="center">
        <Header></Header>
        <slot></slot>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import Header from "./headerBar.vue";
export default {
  name: "layout",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>
.header-background {
  background-color: #222222;
  height: 61px;
}
.main {
  position: relative;
  width: 99vw;
  overflow: hidden;
  top: -61px;
  display: flex;
  .left {
    flex: 1;
  }
  .center {
    flex: 0 0 1200px;
  }
  .right {
    flex: 1;
  }
}
// .center {
//   margin: 0 15%;
//   width: 70%;
// }
</style>