<template>
  <div class="header-wrapper">
    <i class="fa fa-angle-left" @click="$router.go(-1)"></i>
    <span class="title">{{ text }}</span>
    <span class="edit" v-if="isEdit">
      <span class="edit-not-active" v-show="!active" @click="isActive">
        编辑
        <i class="fa fa-edit"></i>
      </span>
      <span class="edit-active" v-show="active">
        <span class="del" @click="$bus.$emit('del')">删除</span>
        <span class="complete" @click="notActive">完成</span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: "headerBar",
  props: {
    text: {
      type: String,
      default: "",
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    isActive(){
      this.active = true
      this.$emit('active',this.active)
    },
    notActive(){
      this.active = false
      this.$emit('notActive',this.active)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/px2rem.scss";
.header-wrapper {
  position: relative;
  width: 97vw;
  height: px2rem(50);
  background-color: #222;
  padding-left: 3vw;
  i {
    position: absolute;
    left: px2rem(14);
    top: 50%;
    transform: translateY(-50%);
    font-size: px2rem(24);
    color: #fff;
  }
  .title {
    position: absolute;
    left: px2rem(30);
    top: 50%;
    transform: translateY(-50%);
    font-size: px2rem(16);
    color: #fff;
  }
  .edit {
    width: px2rem(200);
    text-align: right;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: px2rem(30);
    font-size: px2rem(14);
    color: #fff;
    .edit-not-active {
      i {
        position: absolute;
        top: calc(50% + px2rem(2));
        transform: translateY(-50%);
        font-size: px2rem(15);
        right: px2rem(30);
      }
    }
    .edit-active {
      .del,.complete {
        display: inline-block;
        width: px2rem(50);
        height: px2rem(20);
        line-height: px2rem(20);
        text-align: center;
        margin-right: px2rem(10);
        border-radius: px2rem(15);
        border: px2rem(1) solid #ccc;
        cursor: pointer;
      }
      .complete {
        margin-right: 0;
        border: px2rem(1) solid #ff494f;
        background-color: #ff494f;
      }
    }
  }
}
</style>