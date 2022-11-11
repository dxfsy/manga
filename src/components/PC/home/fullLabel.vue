<template>
  <div class="fullLabel-container">
    <div class="labels">
      <span
        v-for="(item, index) in labels"
        :key="index"
        @click="onClickLabel(item)"
        >{{ item }}</span
      >
    </div>
    <div class="category-wrapper">
      <div
        class="category"
        @click="
          $router.push({
            path: '/label',
            query: { labelName: '全部', status: '全部', sort: '人气', page: 1 },
          })
        "
      >
        <i class="fa fa-th-list"></i>
        全部分类
      </div>
    </div>
  </div>
</template>

<script>
import { labelList } from "../../../api/request";
export default {
  name: "fullLabel",
  data() {
    return {
      labels: null,
    };
  },
  methods: {
    async getLabelList() {
      let labels = await labelList();
      this.labels = labels.data.data.type;
    },
    // 点击标签
    onClickLabel(label) {
      this.$router.push({
        path: "/label",
        query: { labelName: label, status: "全部", sort: "人气", page: 1 },
      });
    },
  },
  created() {
    this.getLabelList();
  },
};
</script>

<style lang="scss" scoped>
.fullLabel-container {
  padding-top: 20px;
  display: flex;
  .labels {
    flex: 0 0 652px;
    span {
      margin: 14px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #ff1b3d;
      }
    }
  }
  .category-wrapper {
    flex: 0 0 512px;
    font-size: 20px;
    margin-left: 30px;
    .category {
      width: 160px;
      font-size: 16px;
      cursor: pointer;
      i {
        margin-right: 15px;
      }
    }
  }
}
</style>