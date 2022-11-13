<template>
  <Layout>
    <div class="login-wrapper">
      <div class="login-title">登录</div>
      <div class="input-wrapper">
        <input
          type="text"
          class="username user-input"
          placeholder="您的用户名"
          v-model="username"
        />
        <input
          type="password"
          class="password user-input"
          placeholder="密码"
          v-model="password"
        />
      </div>
      <div class="login-btn" @click="userLogin">立即登录</div>
      <div class="login-other">
        <div class="login-other-left">
          <input
            type="checkbox"
            class="login-check"
            id="check"
            v-model="autoLogin"
          />
          <label class="login-label-check" for="check">自动登录</label>
          <span class="forget-password"  @click="$router.push({path:'/forget'})">忘记密码</span>
        </div>
        <div class="login-other-right">
          <span class="to-register" @click="$router.push({path:'/register'})">去注册</span>
        </div>
      </div>
    </div>
    <Toast ref="toasts" :text="toastText"></Toast>
  </Layout>
</template>

<script>
import Layout from "../../components/PC/comment/layout.vue";
import Toast from "../../components/PC/comment/toast.vue";
import { login } from "../../api/user";
import { mapMutations } from "vuex";
export default {
  name: "loginPage",
  components: {
    Layout,
    Toast,
  },
  data() {
    return {
      toast: null,
      username: "",
      password: "",
      toastText: "",
      timer: null,
      autoLogin: false,
    };
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
    async showToast(text) {
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
  mounted() {
    this.toast = this.$refs.toasts;
  },
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 1200px;
  // background-color: #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  .login-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 50px;
  }
  .input-wrapper {
    .user-input {
      display: block;
      height: 38px;
      width: 370px;
      line-height: 38px;
      padding: 0 15px;
      border: 1px solid #ff416b;
      border-radius: 4px;
      margin-top: 20px;
    }
    margin-bottom: 30px;
  }
  .login-btn {
    width: 400px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: #ff494f;
    border-radius: 20px;
    font-size: 14px;
    color: #fff;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .login-other {
    position: relative;
    width: 400px;
    height: 20px;
    line-height: 20px;
    .login-other-left {
      position: absolute;
      left: 0;
      font-size: 12px;
      color: #999;
      #check {
        position: relative;
        top: 2px;
      }
      .login-label-check {
        padding-right: 10px;
        border-right: 1px solid #ddd;
        margin-right: 10px;
      }
      .forget-password {
        cursor: pointer;
      }
    }
    .login-other-right {
      position: absolute;
      right: 0;
      font-size: 12px;
      color: #02a0ff;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>