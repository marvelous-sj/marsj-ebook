<template>
  <div class="shelf-item" :class="{'shelf-item-shadow': data.type !== 3}" @click="handleItemClick">
    <component :is="item" :data="data" class="shelf-item-comp" :class="{'is-edit':isEditMode && data.type == 2}"></component>
    <span v-show="isEditMode && data.type == 1" class="icon-selected"></span>
  </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  import ShelfBook from './ShelfItemBook'
  import ShelfCategory from './ShelfItemCategory'
  import ShelfAdd from './ShelfItemAdd'
  import { gotoStoreHome } from '../../utils/store'

  export default {
    name: 'ShelfItem',
    mixins: [storeShelfMixin],
    computed: {
      item () {
        return this.data.type === 1 ? this.book : (this.data.type === 2 ? this.category : this.add)
      }
    },
    props: {
      data: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        book: ShelfBook,
        category: ShelfCategory,
        add: ShelfAdd
      }
    },
    methods: {
      handleItemClick () {
        if (this.data.type === 1) {
          this.showBookDetail(this.data)
        } else if (this.data.type === 2) {

        } else {
          gotoStoreHome(this)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/style/global';
  .shelf-item{
    position: relative;
    width: 100%;
    height: 100%;
    &.shelf-item-shadow{
      box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200,200,200,0.3);
    }
    .shelf-item-comp{
      opacity: 1;
      &.is-edit{
        opacity: 0.5;
      }
    }
    .icon-selected{
      position: absolute;
      bottom: px2rem(2);
      right: px2rem(2);
      font-size: px2rem(18);
      color: rgba(0, 0, 0 , .4);

    }
  }
</style>
