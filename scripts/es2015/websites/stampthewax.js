import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://www.stampthewax.com/category/new-music/',
  mainSiteElements: '.entry-image  a',
  subSiteElements: '.single-box.clearfix.entry-content p',
  noSubSite: false,
  genre: ['funk']
}

export function stampthewax(allIds) {
  requestWebsite(siteData, allIds)
}
