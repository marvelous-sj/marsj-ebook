<template>
  <div class="bookmark"></div>
</template>

<script>
  export default {
    props: {
      width: Number,
      height: Number,
      color: String
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/style/global';

  .bookmark {
    width: 0;
    height: 0;
    border-width: px2rem(50) px2rem(10) px2rem(10) px2rem(10);
    border-style: solid;
    border-color: black black transparent black;
  }
</style>
