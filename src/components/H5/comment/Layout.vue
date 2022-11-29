<template>
  <div>
    <div class="main-content">
        <slot></slot>
    </div>
    <bottomMenu />
  </div>
</template>

<script>
import bottomMenu from '../../../components/H5/comment/bottomMenu.vue'
export default {
    name:'Layout',
    components: {
        bottomMenu
    }
}
</script>

<style lang="scss" scoped>
.main-content {
    margin-bottom: 120px;
}
</style>