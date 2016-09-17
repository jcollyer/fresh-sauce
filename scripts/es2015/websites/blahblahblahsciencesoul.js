import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://blahblahblahscience.com/category/soul',
  mainSiteElements: 'a.gridClickThru',
  subSiteElements: '.post .entry p',
  noSubSite: false,
  genre: ['soul']
}

export function blahblahblahsciencesoul() {
  requestWebsite(siteData)
}
