import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://soulmusicsongs.tumblr.com/',
  mainSiteElements: '',
  subSiteElements: '.entry',
  noSubSite: true,
  genre: ['classic']
}

export function soulmusicsongs() {
  requestWebsite(siteData)
}
