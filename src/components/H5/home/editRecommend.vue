<template>
  <div class="edit-recommend-wrapper">
    <div class="title">编辑推荐</div>
    <div class="manga-list">
      <div class="manga-item" v-for="(item, index) in curList" :key="index">
        <comicItem :data="item" />
      </div>
    </div>
    <div class="opera">
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
  name: "editRecommend",
  props: {
    editList: {
      type: Array,
      required: true,
    },
  },
  components: {
    comicItem,
  },
  data() {
    return {
      curList: [],
      start: 0,
      end: 6,
    };
  },
  methods: {
    next() {
      this.start =
        this.start + 6 > this.editList.length
          ? this.start + 6 - this.editList.length
          : this.start + 6;
      this.end =
        this.end + 6 > this.editList.length
          ? this.end + 6 - this.editList.length
          : this.end + 6;
    },
  },
  watch: {
    start: {
      immediate: true,
      handler(val) {
        if (this.end > this.start)
          this.curList = this.editList.slice(this.start, this.end);
        else {
            console.log(this.editList.slice(this.start),
            this.editList.slice(0, this.end));
          this.curList = [].concat(
            this.editList.slice(this.start),
            this.editList.slice(0, this.end)
          );
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/px2rem.scss";
.edit-recommend-wrapper {
  width: 90%;
  // height: px2rem(280);
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
    flex-wrap: wrap;
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
    // margin-top: px2rem(5);
    display: flex;
    justify-content: space-around;
    .next {
      flex: 10;
      display: inline-block;
      height: px2rem(30);
      line-height: px2rem(30);
      border: 1px solid #ff4b2b;
      border-radius: px2rem(4);
      color: #ff4b2b;
      box-shadow: 1px 5px 7px -8px rgba(0, 0, 0);
      margin-top: px2rem(10);
    }
    .blank {
      flex: 1;
    }
  }
}
</style>