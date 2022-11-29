<template>
  <div class="hot-rank-wrapper">
    <div class="title">人气排行</div>
    <div class="manga-list">
      <div class="manga-item" v-for="(item, index) in list.slice(0,6)" :key="index">
        <comicItem :data="item" :height="height"/>
      </div>
    </div>
  </div>
</template>

<script>
import {px2rem} from '../../../utils/px2rem'
import comicItem from "../comment/comicItem.vue";
export default {
  name: "hotRank",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  components: {
    comicItem,
  },
  computed:{
    height(){
      return px2rem(100)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/px2rem.scss";
.hot-rank-wrapper {
  width: 90%;
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
      height: px2rem(150);
      box-sizing: border-box;
      padding: px2rem(5);
      margin-top: px2rem(5);
    }
  }
}
</style>