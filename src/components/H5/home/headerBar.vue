<template>
  <div class="headbar-wrapper">
    <div class="logo">哦呼漫画</div>
    <div class="search-bar-wrapper" @click="tabToSearch">
      <div class="search-bar">
        <i class="fa fa-search"></i>
      </div>
    </div>
    <div class="category">
      <i class="fa fa-align-justify" @click="tabToLabel"></i>
      <i class="fa fa-history" @click="$router.push({path:'/history'})"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerBar",
  methods: {
    tabToLabel() {
      this.$router.push({
        path: "/label",
        query: { type: "全部", status: "全部", sort: "人气" },
      });
    },
    tabToSearch() {
      this.$router.push({
        path: "/search",
        query: {
          title:'',
          page:1
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/px2rem.scss";
.headbar-wrapper {
  width: 100%;
  height: px2rem(50);
  display: flex;
  align-items: center;
  background-color: #222;
  overflow: hidden;
  .logo,
  .search-bar-wrapper,
  .category {
    flex: 1;
    height: 100%;
  }
  .logo {
    font-size: px2rem(16);
    line-height: px2rem(50);
    text-align: center;
    color: #fff;
  }
  .search-bar-wrapper {
    flex: 3;
    text-align: right;
    padding-top: px2rem(20);
    padding-left: px2rem(20);
    .search-bar {
      position: relative;
      width: 90%;
      height: px2rem(30);
      background-color: gray;
      border-radius: px2rem(15);
      i {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: px2rem(15);
        color: #fff;
      }
    }
  }
  .category {
    display: flex;
    justify-content: space-around;
    align-items: center;
    i {
      font-size: px2rem(15);
      color: #fff;
    }
  }
}
</style>