<template>
  <div class="hot-manga-wrapper">
    <div class="title">热门漫画</div>
    <div class="manga-list">
      <div class="manga-item" v-for="(item, index) in curList" :key="index">
        <comicItem :data="item" />
      </div>
    </div>
    <div class="opera">
      <span class="more" @click="tabToLabel">
        <i class="fa fa-align-justify"></i>
        更多
      </span>
      <span class="blank"></span>
      <span class="next" @click="next">
        <i class="fa fa-refresh"></i>
        换一批
      </span>
    </div>
  </div>
</template>

<script>
import comicItem from "../comment/comicItem.vue";
export default {
  name: "hotManga",
  props: {
    hotData: {
      type: Array,
      required: true,
    },
  },
  components: {
    comicItem,
  },
  data() {
    return {
      list: [],
      curList: [],
      start: 0,
      end: 3,
    };
  },
  watch: {
    hotData: {
      immediate: true,
      handler(val) {
        val.forEach((item) => {
          item.info.forEach((subItem) => {
            this.list.push(subItem);
          });
        });
      },
    },
    start: {
      immediate: true,
      handler(val) {
        if (this.end > this.start)
          this.curList = this.list.slice(this.start, this.end);
        else {
          this.curList = [].concat(
            this.list.slice(this.start),
            this.list.slice(0, this.end)
          );
        }
      },
    },
  },
  methods: {
    next() {
      this.start =
        this.start + 3 > this.list.length
          ? this.start + 3 - this.list.length
          : this.start + 3;
      this.end =
        this.end + 3 > this.list.length
          ? this.end + 3 - this.list.length
          : this.end + 3;
    },
    tabToLabel() {
      this.$router.push({
        path: "/label",
        query: { type: "全部", status: "全部", sort: "人气" },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/px2rem.scss";
.hot-manga-wrapper {
  width: 90%;
  height: px2rem(280);
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
  .title {
    font-size: px2rem(24);
    font-weight: bold;
  }
  .manga-list {
    width: 100%;
    height: fit-content;
    display: flex;
    .manga-item {
      flex: 1;
      height: px2rem(210);
      box-sizing: border-box;
      padding: px2rem(5);
      margin-top: px2rem(5);
    }
  }
  .opera {
    font-size: px2rem(12);
    text-align: center;
    margin-top: px2rem(5);
    display: flex;
    justify-content: space-around;
    .more,
    .next {
      flex: 10;
      display: inline-block;
      height: px2rem(30);
      line-height: px2rem(30);
      border: 1px solid #ff4b2b;
      border-radius: px2rem(4);
      color: #ff4b2b;
      box-shadow: 1px 5px 7px -8px rgba(0, 0, 0);
    }
    .blank {
      flex: 1;
    }
  }
}
</style>