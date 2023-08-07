import { ROUTER_NAME } from '@/constants/path'

export default function auth({ store, next }: any) {
  if (!store.getters['auth/token']) {
    return next({
      name: ROUTER_NAME.login.name
    })
  }

  return next()
}
