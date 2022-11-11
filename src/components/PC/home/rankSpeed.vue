<template>
  <div class="rank-speed-wrapper">
    <div class="rank-title">上升最快</div>
    <div class="rank-wrapper">
      <div class="rank-left">
        <carousel :list="rankData" @prev="prev" @next="next" />
        <div class="comic-info" v-if="comicInfo">
          <div class="comic-title">{{ comicInfo.title }}</div>
          <div class="comic-author">{{ comicInfo.author }}</div>
          <div class="comic-label">
            <div class="labels">
              <span v-for="(item, index) in comicInfo.subTitle" :key="index">{{
                item
              }}</span>
            </div>
            <div class="read" @click="onClickToDetail(comicInfo.comicId)">开始阅读</div>
          </div>
          <div class="comic-content">
            {{ comicInfo.content }}
          </div>
        </div>
      </div>
      <div class="rank-right">
        <div class="rank-right-list">
          <div
            class="rank-right-item"
            v-for="(item, index) in rankData"
            :key="index"
          >
            <div class="item-left">
              <a
                :href="item.comicId"
                @click.prevent="onClickToDetail(item.comicId)"
              >
                <img :src="item.imageUrl" alt="" />
              </a>
            </div>
            <div class="item-right">
              <div class="item-up">
                <div class="item-title">{{ item.title }}</div>
                <div class="item-author">{{ item.author }}</div>
                <div class="item-label">
                  <span v-for="(item, index) in item.subTitle" :key="index">{{
                    item
                  }}</span>
                </div>
              </div>
              <div class="item-bottom">
                <div class="item-content">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from "../comment/carousel.vue";
import showList from "./showList.vue";
export default {
  name: "rankSpeed",
  components: {
    showList,
    carousel,
  },
  data() {
    return {
      comicInfo: null,
    };
  },
  props: {
    rankData: {
      type: Array,
      required: true,
    },
  },
  watch: {
    rankData: {
      immediate: true,
      handler(newVal, oldVal) {
        this.comicInfo = this.rankData[0];
      },
    },
  },
  methods: {
    prev(obj) {
      this.comicInfo = obj;
    },
    next(obj) {
      this.comicInfo = obj;
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
// @import "../../../assets/styles/mixin.scss";
.rank-speed-wrapper {
  height: 472px;
  width: 1200px;
  // background-color: #ccc;
  margin-bottom: 60px;
  .rank-title {
    font-size: 24px;
    color: #262626;
    font-weight: bold;
    margin-bottom: 24px;
  }
  .rank-wrapper {
    width: 100%;
    height: 424px;
    display: flex;
    .rank-left {
      flex: 0 0 240px;
      height: 100%;
      // background-color: pink;
      .comic-info {
        .comic-title {
          width: 100%;
          height: fit-content;
          font-size: 16px;
          font-weight: bold;
          margin-top: 10px;
          overflow: hidden;
        }
        .comic-author {
          font-size: 12px;
          line-height: 12px;
          margin-top: 10px;
          color: #a0a0a0;
        }
        .comic-label {
          display: flex;
          justify-content: center;
          align-items: center;
          .labels {
            width: 170px;
            span {
              font-size: 12px;
              color: #a0a0a0;
              border: 1px solid #d9d9d9;
              border-radius: 2px;
              padding: 1px 2px;
              margin-right: 10px;
            }
          }
          .read {
            flex: 1;
            height: 28px;
            font-size: 12px;
            color: #fff;
            line-height: 28px;
            text-align: center;
            border-radius: 15px;
            background-color: #ff494f;
            cursor: pointer;
          }
          margin-top: 10px;
        }
        .comic-content {
          margin-top: 20px;
          font-size: 12px;
          line-height: 24px;
          color: #a0a0a0;
        }
      }
    }
    .rank-right {
      flex: 1;
      margin-left: 10px;
      // background-color: pink;
      .rank-right-list {
        display: flex;
        flex-wrap: wrap;
        margin-left: 50px;
        width: 900px;
        height: 100%;
        .rank-right-item {
          width: 250px;
          height: 200px;
          margin-left: 60px;
          // background-color: pink;
          display: flex;
          &:nth-child(3n + 1) {
            margin-left: 10px;
          }
          .item-left {
            flex: 1;
            img {
              width: 140px;
              height: 188px;
              border-radius: 3%;
              margin-top: 6px;
            }
          }
          .item-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 5px;
            .item-title {
              font-weight: bold;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              white-space: normal;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .item-author {
              font-size: 12px;
              line-height: 12px;
              margin-top: 10px;
              color: #a0a0a0;
            }
            .item-content {
              margin-top: 20px;
              font-size: 12px;
              line-height: 20px;
              color: #a0a0a0;
            }
            .item-label {
              span {
                font-size: 12px;
                color: #a0a0a0;
                border: 1px solid #d9d9d9;
                border-radius: 2px;
                padding: 1px 2px;
                margin-right: 10px;
              }
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
</style>