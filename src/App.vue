<template>
  <div id="app">
    <span class="text">ABCDEG</span>
    <router-view/>
  </div>
</template>
<script>
  export default {
    mounted () {
      this.$store.dispatch('setTest', 5).then(() => {
        console.log(this.$store.state.book.test)
      })
    }
  }
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
</script>
<style lang="scss">
  @import './assets/style/global';

  .text {
    font-family: "Days One";
    font-size: px2rem(20);
    color: aqua;
  }
</style>
