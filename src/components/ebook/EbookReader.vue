<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <div class="ebook-reader-mask"
         @click="clickMask"
         @touchmove="move"
         @touchend="moveEnd"
         @mousedown.left="onMouseEnter"
         @mousemove.left="onMouseMove"
         @mouseup.left="onMouseUp"></div>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  import { ebookMixin } from '../../utils/mixin'
  import {
    getFontFamily,
    getFontSize,
    saveFontFamily,
    saveFontSize,
    getTheme,
    saveTheme, getLocation
  } from '../../utils/localStorage'
  import { flatten } from '../../utils/book'

  global.epub = Epub
  export default {
    mixins: [ebookMixin],
    methods: {
      onMouseUp (e) {
        if (this.mouseState === 2) {
          this.setOffsetY(0)
          this.firstOffSetY = null
          const time = e.timeStamp - this.mouseStartTime
          if (time < 100) {
            this.mouseState = 4
          } else {
            this.mouseState = 3
          }
        } else {
          this.mouseState = 4
        }
        e.preventDefault()
        e.stopPropagation()
      },
      onMouseMove (e) {
        if (this.mouseState === 1) {
          this.mouseState = 2
        } else if (this.mouseState === 2) {
          let offSetY = 0
          if (this.firstOffSetY) {
            offSetY = e.clientY - this.firstOffSetY
            this.setOffsetY(offSetY)
          } else {
            this.firstOffSetY = e.clientY
          }
        }
        e.preventDefault()
        e.stopPropagation()
      },
      onMouseEnter (e) {
        this.mouseStartTime = e.timeStamp
        this.mouseState = 1
        e.preventDefault()
        e.stopPropagation()
      },
      move (e) {
        let offSetY = 0
        if (this.firstOffSetY) {
          offSetY = e.changedTouches[0].clientY - this.firstOffSetY
          this.setOffsetY(offSetY)
        } else {
          this.firstOffSetY = e.changedTouches[0].clientY
        }
        e.preventDefault()
        e.stopPropagation()
      },
      moveEnd () {
        this.setOffsetY(0)
        this.firstOffSetY = null
      },
      clickMask (e) {
        if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
          return
        }
        const offsetX = e.offsetX
        const width = window.innerWidth
        if (offsetX > 0 && offsetX < width * 0.3) {
          this.prevPage()
        } else if (offsetX > 0 && offsetX > width * 0.7) {
          this.nextPage()
        } else {
          this.showTitleAndMenu()
        }
      },
      prevPage () {
        if (this.rendition) {
          this.rendition.prev().then(() => {
            this.refreshLocation()
          })
          this.hideTitleAndMenu()
        }
      },
      nextPage () {
        if (this.rendition) {
          this.rendition.next().then(() => {
            this.refreshLocation()
          })
          this.hideTitleAndMenu()
        }
      },
      showTitleAndMenu () {
        if (this.menuVisible) {
          this.setSettingVisible(-1)
          this.setFontFamilyVisible(false)
        }
        this.setMenuVisible(!this.menuVisible)
      },
      initFontFamily () {
        let font = getFontFamily(this.fileName)
        if (!font) {
          saveFontFamily(this.fileName, this.defaultFontFamily)
        } else {
          this.rendition.themes.font(font)
          this.setDefaultFontFamily(font)
        }
      },
      initFontSize () {
        let fontSize = getFontSize(this.fileName)
        if (!fontSize) {
          saveFontSize(this.fileName, this.defaultFontSize)
        } else {
          this.rendition.themes.fontSize(fontSize)
          this.setDefaultFontSize(fontSize)
        }
      },
      initTheme () {
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style)
        })
        let theme = getTheme(this.fileName)
        if (!theme) {
          saveTheme(this.fileName, this.defaultTheme)
        } else {
          this.rendition.themes.select(theme)
          this.setDefaultTheme(theme)
        }
      },
      initRendition () {
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
          // flow: 'scrolled'
        })
        const location = getLocation(this.fileName)
        this.display(location, () => {
            this.initTheme()
            this.initFontSize()
            this.initFontFamily()
            this.initGlobalStyle()
          }
        )
        this.rendition.hooks.content.register(contents => {
          Promise.all([
            contents.addStylesheet(`${process.env.VUE_APP_RES_PATH}/font/%E5%AE%8B%E4%BD%93.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_PATH}/font/%E6%A5%B7%E4%BD%93.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_PATH}/font/%E9%A2%9C%E4%BD%93.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_PATH}/font/%E9%BB%91%E4%BD%93.css`)
          ]).then(() => {
          })
        })
      },
      // initGesture () {
      //   this.rendition.on('touchstart', event => {
      //     this.startX = event.changedTouches[0].clientX
      //     this.startTime = event.timeStamp
      //   })
      //   this.rendition.on('touchend', event => {
      //     const offSetX = event.changedTouches[0].clientX - this.startX
      //     const duration = event.timeStamp - this.startTime
      //     if (offSetX > 40 && duration < 500) {
      //       this.prevPage()
      //     } else if (offSetX < -40 && duration < 500) {
      //       this.nextPage()
      //     } else {
      //       this.showTitleAndMenu()
      //     }
      //     event.preventDefault()
      //     event.stopPropagation()
      //   })
      // },
      parseBook () {
        this.book.loaded.cover.then(cover => {
          this.book.archive.createUrl(cover).then(url => {
            this.setCover(url)
          })
        })
        this.book.loaded.metadata.then(metadata => {
          this.setMetadata(metadata)
        })
        this.book.loaded.navigation.then(nav => {
          let navItem = flatten(nav.toc)

          function find (item, level = 0) {
            return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
          }

          navItem.forEach(item => {
            item.level = find(item)
          })
          this.setNavigation(navItem)
        })
      },
      initEpub () {
        const url = process.env.VUE_APP_RES_PATH + '/' + this.fileName + '.epub'
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.initRendition()
        // this.initGesture()
        this.parseBook()
        this.book.ready.then(() => {
          return this.book.locations.generate(750 * (window.innerWidth / 375) *
            (getFontSize(this.fileName) / 16))
        }).then(locations => {
          this.navigation.forEach(nav => {
            nav.pageList = []
          })
          locations.forEach(item => {
            const loc = item.match(/\[(.*)\]!/)[1]
            this.navigation.forEach(nav => {
              if (nav.href) {
                const href = nav.href.match(/^(.*)\.html$/)[1]
                if (href === loc) {
                  nav.pageList.push(item)
                }
              }
            })
          })
          this.currentPage = 1
          this.navigation.forEach((nav, index) => {
            if (index === 0) {
              nav.page = 1
            } else {
              nav.page = this.currentPage
            }
            this.currentPage += nav.pageList.length + 1
          })
          this.setPageList(locations)
          this.setBookAvailable(true)
          // this.refreshLocation()
        })
      }
    },
    mounted () {
      const fileName = this.$route.params.fileName.split('|').join('/')
      this.setFileName(fileName).then(() => {
        this.initEpub()
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/style/global';

  .ebook-reader {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .ebook-reader-mask {
      position: absolute;
      background: transparent;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 99;
    }
  }
</style>
