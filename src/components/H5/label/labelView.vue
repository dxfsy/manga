<template>
  <div class="label-view-wrapper">
    <div class="type">
      <span
        class="item"
        v-for="(item, index) in labels.type"
        :key="index"
        :class="{ active: $route.query.type == item }"
        @click="routeChange('type',item)"
        >{{ item }}</span
      >
    </div>
    <div class="status">
      <span
        class="item"
        v-for="(item, index) in labels.state"
        :key="index"
        :class="{ active: $route.query.status == item }"
        @click="routeChange('status',item)"
        >{{ item }}</span
      >
    </div>
    <div class="sort">
      <span
        class="item"
        v-for="(item, index) in labels.sort"
        :key="index"
        :class="{ active: $route.query.sort == item }"
        @click="routeChange('sort',item)"
        >{{ item }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "labelView",
  props: {
    labels: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // 改变当前路由的query参数
    routeChange(key, val) {
      const { ...query } = this.$route.query;
      query[key] = val;
      this.$router.replace({ query });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/px2rem.scss";
.label-view-wrapper {
  width: 100%;
  .type,
  .status,
  .sort {
    height: px2rem(50);
    white-space: nowrap;
    display: -webkit-box;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .item {
    width: px2rem(32);
    height: px2rem(20);
    line-height: px2rem(50);
    font-size: px2rem(16);
    margin-left: px2rem(30);
    &.active {
      color: #ff4b2b;
    }
  }
}
</style>