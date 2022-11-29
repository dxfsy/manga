<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// 引入rem
import browser from "./utils/browser";
if (
  browser().mobile ||
  browser().android ||
  browser.ios ||
  document.body.clientWidth < 787
) {
  // 判断是否是移动端
  // console.log('这里是移动端')
  document.addEventListener("DOMContentLoaded", () => {
    const html = document.querySelector("html");
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > 50 ? 50 : fontSize;
    html.style.fontSize = fontSize + "px";
  });
}

export default {
  name: "App",
};
</script>

<style lang="scss">
@import "@/assets/styles/reset.scss";
#app {
  // 解决滚轮消失问题
  overflow: auto;
  height: 100vh;
}
</style>
