<template>
  <div class="home-wrapper">
    <Layout>
      <!-- 标签栏 -->
      <fullLabel />
      <!-- banner栏 -->
      <bannerList :bannerList="banner" v-if="banner" />

      <!-- 人气推荐+热度排行 -->
      <hotRecommend
        :hotList="hotList"
        :hotRank="hotRank"
        v-if="hotList && hotRank"
      />

      <!-- 编辑推荐 -->
      <editCommend :editRecommend="editRecommend" v-if="editRecommend" />
      <!-- 上升最快 -->
      <rankSpeed :rankData="rankData" v-if="rankData"/>
      <!-- 热门分类 -->
      <hotCategory :category="categoryData" v-if="categoryData"/>
    </Layout>
  </div>
</template>

<script>
import fullLabel from "../../components/PC/home/fullLabel.vue";
import bannerList from "../../components/PC/home/bannerList.vue";
import hotRecommend from "../../components/PC/home/hotRecommend.vue";
import editCommend from "../../components/PC/home/editCommend.vue";
import rankSpeed from "../../components/PC/home/rankSpeed.vue";
import hotCategory from '../../components/PC/home/hotCategory.vue'
import Layout from "../../components/PC/comment/layout.vue";
import { homeList } from "../../api/comic";
export default {
  name: "homePage",
  components: {
    Layout,
    fullLabel,
    bannerList,
    hotRecommend,
    editCommend,
    rankSpeed,
    hotCategory,
  },
  data() {
    return {
      homeData: null,
    };
  },
  computed: {
    banner() {
      return this.homeData !== null ? this.homeData.banner : null;
    },
    hotList() {
      return this.homeData !== null ? this.homeData.hotRecommend : null;
    },
    hotRank() {
      return this.homeData !== null ? this.homeData.rank : null;
    },
    editRecommend() {
      return this.homeData !== null ? this.homeData.editRecommend : null;
    },
    rankData() {
      return this.homeData !== null ? this.homeData.rankSpeed : null;
    },
    categoryData(){
      return this.homeData !== null ? this.homeData.category : null;
    }
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
</style>