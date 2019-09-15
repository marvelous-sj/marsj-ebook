<template>
  <div class="home">
    <div id="read"></div>
    <span class="icon-cart"></span>
  </div>
</template>

<script>
  import Epub from 'epubjs'

  global.ePub = Epub
  export default {
    // name: 'home',
    // mounted () {
    //   this.book = new Epub('/全球科技通史.epub')
    //   this.book.renderTo('read', {
    //     width: window.innerWidth,
    //     height: window.innerHeight
    //   }).display()
    // }

  }
</script>
<style scoped>
  .icon-cart{
    font-size: 30px;
    color: red;
  }
</style>
