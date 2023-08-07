import { createRouter, createWebHistory } from 'vue-router'

import routes from '@/router/routes'
import store from '@/store'
import middlewarePipeline from '@/middleware/middlewarePipeline'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('setIsLoading', true)

  if (!to.meta.middleware) {
    return next()
  }

  const { middleware } = to.meta as any

  const context = {
    to,
    from,
    store,
    next
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

router.afterEach(() => {
  store.dispatch('setIsLoading', false)
})

export default router
