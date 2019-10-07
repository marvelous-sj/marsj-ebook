<template>
  <div class="ebook" ref="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
  import EbookReader from '../../components/ebook/EbookReader'
  import EbookTitle from '../../components/ebook/EbookTitle'
  import EbookMenu from '../../components/ebook/EbookMenu'
  import { getReadTime, saveReadTime } from '../../utils/localStorage'
  import { ebookMixin } from '../../utils/mixin'

  export default {
    mixins: [ebookMixin],
    components: {
      EbookReader,
      EbookTitle,
      EbookMenu
    },
    watch: {
      offsetY (v) {
        if (v > 0) {
          this.move(v)
        }
      }
    },
    methods: {
      move (v) {
        this.$refs.ebook.style.top = v + 'px'
      },
      startLoopReadTime () {
        let readTime = getReadTime(this.fileName)
        if (!readTime) {
          readTime = 0
        }
        this.task = setInterval(() => {
          readTime++
          if (readTime % 30 === 0) {
            saveReadTime(this.fileName, readTime)
          }
        }, 1000)
      }
    },
    mounted () {
      this.startLoopReadTime()
    },
    beforeDestroy () {
      if (this.task) {
        clearInterval(this.task)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/style/global';

  .ebook {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
