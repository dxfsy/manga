<template>
  <div class="item-wrapper">
    <div class="item-pic">
      <a :href="data.comicId" @click.prevent="onClickToDetail(data.comicId)">
        <img :src="data.imageUrl" :alt="data.title" />
      </a>
    </div>
    <div class="item-title">
      <a :href="data.comicId">
        {{ data.title }}
      </a>
    </div>
    <div class="item-label">
      <div v-if="Array.isArray(data.subTitle)">
        <span v-for="(item, index) in data.subTitle" :key="index">{{
          item
        }}</span>
      </div>
      <span v-else>{{ data.subTitle }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "listItem",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
.item-wrapper {
  height: 314px;
  width: 190px;
  // background-color: #ccc;
  .item-pic {
    height: 255px;
    width: 100%;
    cursor: pointer;
    // background-color: pink;
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
  }
  .item-title {
    height: 24px;
    width: 100%;
    margin-top: 10px;
    // background-color: pink;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item-label {
    height: 14px;
    width: 100%;
    margin-top: 7px;
    color: #a0a0a0;
    font-size: 14px;
    span {
      margin-right: 4px;
    }
  }
}
</style>