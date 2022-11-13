<template>
  <Layout>
    <div class="register-wrapper">
      <div class="register-title">注册</div>
      <div class="input-wrapper">
        <input
          type="text"
          class="username user-input"
          placeholder="请输入用户名"
          v-model="username"
        />
        <input
          type="password"
          class="password user-input"
          placeholder="请输入密码"
          v-model="password"
        />
        <input
          type="password"
          class="password user-input"
          placeholder="请确认密码"
          v-model="againPassword"
        />
      </div>
      <div class="register-btn" @click="userRegister">点击注册</div>
      <div class="register-other">
        <div class="register-other-left">
          <input type="checkbox" id="check" />
          <label class="is-ohu" for="check">开启哦呼漫画之旅</label>
        </div>
        <div class="register-other-right">
          <span class="to-register" @click="$router.push({path:'/login'})">已有账号，直接登录</span>
        </div>
      </div>
    </div>
    <Toast ref="toasts" :text="toastText"></Toast>
  </Layout>
</template>

<script>
import Layout from "../../components/PC/comment/layout.vue";
import Toast from "../../components/PC/comment/toast.vue";
import { register } from "../../api/user";
export default {
  name: "registerPage",
  components: {
    Layout,
    Toast,
  },
  data() {
    return {
      toast: null,
      username: "",
      password: "",
      againPassword: "",
      toastText: "",
      timer: null,
    };
  },

  methods: {
    async userRegister() {
      let { username, password, againPassword } = this;
      let res = await register({ username, password, againPassword });
      let registerStatus = await this.showToast(res.data.data.message);
      if (res.data.data.code == 200 && registerStatus) {
        this.$router.push({
          path: "/login",
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
.register-wrapper {
  width: 1200px;
  // background-color: #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  .register-title {
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
  .register-btn {
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
  .register-other {
    position: relative;
    width: 400px;
    height: 20px;
    line-height: 20px;
    .register-other-left {
      position: absolute;
      left: 0;
      font-size: 12px;
      color: #999;
      #check {
        position: relative;
        top: 2px;
      }
      .is-ohu {
        padding-right: 10px;
        margin-right: 10px;
      }
      .forget-password {
        cursor: pointer;
      }
    }
    .register-other-right {
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