<template>
  <div class="page-pagination-wrapper">
    <div class="pagination-list">
      <span class="prev" @click="prev">&lt;</span>
      <input
        class="pagination-item"
        v-model="value"
        @input="savePage"
        @keyup.enter="tabToPage"
        @blur="tabToPage"
        placeholder="输入页数"
      />
      <span class="next" @click="next">&gt;</span>
    </div>
    <toast ref="toast" :text="toastText" />
  </div>
</template>

<script>
import toast from "../comment/toast.vue";
export default {
  name: "pagePagination",
  components: {
    toast,
  },
  props: {
    // 数据的总量
    count: {
      type: Number,
      required: true,
    },
    // 每页需要显示的数据量
    perCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // 当前第几页
      cur: 1,
      // 输入页数
      value: 1,
      toastText: "当前已是第一页",
      toasts: null,
      // isInput:false,
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.count / this.perCount);
    },
  },
  methods: {
    savePage() {
      // this.isInput = true
      let page = parseInt(this.value);
      if (page < 1) {
        this.showToast("为您跳转第一页捏~");
        this.value = 1;
        this.cur = 1;
        this.$emit('pageTo',1)
      } else if (page > this.totalPage) {
        this.showToast("为您跳转最后一页捏~");
        this.value = this.totalPage;
        this.cur = this.totalPage;
        this.$emit('pageTo',this.totalPage)
      } else {
        this.cur = page;
      }
    },
    tabToPage(){
      // this.isInput = false
        this.$emit("pageTo", this.cur);
    },
    showToast(text) {
      this.toastText = text;
      this.toasts.show();
      setTimeout(() => {
        this.toasts.hide();
      }, 2000);
    },
    prev() {
      // if(this.isInput) return
      let temp = this.cur - 1;
      if (temp < 1) {
        this.showToast("已经是第一页了捏~");
      } else {
        this.cur = temp;
        this.value -= 1;
        this.$emit("prev", temp);
      }
    },
    next() {
      // if(this.isInput) return
      let temp = this.cur + 1;
      if (temp > this.totalPage) {
        this.showToast("已经是最后一页了捏~");
      } else {
        this.cur = temp;
        this.value = parseInt(this.value)+1;
        this.$emit("next", temp);
      }
    },
  },
  created(){
    this.value = Number(this.$route.query.page)
    this.cur = Number(this.$route.query.page)
  },
  mounted() {
    this.toasts = this.$refs.toast;
  },
};
</script>

<style lang="scss" scoped>
.page-pagination-wrapper {
  .pagination-list {
    width: 1200px;
    height: 33px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .pagination-item,
    .prev,
    .next {
      display: inline-block;
      width: 69px;
      height: 29px;
      font-size: 12px;
      line-height: 29px;
      text-align: center;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      color: #666;
      margin-left: 4px;
      cursor: pointer;
      &.active {
        color: #fff;
        background-color: #fd113a;
        &:hover {
          color: #fff;
          border: 1px solid #d9d9d9;
        }
      }
      &:hover {
        border: 1px solid #fd113a;
        color: #fd113a;
      }
    }
    .prev,
    .next {
      width: 29px;
    }
  }
}
</style>