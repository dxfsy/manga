<template>
  <div class="banner-wrapper">
    <div class="banner-left">
      <a
        :href="bannerList[0].comicId"
        @click.prevent="onClickToDetail(bannerList[0].comicId)"
      >
        <img :src="bannerList[0].src" />
      </a>
    </div>
    <div class="banner-right">
      <div class="banner-right-top">
        <a
          :href="bannerList[1].comicId"
          @click.prevent="onClickToDetail(bannerList[1].comicId)"
        >
          <img :src="bannerList[1].src" />
        </a>
      </div>
      <div class="banner-right-bottom">
        <div class="left">
          <a
            :href="bannerList[2].comicId"
            @click.prevent="onClickToDetail(bannerList[2].comicId)"
            ><img :src="bannerList[2].src" alt=""
          /></a>
        </div>
        <div class="right">
          <a
            :href="bannerList[3].comicId"
            @click.prevent="onClickToDetail(bannerList[3].comicId)"
            ><img :src="bannerList[3].src" alt=""
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bannerList",
  props: {
    bannerList: {
      type: Array,
      required: true,
    },
  },
  methods: {
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
img {
  border-radius: 7px;
}
.banner-wrapper {
  padding: 20px 0 60px 0;
  display: flex;
  width: 1200px;
  height: 360px;
  overflow: hidden;
  .banner-left {
    flex: 0 0 49%;
    // background-color: pink;
  }
  .banner-right {
    flex: 0 0 49%;
    margin-left: 2%;
    display: flex;
    flex-direction: column;
    .banner-right-top {
      flex: 0 0 49%;
      //   background-color: pink;
    }
    .banner-right-bottom {
      margin-top: 2%;
      flex: 0 0 49%;
      display: flex;
      .left {
        flex: 0 0 49%;
        img {
          width: 100%;
        }
      }
      .right {
        margin-left: 2%;
        flex: 0 0 49%;
      }
    }
  }
}
</style>