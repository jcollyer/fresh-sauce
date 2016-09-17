import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://emergingindiebands.com/category/music-videos-and-audio/',
  mainSiteElements: '',
  subSiteElements: '.entry-content.clearfix',
  noSubSite: true,
  genre: ['bands']
}

export function emergingindiebands() {
  requestWebsite(siteData)
}
