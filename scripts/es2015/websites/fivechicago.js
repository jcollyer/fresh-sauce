import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://5chicago.com/category/tracks/new-releases/',
  mainSiteElements: '.td_module_11 .td-module-thumb a',
  subSiteElements: '.td-post-featured-video .wpb_video_wrapper',
  noSubSite: false,
  genre: ['house']
}

export function fivechicago() {
  requestWebsite(siteData)
}
