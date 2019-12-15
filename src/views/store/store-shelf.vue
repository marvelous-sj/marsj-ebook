<template>
<div class="store-shelf">
  <shelf-title/>
</div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  import ShelfTitle from '@/components/shelf/ShelfTitle'

  export default {
    name: 'store-shelf',
    mixins: [storeShelfMixin],
    components: { ShelfTitle }
  }
</script>

<style scoped>
.store-shelf{
  width: 100%;
  height: 100%;
  background: white;
}
</style>
