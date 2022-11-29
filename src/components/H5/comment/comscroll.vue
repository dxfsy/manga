<template>
  <div>
    <!--  @init="mescrollInit" -->
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      @upCallback="refreshStart"
      @downCallback="handleLoadStart"
    >
      <!--内容...-->
      <slot></slot>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  props: {
    // 下拉刷新
    downCallback: {
      default: () => {},
    },
    // 上拉加载
    upCallback: {
      default: () => {},
    },
  },
  components: { MescrollVue },
  data() {
    return {
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        auto: false, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
        callback: this.downCallback,
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 12, //每页数据条数,默认10
        },
        noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        // 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        // 这就是为什么无更多数据有时候不显示的原因
        // toTop: {
        //   //回到顶部按钮
        //   src: "/goTop.png", //图片路径,默认null,支持网络图
        //   offset: 1000, //列表滚动1000px才显示回到顶部按钮
        // },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
          tip: "暂无相关数据~", //提示
        },
      },
    };
  },
  methods: {
    // 上拉加载开始
    handleLoadStart() {
      this.downCallback();
    },
    //下拉刷新
    refreshStart() {
      this.upCallback();
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
  },
};
</script>

<style lang="scss" scoped>
.mescroll {
    position: fixed;
    top: 144px;
    bottom: 63px;
    height: auto;
}
</style>