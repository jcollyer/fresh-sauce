import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://www.chineurdesons.com/chillout/',
  mainSiteElements: '',
  subSiteElements: '.post-thumb',
  noSubSite: true,
  genre: ['chill']
}

export function chineurdesonschill() {
  requestWebsite(siteData)
}
