<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  import { ebookMixin } from '../../utils/mixin'

  global.epub = Epub
  export default {
    mixins: [ebookMixin],
    methods: {
      prevPage () {
        if (this.rendition) {
          this.rendition.prev()
          this.hideTitleAndMenu()
        }
      },
      nextPage () {
        if (this.rendition) {
          this.rendition.next()
          this.hideTitleAndMenu()
        }
      },
      showTitleAndMenu () {
        if (this.menuVisible) {
          this.setSettingVisible(-1)
        }
        this.setMenuVisible(!this.menuVisible)
      },
      hideTitleAndMenu () {
        this.setMenuVisible(false)
        this.setSettingVisible(-1)
      },
      initEpub () {
        const url = 'http://120.79.194.248:8008/' + this.fileName + '.epub'
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
        })
        this.rendition.display()

        this.rendition.on('touchstart', event => {
          this.startX = event.changedTouches[0].clientX
          this.startTime = event.timeStamp
        })
        this.rendition.on('touchend', event => {
          const offSetX = event.changedTouches[0].clientX - this.startX
          const duration = event.timeStamp - this.startTime
          if (offSetX > 40 && duration < 500) {
            this.prevPage()
          } else if (offSetX < -40 && duration < 500) {
            this.nextPage()
          } else {
            this.showTitleAndMenu()
          }
          event.preventDefault()
          event.stopPropagation()
        })
      }
    },
    mounted () {
      console.log(this.menuVisible)
      const fileName = this.$route.params.fileName.split('|').join('/')
      this.setFileName(fileName).then(() => {
        this.initEpub()
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/style/global';
</style>
