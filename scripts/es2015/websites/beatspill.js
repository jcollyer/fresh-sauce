import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'https://beatspill.com/',
  mainSiteElements: '',
  subSiteElements: '.entry',
  noSubSite: true,
  genre: ['hip-hop']
}

export function beatspill(allIds) {
  requestWebsite(siteData, allIds)
}
