import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/store'
    },
    {
      path: '/ebook',
      component: () => import('./views/ebook/index'),
      children: [
        {
          path: ':fileName',
          component: () => import('./components/ebook/EbookReader')
        }
      ]
    },
    {
      path: '/store',
      component: () => import('./views/store/index'),
      redirect: '/store/shelf',
      children: [
        {
          path: 'home',
          component: () => import('./views/store/store-home')
        },
        {
          path: 'shelf',
          component: () => import('./views/store/store-shelf')
        },
        {
          path: 'list',
          component: () => import('./views/store/store-list')
        },
        {
          path: 'detail',
          component: () => import('./views/store/store-detail')
        }
      ]
    }
  ]
})
