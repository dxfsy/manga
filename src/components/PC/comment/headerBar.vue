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
      <div class="user-wrapper" v-if="!loginStatus">
        <span class="login" @click="$router.push({ path: '/login' })"
          >登录</span
        >
        |
        <span class="register" @click="$router.push({ path: '/register' })"
          >注册</span
        >
      </div>
      <div
        class="user-wrapper is-login"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
        v-else
      >
        <span class="username">{{ username }}</span
        ><i class="fa fa-user-o"></i>
        <div class="user-opera" v-show="isHover">
          <span class="settings">账号设置</span>
          <span class="logout" @click="logout">退出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { isLogin } from "../../../api/user";
import {
  getLocalStorage,
  removeLocalStorage,
} from "../../../utils/localStorage";
import {
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
} from "../../../utils/sessionStorage";
export default {
  name: "headerBar",
  data() {
    return {
      value: "",
      username: "",
      // 是否是登录状态，false表示不是，true表示是
      loginStatus: false,
      // 鼠标是否悬浮在用户信息上
      isHover: false,
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
    // 退出登录
    logout() {
      removeLocalStorage("user");
      removeSessionStorage("user");
      setSessionStorage("isLogin", false);
      location.reload();
    },
  },
  watch: {
    "$route.query.key": {
      immediate: true,
      handler() {
        if (this.$route.path == "/search") {
          this.value = this.$route.query.key;
        }
      },
    },
  },
  mounted() {
    isLogin().then((res) => {
      if (res.data.data.code == 200) {
        // 表示token还未过期
        let user = getSessionStorage("user") || getLocalStorage("user");
        // 本地存储中有user数据
        if (user !== null) {
          this.username = user.username;
          this.loginStatus = true;
          setSessionStorage("isLogin", true);
        }
      } else {
        // token过期
        this.loginStatus = false;
        setSessionStorage("isLogin", false);
      }
    });
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
    // overflow: hidden;
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
      position: relative;
      font-size: 14px;
      color: #b2b2b2;
      width: 100px;
      line-height: 20px;
      height: 20px;
      // background-color: pink;
      span {
        cursor: pointer;
      }
      i {
        position: absolute;
        right: 0;
        margin-left: 10px;
        font-size: 20px;
        cursor: pointer;
      }
      &.is-login {
        font-size: 16px;
        .username {
          display: inline-block;
          width: 80px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          text-align: right;
        }
      }
      .user-opera {
        position: absolute;
        top: 21px;
        left: -70px;
        font-size: 14px;
        color: #000;
        width: 180px;
        height: 60px;
        line-height: 60px;
        background-color: #fff;
        border: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 20px;
        span {
          &:hover {
            color: #fd113a;
          }
        }
      }
    }
  }
}
</style>