import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://www.wearegoingsolo.com/tracks/',
  mainSiteElements: '.content-ombre .content-block  a',
  subSiteElements: '.content-block.single-post .block-content',
  noSubSite: false,
  genre: ['chill', 'bands']
}

export function wearegoingsolo(allIds) {
  requestWebsite(siteData, allIds)
}
