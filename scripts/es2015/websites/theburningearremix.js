import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://www.theburningear.com/category/tracks/remixes/',
  mainSiteElements: '',
  subSiteElements: '.entry-content .avia-iframe-wrap',
  noSubSite: true,
  genre: ['remix']
}

export function theburningearremix() {
  requestWebsite(siteData)
}
