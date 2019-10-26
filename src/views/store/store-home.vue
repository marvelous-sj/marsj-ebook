<template>
    <div class="store-home">
      <search-bar></search-bar>
      <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
        <div>1111111111111111111</div>
      </scroll>
    </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import Scroll from '../../components/common/Scroll'
  import { storeHomeMixin } from '../../utils/mixin'
  import { px2rem } from '../../utils/utils'
  export default {
    mixins: [storeHomeMixin],
    components: {
      SearchBar,
      Scroll
    },
    data () {
      return {
        scrollTop: px2rem(94)
      }
    },
    methods: {
      onScroll (offsetY) {
        this.setOffsetY(offsetY)
        if (offsetY > 0) {
          this.scrollTop = px2rem(52)
        } else {
          this.scrollTop = px2rem(94)
        }
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
.store-home {
  width: 100%;
  height: 100%;
}
</style>
