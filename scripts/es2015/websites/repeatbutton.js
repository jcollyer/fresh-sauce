import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'http://www.repeatbutton.com/',
  mainSiteElements: '.home_post_box a',
  subSiteElements: '.single_inside_content div',
  noSubSite: false,
  genre: ['pop']
}

export function repeatbutton() {
  requestWebsite(siteData)
}
