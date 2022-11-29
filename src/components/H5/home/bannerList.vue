<template>
  <div class="banner-list-wrapper">
    <div class="list-swiper">
      <!-- swiper5 -->
      <div class="swiper" ref="cur">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in bannerList"
            :key="index"
          >
            <img
              class="swiper-item"
              :src="item.src"
              alt=""
              @click="tabToDetail(item.comicId)"
            />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <!-- swiper5-end -->
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";
export default {
  name: "bannerList",
  props: {
    bannerList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      list: [1, 2, 3, 4],
      mySwiper: null,
    };
  },
  methods: {
    tabToDetail(comicId){
      this.$router.push({
        path:'/detail',
        query: {
          comicId
        }
      })
    }
  },
  mounted() {
    this.mySwiper = new Swiper(this.$refs.cur, {
      // loop: true,
      // swiper内展示多少个item
      slidesPerView: 1,
      // 多少个item为一组
      slidesPerGroup: 1,
      pagination: {
        el: ".swiper-pagination",
        //点击小球的时候也切换图片
        clickable: true,
      },
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/px2rem.scss";
.banner-list-wrapper {
  width: 100%;
  height: px2rem(216);
  background-color: rgb(238, 235, 235);
  position: relative;
  img {
    width: 100%;
    height: px2rem(200);
  }
  .swiper-pagination {
    bottom: 0px;
  }
}
</style>