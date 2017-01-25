import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://www.chicityhiphop.net/',
  mainSiteElements: '',
  subSiteElements: '.entry-content',
  noSubSite: true,
  genre: ['hip-hop']
}

export function chicityhiphop(allIds) {
  requestWebsite(siteData, allIds)
}
