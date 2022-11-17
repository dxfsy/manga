<template>
  <centerLayout>
    <bookmarkTopBar
      pageName="历史"
      :count="count"
      :length="list.length"
      @search="search"
      @complete="complete"
      @edit="edit"
      @check="check"
      @remove="remove"
    ></bookmarkTopBar>
    <div class="collect-wrapper">
      <div class="collect-list">
        <div class="collect-item" v-for="(item, index) in list" :key="index">
          <img :src="item.comicCover" alt="" @click="toDetail(item.comicId)" />
          <div
            class="img-mask"
            v-show="isEdit"
            @click="addSelect(item.comicId)"
          >
            <i
              class="fa fa-circle-thin"
              v-if="selectList.indexOf(item.comicId) == -1"
            ></i>
            <i class="fa fa-check-circle" v-else></i>
          </div>
          <div class="title">{{ item.comicTitle }}</div>
          <div
            class="progress"
            v-if="item.chapterHistoryId !== null"
            @click="
              toComic(
                item.chapterHistoryTotal,
                item.chapterHistoryName,
                item.chapterHistoryId,
                item.comicId,
                item.comicTitle
              )
            "
          >
            读至 {{ item.chapterHistoryName }}
          </div>
          <div class="progress" v-else>尚未观看</div>
          <div class="lastest">
            最新
            <span>{{ item.chapterLastestName }}</span>
          </div>
        </div>
      </div>
    </div>
    <toast ref="toasts" :text="toastText"></toast>
  </centerLayout>
</template>

<script>
import centerLayout from "../../components/PC/comment/centerLayout.vue";
import bookmarkTopBar from "../../components/PC/comment/bookmarkTopBar.vue";
import toast from "../../components/PC/comment/toast.vue";
import {
  getHistoryList,
  getHistorySearchList,
  removeHistory
} from "../../api/user";
import { getSessionStorage } from "@/utils/sessionStorage";
import { getLocalStorage } from "@/utils/localStorage";
export default {
  name: "collectPage",
  components: {
    centerLayout,
    bookmarkTopBar,
    toast,
  },
  data() {
    return {
      list: [],
      isEdit: false,
      selectList: [],
      toastText: "",
      toast: null,
    };
  },
  computed: {
    count() {
      return this.selectList.length;
    },
  },
  created() {
    let user = getLocalStorage("user") || getSessionStorage("user");
    getHistoryList({ username: user.username }).then((res) => {
      this.list = res.data.data.list;
    });
  },
  methods: {
    toDetail(comicId) {
      this.$router.push({
        path: "/detail",
        query: {
          comicId,
        },
      });
    },
    toComic(total, chapterName, chapterId, comicId, comicTitle) {
      // 跳转至漫画页
      this.$router.push({
        path: "/comic",
        query: {
          comicId,
          comicTitle,
          chapterId,
          page: 1,
          total,
          chapterName,
        },
      });
    },
    search: _.throttle(
      function (key) {
        let user = getLocalStorage("user") || getSessionStorage("user");
        getHistorySearchList({ username: user.username, key }).then((res) => {
          if (res.data.data.list) {
            this.list = res.data.data.list;
          }
          if (res.data.data.message) {
            this.showToast(res.data.data.message);
          }
        });
      },
      500,
      {
        leading: true,
        trailing: false,
      }
    ),

    complete(isEdit) {
      this.isEdit = isEdit;
    },
    edit(isEdit) {
      this.isEdit = isEdit;
    },
    addSelect(comicId) {
      let index = this.selectList.indexOf(comicId);
      if (index == -1) {
        this.selectList.push(comicId);
      } else {
        this.selectList.splice(index, 1);
      }
    },
    check(val) {
      if (
        this.selectList.length == this.list.length ||
        this.selectList.length == 0
      )
        this.selectList = val ? this.list.map((item) => item.comicId) : [];
    },
    async remove() {
      let user = getLocalStorage("user") || getSessionStorage("user");
      let res = await removeHistory({
        username: user.username,
        list: this.selectList,
      });
      this.showToast(res.data.data.message);
      if (res.data.data.code == 200) {
        this.list = this.list.filter((item) => {
          if (this.selectList.indexOf(item.comicId) !== -1) {
            return false;
          } else return true;
        });
        this.selectList = []
      }
    },
    showToast(text) {
      this.toastText = text;
      this.toast.show();
      setTimeout(() => {
        this.toast.hide();
      }, 2000);
    },
  },
  mounted() {
    this.toast = this.$refs.toasts;
  },
};
</script>

<style lang="scss" scoped>
.collect-wrapper {
  margin-top: 20px;
  width: 100%;
  .collect-list {
    display: flex;
    flex-wrap: wrap;
    .collect-item {
      position: relative;
      width: 180px;
      height: 305px;
      margin-left: 15px;
      margin-top: 15px;
      img,
      .img-mask {
        width: 100%;
        height: 240px;
        border-radius: 4px;
        cursor: pointer;
      }
      .img-mask {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        i {
          position: absolute;
          top: 10px;
          left: 10px;
          border-radius: 100%;
          color: rgba(255, 255, 255, 0.5);
          background-color: rgba(255, 255, 255, 0.3);
          font-size: 20px;
          &.fa-check-circle {
            color: #fff;
          }
        }
      }
      .title {
        font-size: 14px;
        font-weight: bold;
        margin-top: 7px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .progress {
        margin-top: 6px;
        font-size: 14px;
        color: #888;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      .lastest {
        margin-top: 6px;
        font-size: 14px;
        color: #888;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
          font-size: 14px;
          color: #ff4b2b;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>