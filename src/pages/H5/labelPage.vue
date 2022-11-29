<template>
  <Layout>
    <div class="label-wrapper">
      <labelView :labels="labelData" v-if="labelData" />
      <comscroll :upCallback="upCallback" :downCallback="downCallback">
        <labelList :list="listData" v-if="listData" class="label-list" />
      </comscroll>
    </div>
  </Layout>
</template>

<script>
import Layout from "../../components/H5/comment/Layout.vue";
import labelView from "../../components/H5/label/labelView.vue";
import labelList from "../../components/H5/label/labelList.vue";
import comscroll from "../../components/H5/comment/comscroll.vue";
import { labels, labelListData } from "../../api/comic";
export default {
  name: "labelPage",
  components: {
    Layout,
    labelView,
    labelList,
    comscroll,
  },
  data() {
    return {
      labelData: null,
      listData: null,
      page: 0,
      mescroll: null,
    };
  },
  methods: {
    async getLabels() {
      let res = await labels();
      this.labelData = res.data.data;
    },
    async getLabelList(mescroll, isUp) {
      let res = await labelListData({
        type: this.$route.query.type,
        state: this.$route.query.status,
        sort: this.$route.query.sort,
        page: this.page,
      });
      if (this.page == 1) this.listData = res.data.data;
      else {
        this.listData = this.listData.concat(res.data.data);
      }
      if (isUp) {
        mescroll.endSuccess(res.data.data.length);
      } else mescroll.resetUpScroll(); // 结束下拉刷新,无参
    },
    upCallback(page, mescroll) {
      if (!this.mescroll) this.mescroll = mescroll;
      this.page = page.num;
      this.getLabelList(mescroll, 1);
    },
    downCallback(mescroll) {
      this.listData = [];
      this.page = 1;
      this.getLabelList(mescroll, 0);
    },
  },
  watch: {
    $route() {
      this.mescroll.resetUpScroll();
    },
  },
  created() {
    this.getLabels();
  },
};
</script>

<style lang="scss" scoped>
</style>