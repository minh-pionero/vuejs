import client from '.'
import type { MediaItemType } from '@/types/media.type'

export const getDirectoriesApi = (): Promise<{ data: MediaItemType[] }> =>
  client.get('/directory').then((res) => res.data)
