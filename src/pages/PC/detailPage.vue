<template>
  <div class="detail-wrapper">
    <Layout>
      <detailInfo
        v-if="detailInfo "
        :detailInfo="detailInfo"
        :chapterFirst="chapterFirst"
      />
      <chapterList v-if="chapterList" />
    </Layout>
  </div>
</template>

<script>
import Layout from "../../components/PC/comment/layout.vue";
import detailInfo from "../../components/PC/detail/detailInfo.vue";
import chapterList from "../../components/PC/detail/chapterList.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "detailPage",
  components: {
    Layout,
    detailInfo,
    chapterList,
  },
  computed: {
    ...mapGetters("detail", ["detailInfo", "chapterList"]),
  },
  data(){
    return {
      chapterFirst:null,
    }
  },
  methods: {
    ...mapActions("detail", ["setDetailData"]),
    async getDetailData(comicId) {
      await this.setDetailData(comicId);
    },
  },
  created() {
    if (!this.detailInfo) this.getDetailData(this.$route.query.comicId);
    this.chapterFirst = this.chapterList.chapterList[this.chapterList.chapterList.length - 1];
  },
};
</script>

<style>
</style>