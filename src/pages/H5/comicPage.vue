<template>
  <div class="comic-wrapper">
    <div class="comic-top">
      <div class="comic-title">
        <i class="fa fa-angle-left" @click="back"></i>
        {{ $route.query.chapterName }}
      </div>
    </div>
    <div class="comic-content">
      <img
        class="content"
        :src="imageUrl"
        alt=""
        v-if="imageUrl"
        @click.prevent="next"
      />
      <div class="loading-wrapper" v-else>
        <img class="loading" src="../../assets/loading.gif" alt="" />
      </div>
    </div>
    <div class="comic-bottom">
      <div class="comic-page-change">
        <span
          class="back-to-first fa fa-angle-double-left"
          @click="backToFirst"
        ></span>
        <span class="prev fa fa-angle-left" @click="prev"></span>
        <span class="currentPage">
          {{ $route.query.page }}-{{ $route.query.total }}
        </span>
        <span class="next fa fa-angle-right" @click="next"></span>
        <span class="go-last fa fa-angle-double-right" @click="goToNext"></span>
      </div>
    </div>
    <toast ref="toast" :text="toastText" />
  </div>
</template>

<script>
import toast from "../../components/H5/comment/toast.vue";
import { chapterList, getComic } from "../../api/comic";
import { addHistory } from "../../api/user";
import { mapGetters } from "vuex";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import { getSessionStorage } from "../../utils/sessionStorage";
export default {
  name: "comicPage",
  components: {
    toast,
  },
  computed: {
    ...mapGetters("detail", ["coverUrl"]),
  },
  data() {
    return {
      currentPage: 1,
      imageUrl: null,
      // "http://192.168.43.68:8081/image/detailPage/1032bz/m102969/33.jpg",
      toasts: null,
      toastText: "",
      chapterList: [],
    };
  },
  methods: {
    async getComicData() {
      let res = await getComic({
        comicId: this.$route.query.comicId,
        chapterId: this.$route.query.chapterId,
        page: parseInt(this.$route.query.page),
      });
      this.imageUrl = res.data.data.imageUrl;
    },
    async getChapterList() {
      let res = await chapterList({
        comicId: this.$route.query.comicId,
      });
      this.chapterList = res.data.data.chapterList;
    },
    async saveHistory(index) {
      let isLogin = getSessionStorage("isLogin");
      // 游客模式（用户没有登录，历史记录存在本地里）
      if (!isLogin) {
        setLocalStorage(this.$route.query.comicId, {
          chapterId: this.chapterList[index].chapterId,
          title: this.chapterList[index].chapterTitle,
          total: this.chapterList[index].chapterTotal,
        });
      } else {
        // 用户模式（已登录../..
        let user = getLocalStorage("user") || getSessionStorage("user");
        let username = user.username;
        let res = await addHistory({
          username,
          comicId: this.$route.query.comicId,
          comicCover: this.coverUrl,
          comicTitle: this.$route.query.comicTitle,
          chapterHistoryId: this.chapterList[index].chapterId,
          chapterHistoryName: this.chapterList[index].chapterTitle,
          chapterHistoryTotal: this.chapterList[index].chapterTotal,
          chapterLastestId: this.chapterList[0].chapterId,
          chapterLastestName: this.chapterList[0].chapterTitle,
          chapterLastestTotal: this.chapterList[0].chapterTotal,
        });
        console.log(res);
      }
    },
    // 跳转至第一页或上一章节
    backToFirst: _.throttle(
      function (e) {
        if (parseInt(this.$route.query.page) === 1) {
          let i;
          for (i = this.chapterList.length - 1; i >= 0; i--) {
            if (this.chapterList[i].chapterId == this.$route.query.chapterId)
              break;
          }
          if (i == this.chapterList.length - 1)
            this.showToast("当前漫画已无上一话");
          // 上一话的chapterId
          else {
            let prevPageChapterId = this.chapterList[i + 1].chapterId;
            // console.log('上一话Id',prevPageChapterId);
            this.saveHistory(i + 1);
            this.imageUrl = null;
            this.routeChange("chapterId", prevPageChapterId);
            this.routeChange("page", 1);
            this.routeChange(
              "chapterName",
              this.chapterList[i + 1].chapterTitle
            );
            this.routeChange("total", this.chapterList[i + 1].chapterTotal);
          }
        } else {
          this.imageUrl = null;
          this.routeChange("page", 1);
        }
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    ),
    // 上一页
    prev: _.throttle(
      function (e) {
        if (parseInt(this.$route.query.page) !== 1) {
          this.imageUrl = null;
          this.routeChange("page", parseInt(this.$route.query.page) - 1);
        } else {
          this.showToast("已经是第一页了捏~");
        }
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    ),
    // 下一页
    next: _.throttle(
      function (e) {
        if (
          parseInt(this.$route.query.page) !== parseInt(this.$route.query.total)
        ) {
          this.imageUrl = null;
          this.routeChange("page", parseInt(this.$route.query.page) + 1);
        } else {
          this.showToast("当前章节已读完");
        }
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    ),
    // 返回
    back() {
      this.$router.go(-1);
    },
    showToast(text) {
      this.toastText = text;
      this.toasts.show();
      setTimeout(() => {
        this.toasts.hide();
      }, 2000);
    },
    // 改变当前路由的query参数
    routeChange(key, val) {
      const { ...query } = this.$route.query;
      query[key] = val;
      this.$router.replace({ query });
    },
    // 跳转至最后一张或下一章节
    goToNext: _.throttle(
      function (e) {
        if (
          parseInt(this.$route.query.page) == parseInt(this.$route.query.total)
        ) {
          console.log("最后一张");
          let i;
          for (i = this.chapterList.length - 1; i >= 0; i--) {
            if (this.chapterList[i].chapterId == this.$route.query.chapterId)
              break;
          }
          if (i == 0) this.showToast("当前漫画已是最新话");
          // 下一话的chapterId
          else {
            let nextPageChapterId = this.chapterList[i - 1].chapterId;
            // console.log('下一话Id',nextPageChapterId);
            this.saveHistory(i - 1);
            this.imageUrl = null;
            this.routeChange("chapterId", nextPageChapterId);
            this.routeChange("page", 1);
            this.routeChange(
              "chapterName",
              this.chapterList[i - 1].chapterTitle
            );
            this.routeChange("total", this.chapterList[i - 1].chapterTotal);
          }
        } else {
          (this.imageUrl = null),
            this.routeChange("page", this.$route.query.total);
        }
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    ),
  },
  watch: {
    "$route.query.page": {
      immediate: true,
      handler(newVal, oldVal) {
        this.getComicData(newVal);
      },
    },
    "$route.query.chapterId": {
      immediate: true,
      handler(newVal, oldVal) {
        this.getComicData(newVal);
      },
    },
  },
  created() {
    this.getChapterList();
  },
  mounted() {
    this.toasts = this.$refs.toast;
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/px2rem.scss";
.comic-wrapper {
  min-height: 100vh;
  background-color: #272727;
  .comic-top {
    width: 100%;
    height: px2rem(76);
    background-color: #1e1e1e;
    .comic-title {
      position: relative;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      color: #fff;
      font-size: px2rem(16);
      line-height: px2rem(76);
      letter-spacing: px2rem(2);
      padding-left: px2rem(30);
      box-sizing: border-box;
      i {
        position: absolute;
        top: px2rem(25);
        left: px2rem(10);
        color: #fff;
        font-size: px2rem(24);
        cursor: pointer;
      }
    }
  }
  .comic-content {
    position: relative;
    // max-height: 60vh;
    width: 100%;
    margin: 0 auto;
    background-color: #272727;
    text-align: center;
    .content {
      width: 100%;
      box-sizing: border-box;
      cursor: pointer;
    }
    .loading-wrapper {
      height: 90vh;
      .loading {
        width: px2rem(20);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .comic-bottom {
    width: 100%;
    height: 10vh;
    background-color: #272727;
    margin-bottom: px2rem(53);
    .comic-page-change {
      width: 100%;
      height: px2rem(76);
      margin: 0 auto;
      // background-color: pink;
      text-align: center;
      line-height: px2rem(76);
      color: #999;
      span {
        margin-left: px2rem(20);
        font-size: px2rem(16);
        &.fa {
          cursor: pointer;
          font-size: px2rem(22);
          font-weight: bold;
        }
      }
    }
  }
}
</style>