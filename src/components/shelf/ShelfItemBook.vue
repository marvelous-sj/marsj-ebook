<template>
  <div class="shelf-item-book">
    <img :src="data.cover" alt="" class="shelf-item-book-cover">
  </div>
</template>

<script>
  export default {
    name: 'ShelfItemBook',
    props: {
      data: {
        type: Object,
        default: null
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/style/global';
  .shelf-item-book{
    width: 100%;
    height: 100%;
    .shelf-item-book-cover{
      width: 100%;
      height: 100%;
    }
  }
</style>
