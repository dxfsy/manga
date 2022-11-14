<template>
  <div class="showList-wrapper" :style="{ width: listWidth + 'px' }">
    <div class="list-title" v-if="listTitle">{{ listTitle }}</div>
    <div class="list">
      <!-- swiper上一页 -->
      <div
        class="slide-btn prev-slide fa fa-angle-left"
        @click="prev"
        v-if="swiper"
      ></div>
      <!-- 用swiper渲染列表 -->
      <div class="list-swiper" v-if="swiper">
        <!-- swiper5 -->
        <div class="swiper" ref="cur">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in list"
              :key="index"
            >
              <listItem :data="item"></listItem>
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
        <div class="next-slide">2</div>
        <!-- swiper5-end -->
      </div>
      <!-- 不用swiper渲染列表 -->
      <div v-else class="item" v-for="(item, index) in list" :key="index">
        <listItem :data="item"></listItem>
      </div>
      <!-- swiper下一页 -->
      <div
        class="slide-btn next-slide fa fa-angle-right"
        @click="next"
        v-if="swiper"
      ></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";

import listItem from "./listItem";
export default {
  name: "showList",
  data() {
    return {
      mySwiper: null,
    };
  },
  props: {
    listTitle: {
      type: String,
      default: "",
    },
    // 列表宽度
    listWidth: {
      type: Number,
      default: 1200,
    },
    // 列表数据
    list: {
      type: Array,
      required: true,
    },
    // 是否需要swiper
    swiper: {
      type: Boolean,
      default: true,
    },
    // 一页swiper需要展示多少个数据
    onePageLength: {
      type: Number,
      default: 6,
    },
  },
  components: {
    listItem,
  },
  methods: {
    next() {
      this.mySwiper.slideNext(500);
    },
    prev() {
      this.mySwiper.slidePrev(500);
    },
  },
  watch: {
    list: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.mySwiper = new Swiper(this.$refs.cur, {
            width: 1200,
            // loop: true,
            // swiper内展示多少个item
            slidesPerView: this.onePageLength,
            // 多少个item为一组
            slidesPerGroup: this.onePageLength,
          });
        });
      },
    },
  },
};
</script>

<style lang='scss' scoped>
.showList-wrapper {
  // width: 796px; //整个列表长度可以指定
  height: 362px;
  .list-title {
    font-size: 24px;
    color: #262626;
    font-weight: bold;
    margin-bottom: 24px;
  }
  .list {
    position: relative;
    width: 100%;
    height: 314px;
    // overflow: hidden;
    display: flex;
    .slide-btn {
      position: absolute;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      background-color: rgb(238, 236, 236);
      border-radius: 20px;
      line-height: 40px;
      text-align: center;
      font-size: 24px;
      color: rgb(150, 149, 149);
      z-index: 2;
      cursor: pointer;
      &.prev-slide {
        left: -70px;
        top: 40%;
      }
      &.next-slide {
        right: -60px;
        top: 40%;
      }
    }
    .list-swiper {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .item {
      flex: 1;
    }
  }
}
.swiper {
  width: 700px;
}
</style>