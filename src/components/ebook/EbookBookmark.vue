<template>
  <div class="ebook-bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper">
      <bookmark></bookmark>
    </div>
  </div>
</template>

<script>
  import Bookmark from '../common/Bookmark'

  export default {
    components: {
      Bookmark
    },
    data () {
      return {
        text: this.$t('book.pulldownAddMark')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/style/global';

  .ebook-bookmark {
    position: absolute;
    z-index: 200;
    top: px2rem(-35);
    left: 0;
    width: 100%;
    height: px2rem(35);

    .ebook-bookmark-text-wrapper {
      position: absolute;
      right: px2rem(45);
      bottom: px2rem(5);
      display: flex;

      .ebook-bookmark-down-wrapper {
        font-size: px2rem(14);
        transition: all .2s linear;
        @include center
      }

      .ebook-bookmark-text {
        font-size: px2rem(14);
      }
    }

    .ebook-bookmark-icon-wrapper {
      position: absolute;
      right: 0;
      bottom: px2rem(5);
      margin-right: px2rem(15);
    }
  }
</style>
