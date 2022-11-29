<template>
  <div class="collect-wrapper">
    <headerBar
      :text="`书架（${length}）`"
      :isEdit="true"
      @active="active"
      @notActive="notActive"
    />
    <div class="up">
      <span class="search">
        <input
          type="text"
          placeholder="请输入作品名称"
          @keyup.enter="search"
          v-model="searchKey"
        />
        <i class="fa fa-search"></i>
      </span>
      <span class="order" @click="changeOrder">时间 {{ order }}</span>
    </div>
    <div class="bottom">
      <scroll class="scroll-container">
        <collectList :list="list" v-if="list" :isEdit="isEdit" />
      </scroll>
    </div>
    <bottomMenu />
    <toast :text="toastText" ref="toasts" />
  </div>
</template>

<script>
import headerBar from "../../components/H5/comment/headerBar.vue";
import scroll from "../../components/H5/comment/scroll.vue";
import collectList from "../../components/H5/collect/collectList.vue";
import toast from "../../components/H5/comment/toast.vue";
import bottomMenu from "../../components/H5/comment/bottomMenu.vue";
import { getCollectList, getCollectSearchList } from "../../api/user";
import { getSessionStorage } from "../../utils/sessionStorage";
import { getLocalStorage } from "../../utils/localStorage";
export default {
  name: "collectPage",
  components: {
    headerBar,
    scroll,
    collectList,
    toast,
    bottomMenu,
  },
  data() {
    return {
      list: [],
      curList: [],
      curIndex: 0,
      searchKey: "",
      toastText: "",
      toast: null,
      timer: null,
      order: "顺序",
      isEdit:false,
    };
  },
  computed: {
    length() {
      return this.list.length;
    },
  },
  methods: {
    active(isEdit){
      this.isEdit = isEdit
    },
    notActive(isEdit){
      this.isEdit = isEdit
    },
    changeOrder() {
      this.order = this.order == "顺序" ? "逆序" : "顺序";
      this.list.reverse();
    },
    async getList() {
      let user = getLocalStorage("user") || getSessionStorage("user");
      let res = await getCollectList({ username: user.username });
      this.list = res.data.data.list;
    },
    search: _.throttle(
      function () {
        let user = getLocalStorage("user") || getSessionStorage("user");
        getCollectSearchList({
          username: user.username,
          key: this.searchKey,
        }).then((res) => {
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
    this.getList();
  },
  mounted() {
    this.toast = this.$refs.toasts;
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/px2rem.scss";
.collect-wrapper {
  .up {
    position: relative;
    .search {
      display: inline-block;
      position: relative;
      width: px2rem(210);
      height: px2rem(30);
      margin-top: px2rem(10);
      margin-bottom: px2rem(10);
      input {
        position: absolute;
        top: 0;
        width: px2rem(200);
        height: px2rem(30);
        padding: 0 px2rem(35) 0 px2rem(20);
        border: px2rem(1) solid #d0d0d0;
        border-radius: px2rem(16);
        margin-left: px2rem(10);
        box-sizing: border-box;
      }
      i {
        position: absolute;
        right: px2rem(20);
        top: px2rem(5);
        color: #ccc;
        font-size: px2rem(18);
      }
    }
    .order {
      position: absolute;
      top: 50%;
      right: px2rem(20);
      transform: translateY(-50%);
      font-size: px2rem(14);
      color: #888;
    }
  }
  .bottom {
    margin-bottom: 80px;
    .scroll-container {
    }
  }
}
</style>