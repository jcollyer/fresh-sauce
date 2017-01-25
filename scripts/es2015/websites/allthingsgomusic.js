import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'https://www.allthingsgomusic.com/popular/month',
  mainSiteElements: 'section.entry-summary a',
  subSiteElements: 'section.entry-content .content p',
  noSubSite: false,
  genre: ['pop']
}

export function allthingsgomusic(allIds) {
  requestWebsite(siteData, allIds)
}
