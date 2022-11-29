<template>
  <div class="history-wrapper">
    <headerBar
      text="历史"
      :isEdit="true"
      @active="active = true"
      @notActive="active = false"
    />
    <div class="history-list">
      <div class="history-item" v-for="(item) in list" :key="item.id">
        <div class="left">
          <div class="img-wrapper">
            <img :src="item.comicCover" alt="" />
          </div>
          <div class="info">
            <div class="title">{{ item.comicTitle }}</div>
            <div class="history-chapter">
              {{ item.historyChapterName || "已收藏但未观看" }}
            </div>
            <div class="lastest-chapter">
              <span>最新</span> {{ item.chapterLastestName }}
            </div>
          </div>
        </div>
        <div class="right" v-show="active">
          <input type="checkbox" :id="`check${item.id}`" class="check-input" />
          <label
            :for="`check${item.id}`"
            class="check"
            @click="addSelect(item.comicId)"
          ></label>
        </div>
      </div>
    </div>
    <toast :text="toastText" ref="toasts" :needMask="true" />
  </div>
</template>

<script>
import headerBar from "../../components/H5/comment/headerBar.vue";
import toast from "../../components/H5/comment/toast.vue";
import { removeHistory } from "../../api/user";
import { getHistoryList } from "../../api/user";
import { getLocalStorage } from "../../utils/localStorage";
import { getSessionStorage } from "../../utils/sessionStorage";
export default {
  name: "historyPage",
  components: {
    headerBar,
    toast,
  },
  data() {
    return {
      list: [],
      active: false,
      selectList: [],
      toast: null,
      timer: null,
      toastText: "",
    };
  },
  methods: {
    async deleteSelect() {
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
        this.selectList = [];
      }
    },
    addSelect(comicId) {
      if (this.selectList.indexOf(comicId) == -1) {
        this.selectList.push(comicId);
      } else {
        this.selectList.splice(this.selectList.indexOf(comicId), 1);
      }
    },
    showToast(text) {
      if (this.timer) clearTimeout(this.timer);
      this.toastText = text;
      this.toast.show();
      this.timer = setTimeout(() => {
        this.toast.hide();
      }, 2000);
    },
  },
  created() {
    let user = getLocalStorage("user") || getSessionStorage("user");
    getHistoryList({ username: user.username }).then((res) => {
      this.list = res.data.data.list;
    });
    this.$bus.$on('del',this.deleteSelect)
  },
  mounted() {
    this.toast = this.$refs.toasts;
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/px2rem.scss";
.history-wrapper {
  font-size: px2rem(16);
  .history-list {
    margin-top: px2rem(30);
    margin-bottom: px2rem(20);
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .history-item {
      height: px2rem(100);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: px2rem(20);
      .left {
        width: px2rem(270);
        display: flex;
        .img-wrapper {
          width: px2rem(80);
          height: px2rem(100);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: px2rem(160);
          font-size: px2rem(14);
          margin-left: px2rem(10);
          .lastest-chapter {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
              color: #ff4b2b;
            }
          }
        }
      }
      .right {
        position: relative;
        text-align: right;
        width: px2rem(100);
        height: 100%;
        .check-input {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
        }
        .check {
          position: absolute;
          right: 0;
          width: px2rem(100);
          height: 100%;
        }
      }
    }
  }
}
</style>