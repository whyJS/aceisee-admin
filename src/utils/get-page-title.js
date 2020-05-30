import defaultSettings from '@/settings'

const title = defaultSettings.title || '艾思教育-词汇管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
