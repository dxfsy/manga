<template>
  <div class="search-wrapper">
    <div class="header-wrapper">
      <i class="fa fa-angle-left" @click="$router.go(-1)"></i>
      <div class="search-wrapper">
        <input
          type="text"
          placeholder="请输入关键词"
          v-model="key"
          @keyup.enter="searchComic"
        />
        <i class="fa fa-search"></i>
      </div>
      <div class="search-button" @click="searchComic">搜索</div>
    </div>
    <div class="search-list">
      <comscroll :upCallback="upCallback" :downCallback="downCallback">
        <labelList :list="list" v-if="list.length !== 0" />
        <img src="@/assets/null.png" alt="" class="not-found" v-else />
      </comscroll>
    </div>
  </div>
</template>

<script>
import comscroll from "../../components/H5/comment/comscroll.vue";
import labelList from "../../components/H5/label/labelList.vue";
import { searchList } from "../../api/comic";
import { px2rem } from "../../utils/px2rem";
export default {
  name: "searchPage",
  data() {
    return {
      key: "",
      list: [],
      mescorll: null,
    };
  },
  components: {
    comscroll,
    labelList,
  },
  methods: {
    searchComic() {
      if (this.$route.query.key !== this.key) {
        this.routeChange("title", this.key);
      }
      this.list = [];
      this.search();
    },
    async search() {
      if(this.$route.query.title == '') {
        this.$nextTick(()=> {
          this.mescorll.endSuccess(1)
        })
        return
      }
      let res = await searchList({
        title: this.$route.query.title,
        page: this.$route.query.page,
      });
      if (res.data.data.searchDataList !== undefined) {
        this.list = this.list.concat(res.data.data.searchDataList);
        this.mescorll.endSuccess(res.data.data.searchDataList.length);
      }else {
        this.mescorll.endSuccess(1)
      }
    },
    // 改变当前路由的query参数
    routeChange(key, val) {
      const { ...query } = this.$route.query;
      query[key] = val;
      this.$router.replace({ query });
    },
    async upCallback(page, mescorll) {
      this.routeChange("page", page.num);
      this.search();
      if (!this.mescorll) this.mescorll = mescorll;
    },
    downCallback(mescorll) {
      this.routeChange("page", 1);
      this.list = [];
      this.search();
      mescorll.resetUpScroll();
    },
  },
  created() {
    this.key = this.$route.query.title;
  },
  mounted() {
    let dom = document.querySelector(".mescroll");
    let top = px2rem(68) + "rem";
    let bottom = px2rem(10) + "rem";
    dom.setAttribute("style", `top:${top};bottom:${bottom}`);
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/px2rem.scss";
.search-wrapper {
  .header-wrapper {
    position: absolute;
    width: 100%;
    height: px2rem(50);
    line-height: px2rem(50);
    background-color: #222;
    font-size: px2rem(16);
    .fa-angle-left {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: px2rem(10);
      color: #fff;
      font-size: px2rem(24);
    }
    .search-wrapper {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: px2rem(200);
      height: px2rem(30);
      input {
        width: 100%;
        height: 100%;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        border-radius: px2rem(15);
        background-color: gray;
        color: #fff;
        &::placeholder {
          color: #ccc;
        }
      }
      i {
        position: absolute;
        right: px2rem(15);
        top: px2rem(17);
        color: #fff;
      }
    }
    .search-button {
      position: absolute;
      right: px2rem(20);
      top: 50%;
      transform: translateY(-50%);
      width: px2rem(50);
      height: px2rem(30);
      line-height: px2rem(30);
      color: #fff;
    }
  }
  .search-list {
    .not-found {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: px2rem(200);
    }
  }
}
</style>