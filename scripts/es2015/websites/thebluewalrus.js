import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://thebluewalrus.com/',
  mainSiteElements: '.post-img  a',
  subSiteElements: '.post-entry p',
  noSubSite: false,
  genre: ['soul']
}

export function thebluewalrus() {
  requestWebsite(siteData)
}
