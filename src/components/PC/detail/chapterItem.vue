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
import { getLocalStorage, setLocalStorage } from "../../../utils/localStorage";
import { getSessionStorage } from "@/utils/sessionStorage";
import { addHistory } from "../../../api/user";
import { mapGetters } from "vuex";
export default {
  name: "chapterItem",
  props: {
    data: {
      type: Object,
      required: true,
    },
    comicTitle: {
      type: String,
    },
    chapterLastest: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters('detail',['coverUrl'])
  },
  data() {
    return {};
  },
  methods: {
    async onClickToComic(chapterId) {
      let isLogin = getSessionStorage("isLogin");
      // 游客模式（用户没有登录，历史记录存在本地里）
      if (!isLogin) {
        setLocalStorage(this.$route.query.comicId, {
          chapterId,
          title: this.data.chapterTitle,
          total: this.data.chapterTotal,
        });
      } else {
        // 用户模式（已登录）
        let user = getLocalStorage("user") || getSessionStorage("user");
        let username = user.username;
        let res = await addHistory({
          username,
          comicId: this.$route.query.comicId,
          comicCover: this.coverUrl,
          comicTitle: this.comicTitle,
          chapterHistoryId: this.data.chapterId,
          chapterHistoryName: this.data.chapterTitle,
          chapterHistoryTotal: this.data.chapterTotal,
          chapterLastestId: this.chapterLastest.chapterId,
          chapterLastestName: this.chapterLastest.chapterTitle,
          chapterLastestTotal: this.chapterLastest.chapterTotal,
        });
        console.log(res);
      }

      // 跳转至漫画页
      let total = this.data.chapterTotal;
      let chapterName = this.data.chapterTitle;
      let comicId = this.$route.query.comicId;
      console.log(comicId, chapterId);
      this.$router.push({
        path: "/comic",
        query: {
          comicId,
          comicTitle: this.comicTitle,
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