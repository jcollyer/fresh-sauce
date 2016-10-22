import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://www.dotgotit.com/',
  mainSiteElements: '.post .new-post a',
  subSiteElements: '.new-post',
  noSubSite: false,
  genre: ['hip-hop']
}

export function dotgotit() {
  requestWebsite(siteData)
}
