import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://blahblahblahscience.com/category/soul',
  mainSiteElements: 'a.gridClickThru',
  subSiteElements: '.post .entry',
  noSubSite: false,
  genre: ['soul']
}

export function blahblahblahsciencesoul(allIds) {
  requestWebsite(siteData, allIds)
}
