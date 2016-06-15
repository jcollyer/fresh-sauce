import { getAllIds, requestMainSite } from './config'

const siteInfo = {
  mainSite: 'http://anonymouslygifted.com/',
  mainSiteElements: '.postMain .post .more-link',
  subSiteElements: '.postMain .post'
}

export function anonymouslygifted() {
  getAllIds((ids) => {
    requestMainSite(ids, siteInfo)
  })
}
