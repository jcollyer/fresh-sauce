import { requestWebsite } from '../config'

const siteData = {
  mainSite: 'https://highyellowsoul.com/',
  mainSiteElements: '',
  subSiteElements: '.entry-content p .embed-youtube',
  noSubSite: true,
  genre: ['soul']
}

export function highyellowsoul() {
  requestWebsite(siteData)
}
