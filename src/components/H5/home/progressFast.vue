<template>
  <div class="progress-fast-wrapper">
    <div class="title">上升最快</div>
    <div class="manga-list">
      <div class="manga-item" v-for="(item, index) in list" :key="index">
        <comicItem :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import comicItem from "../comment/comicItem.vue";
export default {
    name:"progressFast",
    props: {
        list: {
            type:Array,
            required:true
        }
    },
    components: {
        comicItem
    }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/px2rem.scss";
.progress-fast-wrapper {
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
      height: px2rem(210);
      box-sizing: border-box;
      padding: px2rem(5);
      margin-top: px2rem(5);
    }
  }
}
</style>