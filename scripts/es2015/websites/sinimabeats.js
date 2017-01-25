import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://sinimabeats.net/blog/',
  mainSiteElements: '',
  subSiteElements: '.content.clearfix',
  noSubSite: true,
  genre: ['beats']
}

export function sinimabeats(allIds) {
  requestWebsite(siteData, allIds)
}
