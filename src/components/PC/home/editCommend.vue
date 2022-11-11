<template>
  <div class="editCommend-wrapper">
    <showList listTitle="编辑推荐" :list="editRecommend" v-if="editRecommend" />
  </div>
</template>

<script>
import showList from "./showList.vue";
export default {
  name: "editCommend",
  components: {
    showList,
  },
  props: {
    editRecommend:{
        type:Array,
        required:true
    }
  }
};
</script>

<style lang="scss" scoped>
.editCommend-wrapper {
    margin-bottom: 60px;
}
</style>