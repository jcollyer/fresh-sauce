import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://carolinaontherise.com/',
  mainSiteElements: '.item-list a',
  subSiteElements: '.entry p',
  noSubSite: false,
  genre: 'hip-hop'
}

export function carolinaontherise() {
  requestWebsite(siteData)
}
