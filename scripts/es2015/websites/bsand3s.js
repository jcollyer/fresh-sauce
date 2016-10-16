import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://bsand3s.com/bostonhiphop/',
  mainSiteElements: '.entry-thumbnail.clearfix a',
  subSiteElements: '.entry-content.clearfix p',
  noSubSite: false,
  genre: ['hip-hop']
}

export function bsand3s() {
  requestWebsite(siteData)
}
