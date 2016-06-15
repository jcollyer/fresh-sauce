import { getAllIds, requestMainSite } from './config'

const siteInfo = {
  mainSite: 'http://carolinaontherise.com/',
  mainSiteElements: '.item-list a',
  subSiteElements: '.entry p'
}

export function carolinaontherise() {
  getAllIds((ids) => {
    requestMainSite(ids, siteInfo)
  })
}
