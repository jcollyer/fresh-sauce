import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://www.cream.cz/',
  mainSiteElements: '.featured-thumb a',
  subSiteElements: '.entry-content',
  noSubSite: false,
  genre: ['hip-hop']
}

export function cream(allIds) {
  requestWebsite(siteData, allIds)
}
