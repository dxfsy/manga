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
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.toast-wrapper {
  .content {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    border-radius: 10px;
  }
}
</style>