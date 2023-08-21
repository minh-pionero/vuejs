import client from '.'
import type { MediaItemType } from '@/types/media.type'

export const getDirectoriesApi = (): Promise<{ data: MediaItemType[] }> =>
  client.get('/directory').then((res) => res.data)

export const saveFileApi = (payload: { file: File; filePath: string }) => {
  const form = new FormData()
  form.append('file', payload.file)
  form.append('filePath', payload.filePath)

  return client.post('/directory/files', form).then((res) => res.data)
}

export const createFolderApi = (payload: { path: string; name: string }) => {
  const form = new FormData()
  form.append('folderPath', payload.path)
  form.append('folderName', payload.name)

  return client.post('/directory/folder', form).then((res) => res.data)
}

export const renameFileAndFolderApi = (payload: { oldName: string; newName: string }) => {
  const form = new FormData()
  form.append('oldName', payload.oldName)
  form.append('newName', payload.newName)

  return client.post('/directory/rename', form).then((res) => res.data)
}

export const deleteFileAndFolderApi = (payload: any) => {
  const form = new FormData()
  form.append('path', payload.path)
  form.append('isFolder', payload.isFolder)

  return client.post('/directory/file-folder', form).then((res) => res.data)
}
