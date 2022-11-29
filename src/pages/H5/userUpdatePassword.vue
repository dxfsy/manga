<template>
  <div class="user-update-password-wrapper">
    <headerBar></headerBar>
    <div class="safe-wrapper">
      <div class="title">修改密码</div>
      <div class="oldPassword">
        <!-- <span class="title">原密码</span> -->
        <input
          type="password"
          placeholder="请输入原密码"
          v-model="oldPassword"
        />
      </div>
      <div class="newPassword">
        <!-- <span class="title">新密码</span> -->
        <input
          type="password"
          placeholder="请输入新密码"
          v-model="newPassword"
        />
      </div>
      <div class="againPassword">
        <!-- <span class="title">再次输入新密码</span> -->
        <input
          type="password"
          placeholder="请再次输入新密码"
          v-model="againPassword"
        />
      </div>
      <div class="update" @click="update">确认修改</div>
    </div>
    <toast ref="toasts" :text="toastText" :needMask="true"></toast>
  </div>
</template>

<script>
import toast from "../../components/H5/comment/toast.vue";
import headerBar from '../../components/H5/comment/headerBar.vue'
import { updatePassword } from "../../api/user";
import { getLocalStorage, removeLocalStorage } from "../../utils/localStorage";
import {
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from "../../utils/sessionStorage";
export default {
  name: "userUpdatePassword",
  components: {
    toast,
    headerBar
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      againPassword: "",
      toastText: "",
    };
  },
  methods: {
    async update() {
      let user = getLocalStorage("user") || getSessionStorage("user");
      let { oldPassword, newPassword, againPassword } = this;
      let res = await updatePassword({
        username: user.username,
        oldPassword,
        newPassword,
        againPassword,
      });
      let udpatePasswordStatus;
      if (res.data.data.code == 200) {
        udpatePasswordStatus = await this.showToast("密码更新成功，请重新登录");
      } else {
        udpatePasswordStatus = await this.showToast(res.data.data.message);
      }
      if (res.data.data.code == 200 && udpatePasswordStatus) {
        removeLocalStorage("user");
        removeSessionStorage("user"); 
        setSessionStorage("isLogin", false);
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
.safe-wrapper {
  padding-top: px2rem(58);
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: px2rem(24);
  }
  .oldPassword,
  .newPassword,
  .againPassword {
    margin-top: px2rem(16);
    height: px2rem(40);
    line-height: px2rem(40);
    input {
      height: px2rem(38);
      border: px2rem(1) solid #ccc;
      border-radius: px2rem(4);
      width: px2rem(250);
      padding: 0 px2rem(16);
      line-height: px2rem(38);
      vertical-align: top;
    }
  }
  .update {
    width: 80%;
    height: px2rem(40);
    line-height: px2rem(40);
    color: #fff;
    font-size: px2rem(14);
    background-color: #ff494f;
    text-align: center;
    border-radius: px2rem(20);
    margin-top: px2rem(20);
    cursor: pointer;
  }
}
</style>