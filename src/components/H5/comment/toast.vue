<template>
  <div class="toast-wrapper" v-if="isShow">
    <div class="content">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: "toast",
  props: {
    text: {
      type: String,
      required: true,
    },
    needMask: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      this.isShow = true;
      if (this.needMask) {
        let dom = document.createElement("div");
        dom.setAttribute("class", "toast-mask");
        let body = document.querySelector("body");
        body.appendChild(dom);
      }
    },
    hide() {
      this.isShow = false;
      if (this.needMask) {
        let dom = document.querySelector('.toast-mask')
        dom.setAttribute('class','')
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/px2rem.scss";
.toast-wrapper {
  .content {
    position: absolute;
    top: px2rem(30);
    left: 50%;
    transform: translateX(-50%);
    width: px2rem(200);
    height: px2rem(50);
    line-height: px2rem(50);
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    border-radius: px2rem(10);
    font-size: px2rem(16);
  }
}
</style>