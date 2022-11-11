<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="logo">logo待定</div>
      <div class="search-wrapper">
        <input
          type="text"
          class="search-text"
          placeholder="搜索你喜欢的漫画/作者"
          v-model="value"
          @keyup.enter="toSearch"
        />
        <div class="search-btn" @click="toSearch">
          <i class="fa fa-search"></i>
        </div>
      </div>
      <div class="btns-wrapper">
        <div class="category">
          <i class="fa fa-align-justify"></i>
          分类
        </div>
        <div class="history">
          <i class="fa fa-history"></i>
          历史
        </div>
        <div class="collect">
          <i class="fa fa-star-o"></i>
          收藏
        </div>
      </div>
      <div class="user-wrapper">
        <span class="login">登录</span>
        |
        <span class="register">注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "headerBar",
  data() {
    return {
      value: "",
    };
  },
  methods: {
    ...mapActions("search", ["setSearchList"]),
    async toSearch() {
      // if (this.$route.path !== "/search") {
        this.$router.push({
          path: "/search",
          query: {
            key: this.value,
            page: 1,
          },
        });
      // }
    },
    // 改变当前路由的query参数
    routeChange(key, val) {
      const { ...query } = this.$route.query;
      query[key] = val;
      this.$router.replace({ query });
    },
  },
  watch: {
    '$route.query.key': {
      immediate:true,
      handler(){
        if(this.$route.path=='/search') {
          this.value = this.$route.query.key;
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #222222;

  .header-wrapper {
    position: relative;
    height: 61px;
    box-sizing: border-box;
    // line-height: 61px;
    // background-color: pink;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .logo {
      // position: absolute;
      height: 100%;
      width: 200px;
      color: #fff;
    }
    .search-wrapper {
      position: relative;
      height: 32px;
      box-sizing: border-box;
      .search-text {
        width: 210px;
        height: 32px;
        background-color: #353535;
        border-radius: 16px;
        padding: 2px 0;
        padding-left: 18px;
        padding-right: 40px;
        caret-color: #fff; // 修改光标颜色
        color: #fff;
        font-size: 12px;
        &::placeholder {
          color: #999999;
        }
      }
      .search-btn {
        position: absolute;
        top: 0px;
        left: 226px;
        width: 60px;
        height: 36px;
        background-color: #ff494f;
        border-radius: 20px;
        cursor: pointer;
        i {
          position: absolute;
          top: 6px;
          left: 21px;
          font-size: 18px;
          color: #fff;
        }
      }
    }
    .btns-wrapper {
      width: 220px;
      height: 20px;
      color: #b2b2b2;
      font-size: 14px;
      display: flex;
      .category {
        flex: 1;
      }
      .history {
        flex: 1;
      }
      .collect {
        flex: 1;
      }
    }
    .user-wrapper {
      font-size: 14px;
      color: #b2b2b2;
      width: 80px;
      height: 20px;
      // background-color: pink;
      span {
        cursor: pointer;
      }
    }
  }
}
</style>