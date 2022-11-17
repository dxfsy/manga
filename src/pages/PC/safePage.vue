<template>
  <centerLayout>
    <div class="safe-wrapper">
      <div class="oldPassword">
        <span class="title">原密码</span>
        <input
          type="password"
          placeholder="请输入原密码"
          v-model="oldPassword"
        />
      </div>
      <div class="newPassword">
        <span class="title">新密码</span>
        <input
          type="password"
          placeholder="请输入新密码"
          v-model="newPassword"
        />
      </div>
      <div class="againPassword">
        <span class="title">再次输入新密码</span>
        <input
          type="password"
          placeholder="请再次输入新密码"
          v-model="againPassword"
        />
      </div>
      <div class="update" @click="update">确认修改</div>
    </div>
    <Toast ref="toasts" :text="toastText"></Toast>
  </centerLayout>
</template>

<script>
import centerLayout from "../../components/PC/comment/centerLayout.vue";
import Toast from "../../components/PC/comment/toast.vue";
import { updatePassword } from "../../api/user";
import { getLocalStorage, removeLocalStorage } from "@/utils/localStorage";
import {
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from "@/utils/sessionStorage";
export default {
  name: "safePage",
  components: {
    centerLayout,
    Toast,
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
.safe-wrapper {
  padding-top: 58px;
  .oldPassword,
  .newPassword,
  .againPassword {
    margin-bottom: 16px;
    height: 40px;
    line-height: 40px;
    .title {
      width: 350px;
      text-align: right;
      font-size: 14px;
      color: #333;
      display: inline-block;
      padding-right: 12px;
    }
    input {
      height: 38px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 308px;
      padding: 0 16px;
      line-height: 38px;
      vertical-align: top;
    }
  }
  .update {
    width: 132px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
    background-color: #ff494f;
    text-align: center;
    border-radius: 20px;
    margin-left: 362px;
    cursor: pointer;
  }
}
</style>