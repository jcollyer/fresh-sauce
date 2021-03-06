import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'https://bound2hiphop.com/category/singles/',
  mainSiteElements: '.small-12.medium-4.columns .post-gallery a',
  subSiteElements: '.entry-content',
  noSubSite: false,
  genre: ['hip-hop']
}

export function bound2hiphop(allIds) {
  requestWebsite(siteData, allIds)
}
