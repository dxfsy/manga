<template>
  <div class="menu-wrapper">
    <div
      class="menu-home-wrapper menu-item"
      :class="{ active: $route.path == '/home' }"
      @click="$router.push({ path: '/home' })"
    >
      <i class="fa fa-home"></i>
      <div class="title">精选</div>
    </div>
    <div
      class="menu-discover-wrapper menu-item"
      :class="{ active: $route.path == '/label' }"
      @click="tabToLabel"
    >
      <i class="fa fa-cc-discover"></i>
      <div class="title">发现</div>
    </div>
    <div
      class="menu-category-wrapper menu-item"
      :class="{ active: $route.path == '/collect' }"
      @click="$router.push({ path: '/collect' })"
    >
      <i class="fa fa-book"></i>
      <div class="title">书架</div>
    </div>
    <div
      class="menu-personal-center-wrapper menu-item"
      :class="{ active: $route.path == '/safe' }"
      @click="$router.push({ path: '/safe' })"
    >
      <i class="fa fa-user"></i>
      <div class="title">个人</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bottomMenu",
  methods: {
    tabToLabel() {
      this.$router.push({
        path: "/label",
        query: { type: "全部", status: "全部", sort: "人气" },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/px2rem.scss";
.menu-wrapper {
  // margin-top: ;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 200;
  height: px2rem(60);
  line-height: px2rem(100);
  font-size: px2rem(12);
  text-align: center;
  display: flex;
  background-color: #fff;
  .menu-item {
    flex: 1;
    color: #ccc;
    position: relative;
    i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: px2rem(20);
    }
    &.active {
      color: #ff4b2b;
    }
  }
}
</style>