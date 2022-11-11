<template>
  <div class="search-wrapper">
    <Layout>
      <div class="search-title">
        “
        <span class="search-key">{{ $route.query.key }}</span>
        ”相近搜索結果（<span class="search-total">{{ searchList.total }}</span
        >）
      </div>
      <div class="search-list">
        <div
          class="search-item"
          v-for="(item, index) in searchList.searchDataList"
          :key="index"
        >
          <a
            :href="item.detail.comicId"
            @click.prevent="onClickToDetail(item.detail.comicId)"
          >
            <img :src="item.imageUrl" alt="" />
          </a>
          <div class="item-title">{{ item.detail.title }}</div>
          <div class="chapter-wrapper">
            <span class="chapter-state">{{ item.detail.state }}</span>
            <a :href="item.detail.chapterId">{{ item.detail.text }}</a>
          </div>
        </div>
      </div>
      <pagePagination
        class="pagination"
        :count="searchList.total"
        :perCount="12"
        @pageTo="pageTo"
        @prev="prev"
        @next="next"
        v-if="searchList.total"
      />
    </Layout>
  </div>
</template>

<script>
import Layout from "../../components/PC/comment/layout.vue";
import pagePagination from "../../components/PC/comment/pagePagination";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "searchPage",
  components: {
    Layout,
    pagePagination,
  },
  computed: {
    ...mapGetters("search", ["searchList"]),
  },
  created() {
      this.setSearchList({
        title: this.$route.query.key,
        page: this.$route.query.page,
      });
  },
  methods: {
    ...mapActions("detail", ["setDetailData"]),
    ...mapActions("search", ["setSearchList"]),
    pageTo(page) {
      this.routeChange(page)
    },
    prev(page) {
      this.routeChange(page)
    },
    next(page) {
      this.routeChange(page)
    },
    async onClickToDetail(comicId) {
      await this.setDetailData(comicId);
      this.$router.push({
        path: "/detail",
        query: {
          comicId,
        },
      });
    },
    // 改变当前路由的query参数
    routeChange(page){
      const { ...query } = this.$route.query;
      query.page = page
      this.$router.replace({query})
    }
  },
  watch: {
    '$route.query.page': {
      handler(newVal) {
        this.setSearchList({ title: this.$route.query.key, page: newVal });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  .search-title {
    width: 1200px;
    height: 50px;
    line-height: 50px;
    // text-align: center;
    font-size: 20px;
    margin-top: 40px;
    .search-key {
      color: #fd113a;
    }
  }
  .search-list {
    width: 1200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .search-item {
      flex: 0 0 15%;
      width: 180px;
      height: 284px;
      // background-color: pink;
      margin-top: 20px;
      margin-left: 20px;
      img {
        width: 100%;
        height: 240px;
      }
      .item-title {
        font-size: 14px;
        font-weight: bold;
        margin-top: 7px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chapter-wrapper {
        font-size: 12px;
        margin-top: 4px;
        .chapter-state {
          min-width: 36px;
        }
        a {
          margin-left: 20px;
          color: #fd113a;
        }
      }
    }
  }
  .pagination {
    margin-top: 50px;
  }
}
</style>