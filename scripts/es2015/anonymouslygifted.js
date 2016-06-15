import { requestWebsite } from './config'

const siteData = {
  mainSite: 'http://anonymouslygifted.com/',
  mainSiteElements: '.postMain .post .more-link',
  subSiteElements: '.postMain .post'
}

export function anonymouslygifted() {
  requestWebsite(siteData)
}
