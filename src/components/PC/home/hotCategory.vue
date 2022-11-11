<template>
  <div class="hot-category-wrapper">
    <div class="category-header">
      <div class="category-title">热门分类</div>
      <div class="category-tabs">
        <span
          v-for="(item, index) in category"
          :key="index"
          :class="{ active: index + 1 == cur }"
          @mouseenter="changeIndex(index)"
        >
          {{ item.label }}
        </span>
      </div>
    </div>
    
      <div class="category-content">
        <showList :list="categoryData" :swiper="false" />
      </div>
    
    
  </div>
</template>

<script>
import showList from './showList.vue'
export default {
  name: "hotCategory",
  props: {
    category: {
      type: Array,
      required: true,
    },
  },
  components: {
    showList
  },
  data() {
    return {
      cur: 1,
    };
  },
  computed: {
    categoryData(){
        return this.category[this.cur-1].info
    }
  },
  methods: {
    changeIndex(index) {
      this.cur = index + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.hot-category-wrapper {
  width: 1200px;
  height: 369px;
//   background-color: #ccc;
  .category-header {
    height: 24px;
    width: 100%;
    margin-bottom: 24px;
    display: flex;
    .category-title {
      flex: 0 0 100px;
      margin-right: 70px;
      font-size: 24px;
      color: #262626;
      font-weight: bold;
    }
    .category-tabs {
      flex: 1;
      span {
        width: 50px;
        height: 20px;
        font-size: 16px;
        color: #606060;
        padding: 2px 12px;
        margin-right: 8px;
        border-radius: 16.5px;
        line-height: 25px;
        cursor: pointer;
        &.active {
          background-color: #f2f2f2;
          color: #ff4b2b;
        }
      }
    }
  }
}
</style>