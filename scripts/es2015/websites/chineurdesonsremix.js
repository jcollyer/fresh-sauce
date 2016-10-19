import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://www.chineurdesons.com/nu-disco/',
  mainSiteElements: '',
  subSiteElements: '.post-thumb',
  noSubSite: true,
  genre: ['remix']
}

export function chineurdesonsremix() {
  requestWebsite(siteData)
}
