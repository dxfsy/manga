<template>
  <Layout>
    <div class="personal-wrapper">
      <div class="personal-center">
        <div class="center-title" v-if="$route.path == '/collect' || $route.path == '/history'">
          <span class="title">我的书架</span>
          <span class="collect" :class="{ active: $route.path == '/collect' }" @click="$router.push({path:'/collect'})"
            >我的收藏</span
          >
          <span class="point"></span>
          <span class="history" :class="{ active: $route.path == '/history' }" @click="$router.push({path:'/history'})"
            >阅读记录</span
          >
        </div>
        <div class="center-title" v-else>
          <span class="title">安全中心</span>
          <span class="collect active">修改密码</span>
        </div>
        <div class="bar-wrapper">
          <div class="left-bar">
            <div
              class="navbar myBookmark"
              :class="{
                active: $route.path == '/history' || $route.path == '/collect',
              }"
              @click="toBookmark"
            >
              <i class="fa fa-book"></i>
              我的书架
            </div>
            <div
              class="navbar updatePassword"
              :class="{ active: $route.path == '/safe' }"
              @click="toUpdatePassword"
            >
              <i class="fa fa-shield"></i>
              安全中心
            </div>
          </div>
          <div class="right-bar">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "./layout.vue";
export default {
  name: "centerLayout",
  components: {
    Layout,
  },
  data() {
    return {};
  },
  methods: {
    toBookmark() {
      this.$router.push({path:'/collect'})
    },
    toUpdatePassword() {
      this.$router.push({path:'/safe'})
    },
  },
};
</script>

<style lang="scss" scoped>
.personal-center {
  margin-top: 50px;
  // background-color: #ccc;
  width: 1200px;
  .center-title {
    margin-left: 202px;
    padding-bottom: 31px;
    height: 24px;
    width: 998px;
    // background-color: pink;
    .title {
      font-size: 24px;
      color: #333;
      line-height: 24px;
      font-weight: bold;
      padding-right: 14px;
    }
    .collect,
    .history {
      font-size: 16px;
      color: #595959;
      letter-spacing: 0;
      line-height: 16px;
      margin: 0 10px;
      font-weight: bold;
      cursor: pointer;
      &.active {
        color: #ff4b2b;
      }
    }
    .point {
      padding-right: 0px;
      height: 4px;
      width: 4px;
      background-color: #a0a0a0;
      display: inline-block;
      vertical-align: bottom;
      position: relative;
      bottom: 6px;
      border-radius: 2px;
    }
  }
  .bar-wrapper {
    display: flex;
    .left-bar {
      flex: 0 0 140px;
      height: 623px;
      // background-color: pink;
      border-right: 1px solid #d9d9d9;
      .navbar {
        position: relative;
        left: 1px;
        height: 56px;
        width: 140px;
        line-height: 56px;
        padding-left: 45px;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 14px;
        i {
          position: absolute;
          left: 20px;
          top: 18px;
          font-size: 20px;
        }
        &.active {
          border-top: 1px solid #d9d9d9;
          border-bottom: 1px solid #d9d9d9;
          border-left: 3px solid #ff4b2b;
          color: #ff4b2b;
        }
      }
    }
    .right-bar {
      flex: 1;
      // background-color: pink;
      padding-left: 63px;
    }
  }
}
</style>