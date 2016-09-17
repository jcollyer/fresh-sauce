import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://www.stampthewax.com/category/new-music/',
  mainSiteElements: '.entry-image  a',
  subSiteElements: '.single-box.clearfix.entry-content p',
  noSubSite: false,
  genre: ['house']
}

export function stampthewax() {
  requestWebsite(siteData)
}
