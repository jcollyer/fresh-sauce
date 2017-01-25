import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://zillanoise.com/',
  mainSiteElements: '.mh-loop-header h3 a',
  subSiteElements: '.entry-content.clearfix p',
  noSubSite: false,
  genre: ['hip-hop']
}

export function zillanoise(allIds) {
  requestWebsite(siteData, allIds)
}
