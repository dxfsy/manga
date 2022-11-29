<template>
  <div class="label-list-wrapper">
    <div class="label-item" v-for="(item, index) in list" :key="index">
      <comicItem :data="item" :width="width" />
    </div>
  </div>
</template>

<script>
import comicItem from "../comment/comicItem.vue";
import { px2rem } from "../../../utils/px2rem";
export default {
  name: "labelList",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  components: {
    comicItem,
  },
  computed: {
    width() {
      return px2rem(102);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/px2rem.scss";
.label-list-wrapper {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
    .label-item {
        width: px2rem(100);
        height: px2rem(200);
        margin-left: px2rem(10);
        // flex: 0 0 px2rem(102);
    }
}
</style>