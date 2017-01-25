import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://www.sophistefunk.com/',
  mainSiteElements: '',
  subSiteElements: '.entry-content.clearfix',
  noSubSite: true,
  genre: ['funk']
}

export function sophistefunk(allIds) {
  requestWebsite(siteData, allIds)
}
