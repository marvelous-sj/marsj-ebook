import { mapActions, mapGetters } from 'vuex'
import { themeList, addCss, removeAllCss } from './book'

export const ebookMixin = {
  methods: {
    ...mapActions(
      [
        'setFileName',
        'setMenuVisible',
        'setSettingVisible',
        'setDefaultFontSize',
        'setDefaultFontFamily',
        'setFontFamilyVisible',
        'setDefaultTheme',
        'setBookAvailable',
        'setProgress',
        'setSection',
        'setIsPaginating',
        'setCurrentBook',
        'setNavigation',
        'setCover',
        'setMetadata',
        'setPaginate',
        'setPageList',
        'setOffsetY',
        'setIsBookmark'
      ]
    ),
    initGlobalStyle () {
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_PATH}/theme/theme_default.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_PATH}/theme/theme_eye.css`)
          break
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_PATH}/theme/theme_gold.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_PATH}/theme/theme_night.css`)
          break
        default:
          addCss(`${process.env.VUE_APP_RES_PATH}/theme/theme_default.css`)
      }
    },
  },
  computed: {
    ...mapGetters(
      [
        'fileName',
        'menuVisible',
        'settingVisible',
        'defaultFontSize',
        'defaultFontFamily',
        'fontFamilyVisible',
        'defaultTheme',
        'bookAvailable',
        'progress',
        'section',
        'isPaginating',
        'currentBook',
        'navigation',
        'cover',
        'metadata',
        'paginate',
        'pageList',
        'offsetY',
        'isBookmark'
      ]
    ),
    themeList () {
      return themeList(this)
    }
  }
}
