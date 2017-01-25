import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'https://dimestoresaints.wordpress.com/',
  mainSiteElements: '',
  subSiteElements: 'article .post-content',
  noSubSite: true,
  genre: ['chill']
}

export function dimestoresaints(allIds) {
  requestWebsite(siteData, allIds)
}
