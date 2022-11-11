<template>
  <div class="detail-list-wrapper">
    <div class="detail-list-con1">
      <div class="detail-list-time">{{ chapterList.updateTime }}</div>
      <div class="detail-list-order" @click="orderChange">{{ order }}</div>
    </div>
    <div class="detail-list-con2">
      <chapterItem
        v-for="(item, index) in chapterList.chapterList"
        :key="index"
        v-show="index < defaultCount"
        :data="item"
      />
      <div
        class="detail-list-more"
        @click="showMore"
        v-if="defaultCount !== chapterList.chapterList.length"
      >
        展开全部章节
        <i class="fa fa-angle-down"></i>
      </div>
    </div>
  </div>
</template>

<script>
import chapterItem from "./chapterItem.vue";
import { mapGetters } from "vuex";
export default {
  name: "chapterList",
  computed: {
    ...mapGetters("detail", ["chapterList"]),
  },
  components: {
    chapterItem,
  },
  data() {
    return {
      order: "倒序",
      defaultCount: 20,
    };
  },
  methods: {
    orderChange() {
      if (this.order == "倒序") this.order = "升序";
      else if (this.order == "升序") this.order = "倒序";
      this.chapterList.chapterList.reverse();
    },
    showMore() {
      this.defaultCount = this.chapterList.chapterList.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-list-wrapper {
  .detail-list-con1 {
    width: 100%;
    height: 30px;
    // background-color: pink;
    line-height: 30px;
    position: relative;
    .detail-list-time {
      position: absolute;
      left: 0;
      font-size: 14px;
      color: #595959;
    }
    .detail-list-order {
      position: absolute;
      right: 0;
      font-size: 14px;
      color: #595959;
      cursor: pointer;
    }
  }
  .detail-list-con2 {
    width: 100%;
    height: fit-content;
    // background-color: #ccc;
    display: flex;
    flex-wrap: wrap;
    .detail-list-more {
      width: 100%;
      background-color: #f5f5f5;
      height: 54px;
      text-align: center;
      line-height: 54px;
      margin-top: 1%;
      color: #ff4b2b;
      font-size: 14px;
      cursor: pointer;
      i {
        font-size: 18px;
      }
    }
  }
}
</style>