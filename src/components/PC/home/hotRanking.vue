<template>
  <div class="ranking-wrapper">
    <div class="ranking-title">热度排行</div>
    <div class="ranking-list">
      <div
        class="ranking-list-item"
        :class="{
          'item-1': index + 1 == current,
          'item-2': index + 1 !== current,
        }"
        v-for="(item, index) in list"
        :key="index"
        @mouseenter="changeIndex(index)"
      >
        <div class="list-item-rank">
          <a
            :href="item.comicId"
            @click.prevent="onClickToDetail(item.comicId)"
          >
            <img id="rank-img" :src="item.imageUrl" alt="" />
            <span class="rank-text rank-1" v-if="index + 1 == 1">{{
              index + 1
            }}</span>
            <span class="rank-text rank-2" v-else-if="index + 1 == 2">{{
              index + 1
            }}</span>
            <span class="rank-text rank-3" v-else-if="index + 1 == 3">{{
              index + 1
            }}</span>
            <span class="rank-text rank-other" v-else>{{ index }}</span>
          </a>
        </div>
        <div class="list-item-title">{{ item.title }}</div>
        <div class="list-item-subTitle">
          <span v-for="(subItem, index) in item.label" :key="index"
            >{{ subItem }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hotRanking",
  data() {
    return {
      current: 1,
    };
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  methods: {
    changeIndex(index) {
      this.current = index + 1;
    },
    async onClickToDetail(comicId) {
      this.$router.push({
        path: "/detail",
        query: {
          comicId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.hot-ranking-wrapper {
  height: 300px;
  width: 342px;
  //   background-color: #ccc;
  .ranking-title {
    font-size: 24px;
    color: #262626;
    font-weight: bold;
    margin-bottom: 24px;
  }
  .ranking-list {
    width: 100%;
    height: 263px;
    overflow: hidden;
    .ranking-list-item {
      position: relative;
      width: 100%;
      height: 18px;
      margin: 11px 0;
      //   background-color: pink;
      &.item-1 {
        height: 76px;
      }
      &.item-2 {
        height: 18px;
        #rank-img {
          width: 0;
          height: 0;
        }
        .list-item-title {
          top: 0;
          left: 36px;
        }
        .list-item-subTitle {
          top: 0;
        }
      }
      .list-item-rank {
        position: absolute;
        left: 0;
        width: fit-content;
        height: fit-content;
        img {
          width: 89px;
          height: 67px;
          border-radius: 6px;
          cursor: pointer;
        }
        .rank-text {
          position: absolute;
          top: 0;
          left: 0;
          height: 18px;
          width: 18px;
          line-height: 18px;
          text-align: center;
          font-size: 14px;
          color: #fff;
          // background-color: #FA684B;
          border-radius: 4px 0 4px 0;
          &.rank-1 {
            background-color: #fa684b;
          }
          &.rank-2 {
            background-color: #f7c325;
          }
          &.rank-3 {
            background-color: #36d9b0;
          }
          &.rank-other {
            background-color: #bfbfbf;
          }
        }
      }
      .list-item-title {
        position: absolute;
        width: 160px;
        height: fit-content;
        font-size: 14px;
        top: 30px;
        left: 98px;
        // 文字超出宽度省略
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .list-item-subTitle {
        position: absolute;
        left: 270px;
        top: 30px;
        width: 62px;
        font-size: 14px;
        color: #bfbfbf;
        // 文字超出宽度省略
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
          cursor: pointer;
        }
      }
    }
  }
}
</style>