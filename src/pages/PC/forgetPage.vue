<template>
  <Layout>
    <div class="login-wrapper">
      <div class="login-title">修改密码</div>
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
          placeholder="请输入原来的密码"
          v-model="oldPassword"
        />
        <input
          type="password"
          class="password user-input"
          placeholder="请输入新的密码"
          v-model="newPassword"
        />
        <input
          type="password"
          class="password user-input"
          placeholder="请再次输入新的密码"
          v-model="againPassword"
        />
      </div>
      <div class="login-btn" @click="userUpdatePassword">点击修改</div>
      <div class="login-other">
        <div class="login-other-right">
          <span class="to-register" @click="$router.push({ path: '/login' })"
            >返回登录</span
          >
        </div>
      </div>
    </div>
    <Toast ref="toasts" :text="toastText"></Toast>
  </Layout>
</template>

<script>
import Layout from "../../components/PC/comment/layout.vue";
import Toast from "../../components/PC/comment/toast.vue";
import { updatePassword } from "../../api/user";
export default {
  name: "forgetPage",
  components: {
    Layout,
    Toast,
  },
  data() {
    return {
      toast: null,
      username: "",
      oldPassword: "",
      newPassword: "",
      againPassword: "",
      toastText: "",
      timer: null,
    };
  },
  methods: {
    async userUpdatePassword() {
      let { username, oldPassword, newPassword, againPassword } = this;
      let res = await updatePassword({ username, oldPassword, newPassword, againPassword });
      console.log(res);
      let udpatePasswordStatus = await this.showToast(res.data.data.message);
      if (res.data.data.code == 200 && udpatePasswordStatus) {
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