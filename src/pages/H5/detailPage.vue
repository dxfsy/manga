<template>
  <div class="detail-wrapper">
    <!-- 漫画信息 -->
    <div
      class="detail-info"
      :style="{
        background: `url(${detailInfo.coverUrl})`,
        backgroundSize: 'cover',
      }"
    >
      <div class="background-mask">
        <i class="fa fa-angle-left" @click="$router.go(-1)"></i>
        <div class="comic-name">{{ detailInfo.comicName }}</div>
        <div class="comic-other">
          <div class="left">
            <img :src="detailInfo.coverUrl" />
          </div>
          <div class="right">
            <div class="author">
              <span class="gray">作者：</span>
              <span @click="tabToSearch(detailInfo.author)">{{
                detailInfo.author
              }}</span>
            </div>
            <div class="status">
              <span class="gray">状态：</span>{{ detailInfo.status }}
            </div>
            <div class="label">
              <span class="gray">题材：</span>
              <span v-for="(item, index) in detailInfo.label" :key="index">
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 漫画简介 -->
    <div class="summary">
      <div class="btns">
        <span class="read-btn" @click="tabToComic">
          {{ historyTitle }}
          <i class="fa fa-book"></i>
        </span>
        <span class="collect" @click="collectComic">
          收藏
          <i class="fa fa-heart-o" v-if="!isCollect"></i>
          <i class="fa fa-heart" style="color: #ff494f" v-else></i>
        </span>
      </div>
      <div class="title">简介</div>
      <div class="content">
        &nbsp;&nbsp;&nbsp;&nbsp;{{ detailInfo.content }}
      </div>
    </div>
    <!-- 漫画章节 -->
    <div class="chapter-list">
      <div
        class="chapter-item"
        v-for="(item, index) in list"
        :key="index"
        @click="tabToComic(item)"
      >
        {{ item.chapterTitle }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  isLogin,
  getComicHistory,
  getComicCollect,
  updateCollect,
} from "../../api/user";
import { mapGetters } from "vuex";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import { getSessionStorage } from "../../utils/sessionStorage";
import { addHistory } from "../../api/user";
export default {
  name: "detailPage",
  data() {
    return {
      historyChapter: null,
      isCollect: 0,
      list: [],
    };
  },
  computed: {
    ...mapGetters("detail", ["detailInfo", "chapterList"]),
    historyTitle() {
      if (this.historyChapter) {
        if (this.historyChapter.title)
          return "续看：" + this.historyChapter.title;
        else return "尚未观看";
      } else {
        return "尚未观看";
      }
    },
  },
  methods: {
    // 更新收藏状态
    async collectComic() {
      let user = getLocalStorage("user") || getSessionStorage("user");
      if (this.chapterLastest !== null) {
        let res = await updateCollect({
          username: user.username,
          comicId: this.$route.query.comicId,
          comicCover: this.detailInfo.coverUrl,
          comicTitle: this.detailInfo.comicName,
          chapterLastestId: this.list[this.list.length - 1].chapterId,
          chapterLastestTitle: this.list[this.list.length - 1].chapterTitle,
          chapterLastestTotal: this.list[this.list.length - 1].chapterTotal,
          isCollect: this.isCollect == 0 ? 1 : 0,
        });
        if ((res.data.data.code = 200)) {
          this.isCollect = this.isCollect == 0 ? 1 : 0;
        }
      }
    },
    // 检查登录状态
    async checkLoginStatus() {
      let user = getLocalStorage("user") || getSessionStorage("user");
      if (user) {
        let res = await isLogin({ username: user.username });
        return res.data.data.code;
      }
    },
    // 获取收藏状态
    async getCollectStatus() {
      let user = getLocalStorage("user") || getSessionStorage("user");
      getComicCollect({
        username: user.username,
        comicId: this.$route.query.comicId,
      }).then((res) => {
        if (res.data.data.isCollect) {
          this.isCollect = res.data.data.isCollect;
        }
      });
    },
    // 获取该漫画历史信息
    async getHistoryInfo() {
      let user = getLocalStorage("user") || getSessionStorage("user");
      let isLogin = getSessionStorage("isLogin");
      // 游客获取历史
      if (user && isLogin) {
        // 发送“查询该漫画历史”的请求
        let res = await getComicHistory({
          username: user.username,
          comicId: this.$route.query.comicId,
        });
        if (res.data.data.history) {
          let { chapterHistoryId, chapterHistoryName, chapterHistoryTotal } =
            res.data.data.history;
          this.historyChapter = {
            chapterId: chapterHistoryId,
            title: chapterHistoryName,
            total: chapterHistoryTotal,
          };
        }
      } else {
        // 用户获取历史
        this.historyChapter = getLocalStorage(this.$route.query.comicId);
      }
    },
    // 跳转至漫画页
    async tabToComic(chapterInfo) {
      this.saveHistory(chapterInfo);
      console.log(chapterInfo);
      this.$router.push({
        path: "/comic",
        query: {
          comicId: this.$route.query.comicId,
          comicTitle: this.detailInfo.comicName,
          chapterId: chapterInfo.chapterId,
          page: 1,
          total: chapterInfo.chapterTotal,
          chapterName: chapterInfo.chapterTitle,
        },
      });
      // chapterTotal
    },
    // 保存历史记录
    async saveHistory(item) {
      let isLogin = getSessionStorage("isLogin");
      // 游客模式（用户没有登录，历史记录存在本地里）
      if (!isLogin) {
        setLocalStorage(this.$route.query.comicId, {
          chapterId: item.chapterId,
          title: item.chapterTitle,
          total: item.chapterTotal,
        });
      } else {
        // 用户模式（已登录../..
        let user = getLocalStorage("user") || getSessionStorage("user");
        let username = user.username;
        let res = await addHistory({
          username,
          comicId: this.$route.query.comicId,
          comicCover: this.detailInfo.coverUrl,
          comicTitle: this.detailInfo.comicName,
          chapterHistoryId: item.chapterId,
          chapterHistoryName: item.chapterTitle,
          chapterHistoryTotal: item.chapterTotal,
          chapterLastestId: this.list[this.list.length - 1].chapterId,
          chapterLastestName: this.list[this.list.length - 1].chapterTitle,
          chapterLastestTotal: this.list[this.list.length - 1].chapterTotal,
        });
        console.log(res);
      }
    },
    // 跳转至搜索页
    tabToSearch(key) {
      this.$router.push({
        path: "/search",
        query: {
          title: key,
          page: 1,
        },
      });
    },
  },
  watch: {
    chapterList: {
      immediate: true,
      handler(val) {
        let temp = this._.cloneDeep(val);
        this.list = temp.chapterList.reverse();
      },
    },
  },
  created() {
    // 获取历史信息
    this.checkLoginStatus().then((res) => {
      if (res == 200) {
        // 表示已经登录
        this.getHistoryInfo();
        this.getCollectStatus();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/px2rem.scss";
.detail-wrapper {
  .detail-info {
    position: relative;
    width: 100%;
    height: px2rem(250);
    font-size: px2rem(20);
    color: #fff;
    .background-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      .fa-angle-left {
        position: absolute;
        left: px2rem(10);
        top: px2rem(5);
      }
      .comic-name {
        position: absolute;
        width: 80%;
        text-align: center;
        left: 50%;
        top: px2rem(20);
        transform: translateX(-50%);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .comic-other {
        position: absolute;
        top: px2rem(50);
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: px2rem(200);
        padding: px2rem(15) 0;
        box-sizing: border-box;
        // background-color: pink;
        display: flex;
        .left {
          width: px2rem(120);
          height: px2rem(170);
          // background-color: #ccc;
          img {
            width: 100%;
          }
        }
        .right {
          width: 55%;
          margin-left: px2rem(10);
          // background-color: #ccc;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          font-size: px2rem(14);
          .gray {
            color: #a0a0a0;
          }
        }
      }
    }
  }
  background-color: #f4f0f0;
  min-height: 100vh;
  .summary {
    font-size: px2rem(14);
    padding: 0 px2rem(15);
    padding-bottom: px2rem(10);
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    .btns {
      margin-top: px2rem(5);
      display: flex;
      align-items: center;
      .read-btn {
        position: relative;
        max-width: 40%;
        height: px2rem(40);
        line-height: px2rem(40);
        background-color: #ff494f;
        color: #fff;
        padding: 0 px2rem(15) 0 px2rem(30);
        border-radius: px2rem(20);
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        i {
          position: absolute;
          left: px2rem(12);
          top: px2rem(13);
        }
      }
      .collect {
        position: relative;
        width: 25%;
        height: px2rem(40);
        line-height: px2rem(40);
        text-align: center;
        border: 1px solid #ccc;
        border-radius: px2rem(20);
        margin-left: px2rem(30);
        i {
          position: absolute;
          left: px2rem(13);
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .title {
      font-weight: bold;
      margin-left: px2rem(10);
      margin-top: px2rem(10);
    }
    .content {
      margin-top: px2rem(7);
    }
  }
  .chapter-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .chapter-item {
      width: 30%;
      height: px2rem(40);
      line-height: px2rem(40);
      text-align: center;
      font-size: px2rem(14);
      background-color: #fff;
      margin-top: px2rem(10);
      margin-left: px2rem(5);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      border-radius: px2rem(15);
      padding: 0 px2rem(5);
      box-sizing: border-box;
    }
  }
}
</style>