import config from '@/config'

export const generateImageUrl = (fileId: string) => {
  return `${config.server}${config.cdn}/${fileId}`
}
