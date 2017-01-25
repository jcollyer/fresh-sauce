import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://neongoldrecords.com/',
  mainSiteElements: '',
  subSiteElements: '.post .post-bodycopy.clearfix p',
  noSubSite: true,
  genre: ['pop']
}

export function neongoldrecords(allIds) {
  requestWebsite(siteData, allIds)
}
