import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://djbooth.net/news',
  mainSiteElements: '.tracks.clearfix a',
  subSiteElements: '.entry-text',
  noSubSite: false,
  genre: ['hip-hop']
}

export function djbooth(allIds) {
  requestWebsite(siteData, allIds)
}
