import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://nialler9.com/new-music/rap-hip-hop/',
  mainSiteElements: 'h1.single-title a',
  subSiteElements: 'span.embed-youtube',
  noSubSite: false,
  genre: ['hip-hop']
}

export function nialler9hiphop() {
  requestWebsite(siteData)
}
