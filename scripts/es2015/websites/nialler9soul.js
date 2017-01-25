import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://nialler9.com/new-music/soul-funk-r-b/',
  mainSiteElements: 'h1.single-title a',
  subSiteElements: 'span.embed-youtube',
  noSubSite: false,
  genre: ['soul']
}

export function nialler9soul(allIds) {
  requestWebsite(siteData, allIds)
}
