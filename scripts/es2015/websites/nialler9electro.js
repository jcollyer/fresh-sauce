import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://nialler9.com/new-music/electronic-music/',
  mainSiteElements: 'h1.single-title a',
  subSiteElements: 'span.embed-youtube',
  noSubSite: false,
  genre: ['chill']
}

export function nialler9electro(allIds) {
  requestWebsite(siteData, allIds)
}
