<template>
  <div class="label-wrapper">
    <Layout>
      <labelView
        :labelData="labelData"
        v-if="labelData"
        @onType="onType"
        @onStatus="onStatus"
        @onSort="onSort"
      />
      <labelList :list="listData" />
      <pagePagination
        class="pagination"
        :count="16236"
        :perCount="12"
        @pageTo="handlePage"
        @prev="handlePage"
        @next="handlePage"
      />
    </Layout>
  </div>
</template>

<script>
import Layout from "../../components/PC/comment/layout.vue";
import labelView from "../../components/PC/label/labelView.vue";
import labelList from "../../components/PC/label/labelList.vue";
import pagePagination from "../../components/PC/comment/pagePagination.vue";
import { labels, labelListData } from "../../api/comic";
export default {
  name: "labelPage",
  components: {
    Layout,
    labelView,
    labelList,
    pagePagination,
  },
  data() {
    return {
      labelData: null,
      listData: [],
    };
  },
  methods: {
    async getLabels() {
      let res = await labels();
      this.labelData = res.data.data;
    },
    async getLabelList() {
      let res = await labelListData({
        type: this.$route.query.labelName,
        state: this.$route.query.status,
        sort: this.$route.query.sort,
        page: this.$route.query.page,
      });
      this.listData = res.data.data;
    },
    onType(type) {
      this.routeQueryChange("labelName", type);
    },
    onStatus(status) {
      this.routeQueryChange("status", status);
    },
    onSort(sort) {
      this.routeQueryChange("sort", sort);
    },
    routeQueryChange(key, value) {
      const { ...query } = this.$route.query;
      query[key] = value;
      this.$router.replace({ query });
    },
    handlePage(page) {
      this.routeQueryChange("page", page);
    },
  },
  created() {
    this.getLabels();
    this.getLabelList();
  },
  watch: {
    $route() {
      this.getLabelList();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>