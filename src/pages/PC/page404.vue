<template>
  <div>
    <Layout>
      <div class="page-404">

      </div>
        <img class="img-404" src="../../assets/404.png" alt="">
    </Layout>
  </div>
</template>

<script>
import Layout from "../../components/PC/comment/layout.vue";
export default {
    name:'page404',
    components: {
        Layout
    }
}
</script>

<style lang="scss" scoped>
.page-404 {
  position: relative;
  width: 100%;
  height: 800px;
}
.img-404 {
  position: absolute;
  top: 50%;
  left: 50%;
  bottom: 0;
  right: 0;
  transform: translate(-50%,-50%);
}
</style>