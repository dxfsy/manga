<template>
  <div class="detail-info-wrapper" v-if="detailInfo">
    <div class="info-up">
      <img :src="detailInfo.coverUrl" alt="" />
      <div class="comic-info">
        <p class="comic-title">{{ detailInfo.comicName }}</p>
        <div class="comic-other">
          <span class="comic-author"
            >作者：<a href="" @click.prevent="tabToSearch(detailInfo.author)">{{
              detailInfo.author
            }}</a></span
          >
          <span class="comic-state">状态：{{ detailInfo.status }}</span>
          <span class="comic-labels"
            >题材：
            <span
              class="comic-label"
              v-for="(item, index) in detailInfo.label"
              :key="index"
              >{{ item }}</span
            >
          </span>
        </div>
      </div>
    </div>
    <div class="info-bottom">
      <p class="info-content">{{ detailInfo.content }}</p>
      <div class="btns">
        <span class="read-btn" @click="toComic">
          续看：{{ title }}
          <i class="fa fa-book"></i>
        </span>
        <span class="collect" @click="collect">
          收藏
          <i class="fa fa-heart-o" v-if="!isCollect"></i>
          <i class="fa fa-heart" style="color:#ff494f" v-else></i>
        </span>
      </div>
    </div>
    <div class="info-background"></div>
  </div>
</template>

<script>
import { getSessionStorage } from "@/utils/sessionStorage";
// import { mapGetters } from "vuex";
import { getLocalStorage } from "../../../utils/localStorage";
import { getComicHistory,updateCollect,getComicCollect } from "../../../api/user";
export default {
  name: "detailInfo",
  props: {
    detailInfo: {
      type: Object,
      required: true,
    },
    chapterFirst: {
      type: Object,
      default: function () {
        return {
          chapterTitle: "暂无章节",
          chapterTotal: 0,
          chapterId: "",
        };
      },
    },
    chapterLastest: {
      type:Object,
      default:null,
    }
  },
  data() {
    return {
      historyChapter: null,
      isCollect: 0,
    };
  },
  computed: {
    title() {
      if (this.historyChapter !== null) return this.historyChapter.title;
      else return this.chapterFirst.chapterTitle;
    },
    total() {
      if (this.historyChapter !== null) return this.historyChapter.total;
      else return Number(this.chapterFirst.chapterTotal);
    },
    chapterId() {
      if (this.historyChapter !== null) return this.historyChapter.chapterId;
      else return this.chapterFirst.chapterId;
    },
  },
  created() {
    let isLogin = getSessionStorage("isLogin");
    if (isLogin) {
      let user = getLocalStorage('user') || getSessionStorage('user')
      getComicHistory({username:user.username,comicId:this.$route.query.comicId}).then(res=> {
        if(res.data.data.history) {
          let {chapterHistoryId,chapterHistoryName,chapterHistoryTotal} = res.data.data.history
          this.historyChapter = {
            chapterId:chapterHistoryId,
            title:chapterHistoryName,
            total:chapterHistoryTotal
          }
        }
      })
      getComicCollect({username:user.username,comicId:this.$route.query.comicId}).then(res=>{
        if(res.data.data.isCollect) {
          this.isCollect = res.data.data.isCollect
        }
      })
    } else {
      this.historyChapter = getLocalStorage(this.$route.query.comicId);
    }
  },
  methods: {
    // 跳转漫画页
    toComic() {
      let total = this.total;
      let chapterName = this.title;
      let chapterId = this.chapterId;
      let comicId = this.$route.query.comicId;

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
    // 跳转搜索页
    tabToSearch(key) {
      this.$router.push({
        path: "/search",
        query: {
          key,
          page: 1,
        },
      });
    },
    // 收藏
    async collect(){
      let isLogin = getSessionStorage('isLogin')
      if(!isLogin) {
        this.$router.push({
          path:'/login'
        })
      }else {
        let user = getLocalStorage('user') || getSessionStorage('user')
        if(this.chapterLastest!==null) {
          let res = await updateCollect({
            username: user.username,
            comicId: this.$route.query.comicId,
            comicTitle: this.detailInfo.comicName,
            chapterLastestId: this.chapterLastest.chapterId,
            chapterLastestTitle: this.chapterLastest.chapterTitle,
            chapterLastestTotal: this.chapterLastest.chapterTotal,
            isCollect: this.isCollect == 0 ? 1 : 0
          })
          if(res.data.data.code=200) {
            this.isCollect = this.isCollect == 0 ? 1 : 0 
          }
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.detail-info-wrapper {
  width: 100%;
  height: 420px;
  //   background-color: #ccc;
  overflow: hidden;
  // background-color: #222;
  margin-bottom: 60px;
  .info-up {
    position: relative;
    width: 100%;
    height: 200px;
    padding-top: 50px;
    // background-color: pink;
    img {
      position: absolute;
      left: 0;
      top: 92px;
      width: 240px;
      height: 322px;
      border-radius: 6px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 30%);
    }
    .comic-info {
      padding-left: 270px;
      height: 200px;
      //   width: 100%;
    }
    .comic-title {
      font-size: 30px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 38px;
      padding-top: 64px;
    }
    .comic-other {
      height: 40px;
      padding-top: 30px;
      font-size: 14px;
      color: #a0a0a0;
      .comic-author {
        a {
          color: #fff;
        }
      }
      .comic-state {
        margin-left: 100px;
      }
      .comic-labels {
        margin-left: 100px;
        .comic-label {
          margin-right: 10px;
        }
      }
    }
  }
  .info-bottom {
    height: 150px;
    margin-top: 20px;
    // background-color: pink;
    padding-left: 270px;
    overflow: hidden;
    .info-content {
      width: 100%;
      height: fit-content;
      font-size: 14px;
      line-height: 20px;
      color: #595959;
      margin-top: 20px;
      // 多行省略
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      white-space: normal;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .btns {
      position: relative;
      width: 100%;
      height: 50px;
      // background-color: #ccc;
      margin-top: 20px;
      .read-btn {
        position: relative;
        display: inline-block;

        height: 40px;
        border-radius: 20px;
        background-color: #ff494f;
        color: #fff;
        font-size: 14px;
        box-sizing: border-box;
        text-align: center;
        line-height: 40px;
        padding-left: 40px;
        cursor: pointer;
        i {
          position: absolute;
          top: 12px;
          left: 20px;
          font-size: 16px;
        }
      }
      .collect {
        position: relative;
        display: inline-block;
        margin-left: 20px;
        width: 100px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #595959;
        border-radius: 20px;
        border: 1px solid #ccc;
        padding-left: 43px;
        box-sizing: border-box;
        cursor: pointer;
        i {
          position: absolute;
          top: 12px;
          left: 24px;
          font-size: 16px;
        }
      }
    }
  }
  .info-background {
    position: absolute;
    top: 61px;
    z-index: -1;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 0%;
    height: 250px;
    background-color: #222;
  }
}
</style>