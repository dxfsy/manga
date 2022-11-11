<template>
  <a
    :href="data.chapterId"
    class="chapter-item"
    @click.prevent="onClickToComic(data.chapterId)"
  >
    <div :href="data.chapterId" class="item-content">
      {{ data.chapterTitle }}
    </div>
  </a>
</template>

<script>
import { setLocalStorage } from "../../../utils/localStorage";
export default {
  name: "chapterItem",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onClickToComic(chapterId) {
      setLocalStorage(this.$route.query.comicId, {
        chapterId,
        title: this.data.chapterTitle,
        total: this.data.chapterTotal
      });
      let total = this.data.chapterTotal;
      let chapterName = this.data.chapterTitle;
      let comicId = this.$route.query.comicId;

      console.log(comicId, chapterId);
      this.$router.push({
        path: "/comic",
        query: {
          comicId,
          chapterId,
          page: 1,
          total,
          chapterName,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.chapter-item {
  width: 23.5%;
  height: 54px;
  background-color: pink;
  margin-left: 2%;
  margin-top: 2%;
  background-color: #f5f5f5;
  border-radius: 6px;
  text-align: center;
  line-height: 54px;
  font-size: 14px;
  box-sizing: border-box;
  padding: 0 10px;
  &:nth-child(4n + 1) {
    margin-left: 0;
  }
  .item-content {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>