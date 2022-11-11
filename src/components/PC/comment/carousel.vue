<template>
  <div class="carousel-wrapper">
    <!-- 上一页 -->
    <div class="slide-btn prev-slide fa fa-angle-left" @click="prev"></div>
    <div class="carousel-list" v-if="carouselList.length !== 0">
      <!-- carousel列表 -->
      <transition-group name="slide" tag="div">
        <div
          class="carousel-item"
          v-for="(item, index) in carouselData"
          :key="item.id"
          :style="`width:${carouselList[index].width}px;height:${carouselList[index].height}px;zIndex:${carouselList[index].z_index};left:${carouselList[index].left}px;top:${carouselList[index].top}px;opacity:${carouselList[index].opacity}`"
          v-show="index < 3"
        >
          <a
            :href="item.comicId"
            @click.prevent="onClickToDetail(item.comicId)"
          >
            <img :src="item.imageUrl" :alt="item.title"
          /></a>
        </div>
      </transition-group>
    </div>

    <!-- 下一页 -->
    <div class="slide-btn next-slide fa fa-angle-right" @click="next"></div>
  </div>
</template>

<script>
export default {
  name: "carousel",
  data() {
    return {
      carouselList: [],
      carouselData: [],
    };
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  watch: {
    list: {
      immediate: true,
      handler(newVal, oldVal) {
        this.carouselData = this._.cloneDeep(newVal);
        this.carouselData.forEach((item, index) => {
          item.id = index + 1;
        });
        let z_index = 2;
        let width = 190;
        let height = 250;
        let left = 0;
        let top = 0;
        let opacity = 1;
        for (let i = 0; i < newVal.length; i++) {
          this.carouselList.push({
            z_index,
            width,
            height,
            left,
            top,
            opacity,
          });
          if (i == 1) opacity = 0.4;
          if (z_index !== 0) z_index -= 1;
          width *= 0.9;
          height *= 0.9;
          left += 50;
          top += 15;
        }
        // console.log(this.carouselList);
      },
    },
  },
  methods: {
    prev: _.throttle(
      function () {
        this.carouselData.unshift(this.carouselData.pop());
        let obj = this._.cloneDeep(this.carouselData[0]);
        this.$emit("prev", obj);
      },
      800,
      {
        leading: true,
        trailing: false,
      }
    ),
    next: _.throttle(
      function () {
        this.carouselData.push(this.carouselData.shift());
        let obj = this._.cloneDeep(this.carouselData[0]);
        this.$emit("next", obj);
      },
      800,
      {
        leading: true,
        trailing: false,
      }
    ),
    async onClickToDetail(comicId) {
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
@import "../../../assets/styles/transition.scss";
.carousel-wrapper {
  position: relative;
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
  .carousel-list {
    position: relative;
    width: 240px;
    height: 255px;
    background-color: #fff;
    overflow: hidden;
    .carousel-item {
      position: absolute;
      top: 0;
      left: 10px;
      transition: all .8s;
      img {
        width: 100%;
        border-radius: 1%;
      }
    }
  }
}
</style>