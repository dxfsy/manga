<template>
  <div class="comic-item-wrapper">
    <img
      :src="data.imageUrl"
      :style="{ height: height + 'rem', width: width + 'rem' }"
      @click="tabToDetail(data)"
    />
    <div class="comic-title">{{ data.title || data.detail.title }}</div>
    <div class="comic-labels" v-if="subTitle">
      <span class="label" v-for="(item, index) in subTitle" :key="index">{{
        item
      }}</span>
    </div>
    <div
      class="comic-chapter"
      v-if="$route.path == '/label' || $route.path == '/search'"
    >
      <span class="chapter-status">{{ data.state || data.detail.state }}</span>
      <span class="chapter-name">{{
        data.chapterTitle || data.detail.text
      }}</span>
    </div>
  </div>
</template>

<script>
import { px2rem } from "../../../utils/px2rem";
export default {
  name: "comicItem",
  props: {
    data: {
      type: Object,
      required: true,
    },
    // 指定img高度
    height: {
      type: Number,
      default: px2rem(150),
    },
    // 指定img宽度
    width: {
      type: Number,
    },
  },
  computed: {
    subTitle() {
      if (this.data.subTitle !== undefined) return this.data.subTitle;
      else return this.data.label;
    },
  },
  methods: {
    tabToDetail(data) {
      let comicId = data.comicId || data.detail.comicId
      this.$router.push({
        path: "/detail",
        query: {
          comicId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/px2rem.scss";
@import "../../../assets/styles/mixin.scss";
.comic-item-wrapper {
  width: 100%;
  height: 100%;
  font-size: px2rem(14);
  img {
    width: 100%;
  }
  .comic-title {
    width: px2rem(102);
    font-weight: bold;
    margin-top: px2rem(5);
    @include Ellipsis;
  }
  .comic-labels {
    margin-top: px2rem(10);
    font-size: px2rem(12);
    .label {
      margin-right: px2rem(5);
      color: rgb(170, 168, 168);
    }
  }
  .comic-chapter {
    position: relative;
    width: px2rem(180);
    height: px2rem(18);
    font-size: px2rem(12);
    margin-top: px2rem(5);
    .chapter-status {
      color: #fd113a;
    }
    .chapter-name {
      position: absolute;
      left: px2rem(30);
      display: inline-block;
      width: px2rem(70);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>