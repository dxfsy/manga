<template>
  <div class="list-wrapper">
    <!-- 人气推荐 -->
    <div class="hot-commend-wrapper">
      <showList
        :swiper="false"
        :listWidth="796"
        :list="hotList"
        listTitle="人气推荐"
        v-if="hotList"
      />
    </div>
    <!-- 热度排行 -->
    <div class="hot-ranking-wrapper">
      <hotRanking :list="hotRank" v-if="hotRank" />
    </div>
  </div>
</template>

<script>
import showList from './showList.vue'
import hotRanking from './hotRanking'
export default {
    name:'hotRecommend',
    components: {
        showList,
        hotRanking
    },
    props: {
        hotRank:{
            type:Array,
            required:true
        },
        hotList:{
            type:Array,
            required:true
        }
    }
};
</script>

<style lang="scss" scoped>
.list-wrapper {
  display: flex;
  width: fit-content;
  height: fit-content;
  margin-bottom: 60px;
  .hot-commend-wrapper{
    flex: 0 0 796px;
  }
  .hot-ranking-wrapper{
    flex: 0 0 342px;
    margin-left: 62px;
  }
}
</style>