import { ROUTER_NAME } from '@/constants/path'
import auth from '@/middleware/auth'

const MainLayout = () => import('@/layouts/MainLayout.vue')
const OverviewPage = () => import('@/views/OverviewPage.vue')
const ProductPage = () => import('@/views/ProductPage.vue')
const MediaPage = () => import('@/views/MediaPage.vue')
const LoginPage = () => import('@/views/LoginPage.vue')
const NotFoundPage = () => import('@/views/NotFoundPage.vue')

export default [
  {
    path: ROUTER_NAME.root.path,
    name: ROUTER_NAME.root.name,
    component: MainLayout,
    meta: {
      middleware: [auth]
    },
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
