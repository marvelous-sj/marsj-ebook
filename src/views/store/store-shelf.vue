<template>
<div class="store-shelf">
  <shelf-title/>
  <scroll class="store-shelf-scroll-wrapper" :top="0" @onScroll="onScroll">
    <shelf-search/>
    <shelf-list></shelf-list>
  </scroll>
</div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  import ShelfTitle from '@/components/shelf/ShelfTitle'
  import ShelfSearch from '../../components/shelf/ShelfSearch'
  import Scroll from '../../components/common/Scroll'
  import ShelfList from '../../components/shelf/ShelfList'

  export default {
    name: 'store-shelf',
    mixins: [storeShelfMixin],
    components: { ShelfList, ShelfSearch, ShelfTitle, Scroll },
    methods: {
      onScroll (offsetY) {
        this.setOffsetY(offsetY)
      }
    }
  }
</script>

<style scoped>
.store-shelf{
  width: 100%;
  height: 100%;
  background: white;
}
</style>
