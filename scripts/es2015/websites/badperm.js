import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://www.bad-perm.com/fresh-cuts-music/',
  mainSiteElements: '.block-item-big.post a',
  subSiteElements: '.post-entry p',
  noSubSite: false,
  genre: ['hip-hop']
}

export function badperm(allIds) {
  requestWebsite(siteData, allIds)
}
