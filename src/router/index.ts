import { createRouter, createWebHistory } from 'vue-router'

import { ROUTER_NAME } from '@/constants/path'
import MainLayout from '@/layouts/MainLayout.vue'
import OverviewPage from '@/views/OverviewPage.vue'
import ProductPage from '@/views/ProductPage.vue'
import MediaPage from '@/views/MediaPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTER_NAME.root.path,
      name: ROUTER_NAME.root.name,
      component: MainLayout,
      children: [
        {
          path: ROUTER_NAME.overview.path,
          name: ROUTER_NAME.overview.name,
          component: OverviewPage
        },
        {
          path: ROUTER_NAME.product.path,
          name: ROUTER_NAME.product.name,
          component: ProductPage
        },
        {
          path: ROUTER_NAME.media.path,
          name: ROUTER_NAME.media.name,
          component: MediaPage
        }
      ]
    },
    {
      path: ROUTER_NAME.notFound.path,
      name: ROUTER_NAME.notFound.name,
      component: NotFoundPage
    },
    {
      path: ROUTER_NAME.login.path,
      name: ROUTER_NAME.login.name,
      component: LoginPage
    }
  ]
})

export default router
