<template>
  <div class="forget-wrapper">
    <headerBar />
    <div class="title">忘记密码</div>
    <input
      type="text"
      class="username"
      placeholder="请输入用户名"
      v-model="username"
    />
    <input
      type="password"
      class="password"
      placeholder="请输入旧密码"
      v-model="oldPassword"
    />
    <input
      type="password"
      class="password"
      placeholder="请输入新密码"
      v-model="newPassword"
    />
    <input
      type="password"
      class="password"
      placeholder="请再次输入新密码"
      v-model="againPassword"
    />
    <div class="login-btn" @click="userUpdatePassword">立即修改</div>
    <div class="login-other">
      <div class="right">
        <span class="to-register" @click="$router.push({ path: '/login' })"
          >返回登录</span
        >
      </div>
    </div>
    <toast :text="toastText" ref="toasts" :needMask="true"/>
  </div>
</template>

<script>
import toast from "../../components/H5/comment/toast.vue";
import headerBar from "../../components/H5/comment/headerBar.vue";
import { updatePassword } from "../../api/user";
export default {
  name: "forgetPage",
  components: {
    toast,
    headerBar,
  },
  data() {
    return {
      toastText: "",
      toast: null,
      username: "",
      oldPassword: "",
      newPassword: "",
      againPassword: "",
    };
  },
  methods: {
    async userUpdatePassword() {
      let { username, oldPassword, newPassword, againPassword } = this;
      let res = await updatePassword({
        username,
        oldPassword,
        newPassword,
        againPassword,
      });
      //   console.log(res);
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
@import "../../assets/styles/px2rem.scss";
.forget-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: px2rem(24);
    font-weight: bold;
    margin-top: px2rem(100);
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