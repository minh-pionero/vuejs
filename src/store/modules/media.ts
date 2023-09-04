import type { MediaItemType } from './../../types/media.type'
import type { Module } from 'vuex'
import type { RootStateTypes } from '@/store'
import { toast } from 'vue3-toastify'
import { ERROR_MESSAGE } from '@/constants/messages'
import {
  createFolderApi,
  deleteFileAndFolderApi,
  getDirectoriesApi,
  renameFileAndFolderApi,
  saveFileApi
} from '@/services/media.service'

type MediaStateType = {
  isLoading: boolean
  isSubmitting: boolean
  directories: MediaItemType[]
  selectedDirectory?: MediaItemType
  selectedFiles?: Set<string>
}

export enum EMediaGetters {
  IS_LOADING = 'isLoading',
  IS_SUBMITTING = 'isSubmitting',
  DIRECTORIES_REAL = 'directoriesReal',
  DIRECTORIES = 'directories',
  SELECTED_DIRECTORIES = 'selectedDirectories',
  GET_SELECTED_FILES = 'getSelectedFiles'
}

enum EMediaMutation {
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_IS_SUBMITTING = 'SET_IS_SUBMITTING',
  SET_DIRECTORIES = 'SET_DIRECTORIES',
  SET_SELECTED_DIRECTORY = 'SET_SELECTED_DIRECTORY',
  SET_SELECTED_FILES = 'SET_SELECTED_FILES'
}

export enum EMediaAction {
  GET_DIRECTORIES = 'GET_DIRECTORIES',
  HANDLE_SELECT_DIRECTORY = 'HANDLE_SELECT_DIRECTORY',
  CREATE_FOLDER = 'CREATE_FOLDER',
  UPLOAD_FILE = 'UPLOAD_FILE',
  DELETE_FILE_OR_FOLDER = 'DELETE_FILE_OR_FOLDER',
  RENAME_FILE_OF_FOLDER = 'RENAME_FILE_OF_FOLDER',
  HANDLE_SET_SELECTED_FILES = 'HANDLE_SET_SELECTED_FILES'
}

const mediaModule: Module<MediaStateType, RootStateTypes> = {
  namespaced: true,
  state: {
    isLoading: false,
    isSubmitting: false,
    directories: [],
    selectedFiles: new Set([])
  },
  getters: {
    [EMediaGetters.IS_LOADING]: (state) => state.isLoading,
    [EMediaGetters.IS_SUBMITTING]: (state) => state.isSubmitting,
    [EMediaGetters.DIRECTORIES]: (state) => state.selectedDirectory?.children ?? state.directories,
    [EMediaGetters.SELECTED_DIRECTORIES]: (state) => state.selectedDirectory,
    [EMediaGetters.DIRECTORIES_REAL]: (state) => state.directories,
    [EMediaGetters.GET_SELECTED_FILES]: (state) => state.selectedFiles
  },
  mutations: {
    [EMediaMutation.SET_IS_LOADING](state, payload) {
      state.isLoading = payload
    },
    [EMediaMutation.SET_IS_SUBMITTING](state, payload) {
      state.isSubmitting = payload
    },
    [EMediaMutation.SET_DIRECTORIES](state, payload) {
      state.directories = payload
    },
    [EMediaMutation.SET_SELECTED_DIRECTORY](state, payload) {
      state.selectedDirectory = payload
    },
    [EMediaMutation.SET_SELECTED_FILES](state, payload) {
      state.selectedFiles = payload
    }
  },
  actions: {
    async [EMediaAction.GET_DIRECTORIES]({ commit }) {
      try {
        commit(EMediaMutation.SET_IS_LOADING, true)
        const { data } = await getDirectoriesApi()
        commit(EMediaMutation.SET_DIRECTORIES, data)
        commit(EMediaMutation.SET_SELECTED_DIRECTORY, null)
      } catch (e) {
        toast.error(ERROR_MESSAGE.FETCHING)
      } finally {
        commit(EMediaMutation.SET_IS_LOADING, false)
      }
    },
    [EMediaAction.HANDLE_SELECT_DIRECTORY]({ commit }, payload) {
      commit(EMediaMutation.SET_SELECTED_DIRECTORY, payload)
    },
    async [EMediaAction.CREATE_FOLDER]({ commit, dispatch }, payload) {
      try {
        commit(EMediaMutation.SET_IS_SUBMITTING, true)
        const res = await createFolderApi(payload)
        if (res?.message) toast.info(res.message)
        dispatch(EMediaAction.GET_DIRECTORIES)
      } catch (e) {
        toast.error(ERROR_MESSAGE.SUBMIT)
      } finally {
        commit(EMediaMutation.SET_IS_SUBMITTING, false)
      }
    },
    async [EMediaAction.UPLOAD_FILE]({ commit, dispatch }, payload) {
      try {
        commit(EMediaMutation.SET_IS_SUBMITTING, true)
        const res = await saveFileApi(payload)
        if (res?.message) toast.info(res.message)
        dispatch(EMediaAction.GET_DIRECTORIES)
      } catch (e) {
        toast.error(ERROR_MESSAGE.SUBMIT)
      } finally {
        commit(EMediaMutation.SET_IS_SUBMITTING, false)
      }
    },
    async [EMediaAction.DELETE_FILE_OR_FOLDER]({ commit, dispatch }, payload) {
      try {
        commit(EMediaMutation.SET_IS_SUBMITTING, true)
        const res = await deleteFileAndFolderApi(payload)
        if (res?.message) toast.info(res.message)
        dispatch(EMediaAction.GET_DIRECTORIES)
      } catch (e) {
        toast.error(ERROR_MESSAGE.SUBMIT)
      } finally {
        commit(EMediaMutation.SET_IS_SUBMITTING, false)
      }
    },
    async [EMediaAction.RENAME_FILE_OF_FOLDER]({ commit, dispatch }, payload) {
      try {
        commit(EMediaMutation.SET_IS_SUBMITTING, true)
        const res = await renameFileAndFolderApi(payload)
        if (res?.message) toast.info(res.message)
        dispatch(EMediaAction.GET_DIRECTORIES)
      } catch (e) {
        toast.error(ERROR_MESSAGE.SUBMIT)
      } finally {
        commit(EMediaMutation.SET_IS_SUBMITTING, false)
      }
    },
    [EMediaAction.HANDLE_SET_SELECTED_FILES]({ commit }, payload) {
      commit(EMediaMutation.SET_SELECTED_FILES, payload)
    }
  }
}

export default mediaModule
