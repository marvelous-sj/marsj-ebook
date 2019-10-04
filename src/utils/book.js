import { getReadTime } from './localStorage'

export const FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
]

export const FONT_FAMILY_LIST = [
  { font: '宋体' },
  { font: '黑体' },
  { font: '楷体' },
  { font: '颜体' }
]

export function themeList (vue) {
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          'color': '#4c5059',
          'background': '#cecece'
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          'color': '#5c5b56',
          'background': '#c6c2b6'
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          'color': '#404c42',
          'background': '#a9c1a9'
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          'color': '#cecece',
          'background': '#000000'
        }
      }
    }
  ]
}

export function addCss (href) {
  let link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  document.getElementsByTagName('head')[0].appendChild(link)
}

export function removeAllCss () {
  let links = document.getElementsByTagName('link')
  for (let i = links.length; i > 0; i--) {
    const link = links[i]
    if (link && link.getAttribute('href')) {
      const href = link.getAttribute('href')
      if (inRemoveCss(href)) {
        link.parentNode.removeChild(link)
      }
    }
  }
}

function inRemoveCss (href) {
  const cssAry = [
    `${process.env.VUE_APP_RES_PATH}/theme/theme_default.css`,
    `${process.env.VUE_APP_RES_PATH}/theme/theme_eye.css`,
    `${process.env.VUE_APP_RES_PATH}/theme/theme_gold.css`,
    `${process.env.VUE_APP_RES_PATH}/theme/theme_night.css`
  ]
  return cssAry.indexOf(href) !== -1
}

export function getReadTimeByMinute (fileName) {
  const readTime = getReadTime(fileName)
  if (!readTime) {
    return 0
  } else {
    return Math.ceil(readTime / 60)
  }
}

export function flatten (array) {
  return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
}
