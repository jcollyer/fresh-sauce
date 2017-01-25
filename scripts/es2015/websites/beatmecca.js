import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://beatmecca.com/music/',
  mainSiteElements: '.pt-cv-ifield a',
  subSiteElements: '.entry-media.sc-iframe',
  noSubSite: false,
  genre: ['beats']
}

export function beatmecca(allIds) {
  requestWebsite(siteData, allIds)
}
