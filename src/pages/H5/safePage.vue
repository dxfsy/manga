<template>
  <Layout>
    <div class="person-wrapper">
      <div class="top">
        <div class="avatar">
          <i class="fa fa-user-circle-o"></i>
        </div>
        <div class="username">{{ username }}</div>
      </div>
      <div class="bottom">
        <div class="opera-list">
          <div class="opera-item" @click="$router.push({path:'/updatePassword'})">
            <i class="fa fa-shield"></i>
            <span>修改密码</span>
          </div>
          <div class="opera-item"  @click="$router.push({path:'/collect'})">
            <i class="fa fa-book"></i>
            <span>书架</span>
          </div>
          <div class="opera-item" @click="$router.push({path:'/history'})">
            <i class="fa fa-history"></i>
            <span>浏览记录</span>
          </div>
          <div class="opera-item" @click="logout">
            <i class="fa fa-power-off"></i>
            <span>登出</span>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../../components/H5/comment/Layout.vue";
import { isLogin } from "../../api/user";
import {
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from "../../utils/sessionStorage";
import { getLocalStorage, removeLocalStorage } from "../../utils/localStorage";
export default {
  name: "safePage",
  components: {
    Layout,
  },
  data() {
    return {
      username: "",
    };
  },
  methods: {
    // 退出登录
    logout() {
      removeLocalStorage("user");
      removeSessionStorage("user");
      setSessionStorage("isLogin", false);
      this.$router.push({
        path:'/home'
      })
    },
  },
  created() {
    isLogin().then((res) => {
      if (res.data.data.code == 200) {
        // token未失效
        let user = getSessionStorage("user") || getLocalStorage("user");
        if (user.username == undefined) {
          // 本地存储中的user是恶意添加的
          setSessionStorage("isLogin", false);
          this.$router.push({
            path: "/login",
          });
        } else {
          // token未失效正常逻辑
          setSessionStorage("isLogin", true);
          this.username = user.username;
        }
      } else {
        // token过期失效了
        setSessionStorage("isLogin", false);
        this.$router.push({
          path: "/login",
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/px2rem.scss";
.person-wrapper {
  .top {
    width: 100%;
    height: px2rem(200);
    // background-color: #FBAB7E;
    // background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
    background-color: #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .avatar {
      font-size: px2rem(40);
    }
    .username {
      font-size: px2rem(20);
      margin-top: px2rem(20);
    }
  }
  .bottom {
    width: 100%;
    .opera-list {
      font-size: px2rem(14);
      width: 100%;
      .opera-item {
        position: relative;
        width: 100%;
        height: px2rem(30);
        line-height: px2rem(30);
        padding: 0 px2rem(15);
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
        i {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: px2rem(18);
          color: #ccc;
        }
        span {
          margin-left: px2rem(30);  
        }
      }
    }
  }
}
</style>