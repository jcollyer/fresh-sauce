import { getAllIds, requestMainSite } from './config'

const siteInfo = {
  mainSite: 'https://bound2hiphop.com/category/singles/',
  mainSiteElements: '.small-12.medium-4.columns .post-gallery a',
  subSiteElements: '.entry-content'
}

export function bound2hiphop() {
  getAllIds((ids) => {
    requestMainSite(ids, siteInfo)
  })
}
