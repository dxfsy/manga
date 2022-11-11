<template>
  <div class="label-list-wrapper">
    <div class="list-item" v-for="(item, index) in list" :key="index">
      <img :src="item.imageUrl" alt="" @click="onClickToDetail(item.comicId)"/>
      <div class="item-title">{{ item.title }}</div>
      <div class="item-chapter">
        <span class="chapter-status">{{ item.state }}</span>
        <span class="chapter-name">{{ item.chapterTitle }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "labelList",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions("detail", ["setDetailData"]),
    async onClickToDetail(comicId) {
      await this.setDetailData(comicId);
      this.$router.push({
        path: "/detail",
        query: {
          comicId,
        },
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.label-list-wrapper {
  width: 1200px;
  height: fit-content;
  // background-color: #ccc;
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  padding: 30px 40px;
  .list-item {
    flex: 0 0 180px;
    height: 284px;
    margin: 20px 1% 20px 0;
    img {
      width: 180px;
      height: 240px;
      cursor: pointer;
    }
    .item-title {
      width: 180px;
      color: #262626;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
      font-size: 15px;
    }
    .item-chapter {
      position: relative;
      width: 180px;
      height: 18px;
      font-size: 12px;
      margin-top: 5px;
      .chapter-status {
        color: #fd113a;
      }
      .chapter-name {
        position: absolute;
        left: 40px;
        display: inline-block;
        width: 130px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>