<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper">
        <span class="icon-down" ref="iconDown"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
      <bookmark :color="color" :width="15" :height="35"></bookmark>
    </div>
  </div>
</template>

<script>
  import Bookmark from '../common/Bookmark'
  import { realPx } from '../../utils/utils'
  import { ebookMixin } from '../../utils/mixin'
  import { getBookmark, saveBookmark } from '../../utils/localStorage'

  const BLUE = '#346cbc'
  const WHITE = '#eaeeff'

  export default {
    mixins: [ebookMixin],
    components: {
      Bookmark
    },
    data () {
      return {
        text: '',
        color: WHITE,
        isFixed: false
      }
    },
    computed: {
      height () {
        return realPx(35)
      },
      threshold () {
        return realPx(55)
      },
      fixedStyle () {
        return {
          position: 'fixed',
          top: 0,
          right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`
        }
      }
    },
    watch: {
      offsetY (v) {
        if (!this.bookAvailable && this.menuVisible) {
          return
        }
        if (this.height <= v && this.threshold > v) {
          this.beforeThreshold(v)
        } else if (v >= this.threshold) {
          this.afterThreshold(v)
        } else if (v > 0 && v <= this.height) {
          this.beforeHeight()
        } else if (v === 0) {
          this.restore()
        }
      },
      isBookmark (bookmark) {
        this.isFixed = bookmark
        if (bookmark) {
          this.color = BLUE
        } else {
          this.color = WHITE
        }
      }
    },
    methods: {
      addBookMark () {
         this.bookmark = getBookmark(this.fileName)
        if (!this.bookmark) {
          this.bookmark = []
        }
        const currentLocation = this.currentBook.rendition.currentLocation()
        const cfiBase = currentLocation.start.cfi.replace(/!.*/, '')
        const cfiStart = currentLocation.start.cfi.replace(/.*!/, '')
        const cfiEnd = currentLocation.end.cfi.replace(/.*!/, '')
        const cfiRange = `${cfiBase}!,${cfiStart},${cfiEnd}`
        this.currentBook.getRange(cfiRange).then(range => {
          const text = range.toString().replace(/\s\s/g, '')
          this.bookmark.push({
            cfi: currentLocation.start.cfi,
            text: text
          })
          saveBookmark(this.fileName, this.bookmark)
        })
      },
      removeBookMark () {
        const currentLocation = this.currentBook.rendition.currentLocation()
        const cfi = currentLocation.start.cfi
        this.bookmark = getBookmark(this.fileName)
        if (this.bookmark) {
          saveBookmark(this.fileName, this.bookmark.filter(item => item.cfi !== cfi))
        }
        this.setIsBookmark(false)
      },
      restore () {
        setTimeout(() => {
          this.$refs.bookmark.style.top = `${-this.height}px`
          this.$refs.iconDown.style.transform = ''
        }, 200)
        if (this.isFixed) {
          this.setIsBookmark(true)
          this.addBookMark()
        } else {
          this.setIsBookmark(false)
          this.removeBookMark()
        }
      },
      beforeHeight () {
        if (this.isBookmark) {
          this.text = this.$t('book.pulldownDeleteMark')
          this.color = BLUE
          this.isFixed = true
        } else {
          this.text = this.$t('book.pulldownAddMark')
          this.color = WHITE
          this.isFixed = false
        }
      },
      beforeThreshold (v) {
        // 第二阶段
        this.$refs.bookmark.style.top = `${-v}px`
        this.beforeHeight()
        const iconDown = this.$refs.iconDown
        if (iconDown.style.transform === 'rotate(180deg)') {
          iconDown.style.transform = ''
        }
      },
      afterThreshold (v) {
        // 第三阶段
        this.$refs.bookmark.style.top = `${-v}px`
        if (this.isBookmark) {
          this.text = this.$t('book.releaseDeleteMark')
          this.color = WHITE
          this.isFixed = false
        } else {
          this.text = this.$t('book.releaseAddMark')
          this.color = BLUE
          this.isFixed = true
        }
        const iconDown = this.$refs.iconDown
        if (iconDown.style.transform === '') {
          iconDown.style.transform = 'rotate(180deg)'
        }
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
      bottom: 0;
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
      margin-right: px2rem(15);
    }
  }
</style>
