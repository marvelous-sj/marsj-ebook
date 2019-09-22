import { mapActions, mapGetters } from 'vuex'

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
    )
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
    )
  }
}
