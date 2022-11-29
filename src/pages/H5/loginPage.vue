<template>
  <div class="login-wrapper">
    <headerBar />
    <div class="login">
      <div class="title">登录</div>
      <input
        type="text"
        class="username"
        placeholder="请输入用户名"
        v-model="username"
      />
      <input
        type="password"
        class="password"
        placeholder="请输入密码"
        v-model="password"
      />
      <div class="login-btn" @click="userLogin">点击登录</div>
      <div class="login-other">
        <div class="left">
          <input
            type="checkbox"
            id="check"
            class="login-check"
            v-model="autoLogin"
          />
          <label for="check" class="login-label-check">自动登录</label>
          <span
            class="forget-password"
            @click="$router.push({ path: '/forget' })"
            >忘记密码</span
          >
        </div>
        <div class="right">
          <span class="to-register" @click="$router.push({ path: '/register' })"
            >去注册</span
          >
        </div>
      </div>
      <toast :text="toastText" ref="toasts" :needMask="true"/>
    </div>
  </div>
</template>

<script>
import toast from "../../components/H5/comment/toast.vue";
import headerBar from "../../components/H5/comment/headerBar.vue";
import { mapMutations } from "vuex";
import { login } from "../../api/user";
import { setSessionStorage } from "../../utils/sessionStorage";
export default {
  name: "loginPage",
  components: {
    toast,
    headerBar,
  },
  data() {
    return {
      toastText: "",
      toast: null,
      username: "",
      password: "",
      autoLogin: false,
    };
  },
  mounted() {
    this.toast = this.$refs.toasts;
  },
  methods: {
    ...mapMutations("user", ["set_Token"]),
    // 登录
    async userLogin() {
      let res = await login({
        username: this.username,
        password: this.password,
      });
      let toastFinish = await this.showToast(res.data.data.message);
      if (res.data.data.code == 200 && toastFinish) {
        setSessionStorage("isLogin", true);
        this.set_Token({
          token: res.data.data.token,
          username: res.data.data.username,
          autoLogin: this.autoLogin,
        });
        this.$router.push({
          path: "/home",
        });
      }
    },
    showToast(text) {
      return new Promise((resolve, reject) => {
        if (this.timer) clearTimeout(this.timer);
        this.toastText = text;
        this.toast.show();
        this.timer = setTimeout(() => {
          this.toast.hide();
          resolve(true);
        }, 2000);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/px2rem.scss";
.login {
  margin-top: px2rem(100);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: px2rem(24);
    font-weight: bold;
  }
  .username,
  .password {
    height: px2rem(38);
    width: 80%;
    line-height: px2rem(38);
    padding: 0 px2rem(15);
    border: px2rem(1) solid #ff416b;
    border-radius: px2rem(4);
    margin-top: px2rem(30);
  }
  .login-btn {
    width: 80%;
    height: px2rem(40);
    text-align: center;
    line-height: px2rem(40);
    background-color: #ff494f;
    border-radius: px2rem(20);
    font-size: px2rem(14);
    color: #fff;
    margin-top: px2rem(20);
    padding: 0 px2rem(15);
    cursor: pointer;
  }
  .login-other {
    position: relative;
    width: 89%;
    height: px2rem(20);
    line-height: px2rem(20);
    margin-top: px2rem(20);
    .left {
      position: absolute;
      left: 0;
      font-size: px2rem(12);
      color: #999;
      #check {
        position: relative;
        top: px2rem(2);
      }
      .login-label-check {
        padding-right: px2rem(10);
        border-right: px2rem(1) solid #ddd;
        margin-right: px2rem(10);
      }
    }
    .right {
      position: absolute;
      right: 0;
      font-size: px2rem(12);
      color: #02a0ff;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>