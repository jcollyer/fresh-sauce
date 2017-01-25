import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://crackedatoms.com/',
  mainSiteElements: '',
  subSiteElements: '.content',
  noSubSite: true,
  genre: ['hip-hop', 'pop']
}

export function crackedatoms(allIds) {
  requestWebsite(siteData, allIds)
}
