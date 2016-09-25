import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://thenewlofi.com/',
  mainSiteElements: '',
  subSiteElements: '.post .entry p',
  noSubSite: true,
  genre: ['bands']
}

export function thenewlofi() {
  requestWebsite(siteData)
}
