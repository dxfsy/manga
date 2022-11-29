<template>
  <div class="collect-list-wrapper">
    <div class="collect-item" v-for="(item, index) in collectList" :key="index">
      <div class="collect-item-wrapper" @click="addSelect(item)">
        <img :src="item.comicCover" alt="" @click="tabToDetail(item.comicId)" />
        <div class="img-cover" v-show="isEdit">
          <i
            class="fa fa-circle-thin"
            v-show="selectList.indexOf(item.comicId) == -1"
          ></i>
          <i
            class="fa fa-check-circle"
            v-show="selectList.indexOf(item.comicId) !== -1"
          ></i>
        </div>
        <div class="title">{{ item.comicTitle }}</div>
        <div class="progress" v-if="item.chapterHistoryId">
          读至 {{ item.chapterHistoryName }}
        </div>
        <div class="progress" v-else>尚未观看</div>
        <div class="lastest">
          最新<span>{{ item.chapterLastestName }}</span>
        </div>
      </div>
    </div>
    <toast :text="toastText" ref="toasts" :needMask="true" />
  </div>
</template>

<script>
import toast from "../../../components/H5/comment/toast.vue";
import { removeCollect } from "../../../api/user";
import { getLocalStorage } from "../../../utils/localStorage";
import { getSessionStorage } from "../../../utils/sessionStorage";
export default {
  name: "collectList",
  props: {
    list: {
      type: Array,
      required: true,
    },
    isEdit: {
      type: Boolean,
    },
  },
  components: {
    toast,
  },
  data() {
    return {
      collectList: [],
      selectList: [],
      timer: null,
      toast: null,
      toastText: "",
    };
  },
  methods: {
    tabToDetail(comicId) {
      this.$router.push({
        path: "/detail",
        query: {
          comicId,
        },
      });
    },
    addSelect(item) {
      if (this.selectList.indexOf(item.comicId) == -1) {
        this.selectList.push(item.comicId);
      } else {
        this.selectList.splice(this.selectList.indexOf(item.comicId), 1);
      }
    },
    async remove() {
      let user = getLocalStorage("user") || getSessionStorage("user");
      let res = await removeCollect({
        username: user.username,
        list: this.selectList,
      });
      let removeStatus = await this.showToast(res.data.data.message);
      if (res.data.data.code == 200 && removeStatus) {
        location.reload();
      }
    },
    async showToast(text) {
      return new Promise((resolve, reject) => {
        if (this.timer) clearTimeout(this.timer);
        this.toastText = text;
        this.toast.show();
        this.timer = setTimeout(() => {
          this.toast.hide();
          resolve(true);
        }, 2000);
      });
    },
  },
  watch: {
    list: {
      immediate: true,
      handler(val) {
        this.collectList = val;
      },
    },
  },
  created() {
    this.$bus.$on("del", this.remove);
  },
  mounted() {
    this.toast = this.$refs.toasts;
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/px2rem.scss";
.collect-list-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .collect-item {
    width: px2rem(102);
    margin-left: px2rem(15);
    margin-bottom: px2rem(10);
    .collect-item-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      font-size: px2rem(14);
      img {
        width: 100%;
        height: px2rem(150);
      }
      .img-cover {
        position: absolute;
        top: 0;
        width: 100%;
        height: px2rem(150);
        background-color: rgba(0, 0, 0, 0.5);
        i {
          position: absolute;
          left: px2rem(4);
          top: px2rem(5);
          font-size: px2rem(20);
          &.fa-circle-thin {
            color: rgba(255, 255, 255, 0.5);
          }
          &.fa-check-circle {
            color: #fff;
          }
        }
      }
      .title {
        width: px2rem(102);
        font-weight: bold;
        margin-top: px2rem(5);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .progress {
        font-size: px2rem(12);
        margin-top: px2rem(5);
        color: #888;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .lastest {
        font-size: px2rem(12);
        margin-top: px2rem(5);
        color: #888;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        span {
          color: #ff4b2b;
          margin-left: px2rem(5);
        }
      }
    }
  }
}
</style>