<template>
  <Layout>
    <div class="home-wrapper">
      <headerBar />
      <bannerList :bannerList="banner" v-if="banner" />
      <scroll class="scroll-conatiner">
        <hotManga :hotData="hotData" v-if="hotData" />
        <editRecommend :editList="editRecommend" v-if="editRecommend" />
        <progressFast :list="rankSpeed" v-if="rankSpeed" />
        <hotRank :list="hotRank" v-if="hotRank" />
      </scroll>
    </div>
  </Layout>
</template>

<script>
import Layout from "../../components/H5/comment/Layout.vue";
import headerBar from "../../components/H5/home/headerBar.vue";
import bannerList from "../../components/H5/home/bannerList.vue";
import scroll from "../../components/H5/comment/scroll.vue";
import hotManga from "../../components/H5/home/hotManga.vue";
import editRecommend from "../../components/H5/home/editRecommend.vue";
import progressFast from "../../components/H5/home/progressFast.vue";
import hotRank from "../../components/H5/home/hotRank.vue";
import { homeList } from "../../api/comic";
export default {
  name: "homePage",
  components: {
    Layout,
    headerBar,
    bannerList,
    scroll,
    hotManga,
    editRecommend,
    progressFast,
    hotRank,
  },
  data() {
    return {
      homeData: null,
    };
  },
  computed: {
    // 轮播图数据
    banner() {
      return this.homeData !== null ? this.homeData.banner : null;
    },
    // 热度排行
    hotRank() {
      return this.homeData !== null ? this.homeData.rank : null;
    },
    // 编辑推荐
    editRecommend() {
      return this.homeData !== null ? this.homeData.editRecommend : null;
    },
    // 上升最快
    rankSpeed() {
      return this.homeData !== null ? this.homeData.rankSpeed : null;
    },
    // 热门漫画
    hotData() {
      return this.homeData !== null ? this.homeData.category : null;
    },
  },
  methods: {
    async getHomeList() {
      let homeData = await homeList();
      this.homeData = homeData.data.data;
    },
  },
  created() {
    this.getHomeList();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/px2rem.scss";
.home-wrapper {
  width: 100%;
  overflow: hidden;
}
</style>