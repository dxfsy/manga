<template>
  <div class="label-view-wrapper">
    <div class="label-select select-wrapper">
      <span class="type-title title">题材：</span>
      <span
        class="type-item item"
        :class="{ active: item == $route.query.labelName }"
        v-for="(item, index) in labelData.type"
        :key="index"
        @click="onClickType(item)"
      >
        {{ item }}
      </span>
    </div>
    <div class="status-select select-wrapper">
      <span class="status-title title">状态：</span>
      <span
        class="status-item item"
        :class="{ active: item == $route.query.status }"
        v-for="(item, index) in labelData.state"
        :key="index"
        @click="onClickStatus(item)"
      >
        {{ item }}
      </span>
    </div>
    <div class="sort-select select-wrapper">
      <span class="sort-title title">排序：</span>
      <span
        class="sort-item item"
        :class="{ active: item == $route.query.sort }"
        v-for="(item, index) in labelData.sort"
        :key="index"
        @click="onClickSort(item)"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "labelView",
  props: {
    labelData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onClickType(type){
        this.$emit('onType',type)
    },
    onClickStatus(status){
        this.$emit('onStatus',status)
    },
    onClickSort(sort){
        this.$emit('onSort',sort)
    }
  }
};
</script>

<style lang="scss" scoped>
.label-view-wrapper {
  width: 1200px;
  height: 170px;
  //   background-color: #ccc;
  padding: 10px 0;
  border-bottom: 1px solid #EDEDED;
  .select-wrapper {
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin: 20px 0;
    // background-color: pink;
    padding: 0 40px;
    box-sizing: border-box;
    .title {
      font-size: 13px;
      color: #a0a0a0;
    }
    .item {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      font-size: 13px;
      margin: 0 5px;
      padding: 0 10px;
      border-radius: 13px;
      cursor: pointer;
      &.active {
        background-color: #ff4b2b;
        color: #fff;
      }
    }
  }
}
</style>