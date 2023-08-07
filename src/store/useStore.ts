import { useStore as baseUseStore } from 'vuex'
import { storeKey } from '.'

// Provide custom useStore function with correct types
export const useStore = (moduleName?: 'media' | 'auth') => {
  const store = baseUseStore(storeKey)

  const dispatchWithModule = (name: string, payload?: any) => {
    let dispatchName = name
    if (moduleName) dispatchName = `${moduleName}/${name}`
    return store.dispatch(dispatchName, payload)
  }

  const gettersWithModule = (name: string) => {
    let getterName = name
    if (moduleName) getterName = `${moduleName}/${name}`
    return store.getters[getterName]
  }

  return {
    dispatch: dispatchWithModule,
    getters: gettersWithModule
  }
}
