import { requestWebsite } from './config'

const siteData = {
  mainSite: 'http://goodmusicallday.com/category/music/',
  mainSiteElements: '',
  subSiteElements: 'a.data-song-parent',
  noSubSite: true
}

export function goodmusicallday() {
  requestWebsite(siteData)
}
