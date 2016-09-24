import { Promise } from 'bluebird'
import { allthingsgomusic } from './websites/allthingsgomusic.js'
import { anonymouslygifted } from './websites/anonymouslygifted.js'
import { blahblahblahsciencesoul } from './websites/blahblahblahsciencesoul.js'
import { bound2hiphop } from './websites/bound2hiphop.js'
import { dimestoresaints } from './websites/dimestoresaints.js'
import { emergingindiebands } from './websites/emergingindiebands.js'
import { carolinaontherise } from './websites/carolinaontherise.js'
import { fivechicago } from './websites/fivechicago.js'
import { goodmusicallday } from './websites/goodmusicallday.js'
import { neongoldrecords } from './websites/neongoldrecords.js'
import { nialler9hiphop } from './websites/nialler9hiphop.js'
import { sophistefunk } from './websites/sophistefunk.js'
import { soulmusicsongs } from './websites/soulmusicsongs.js'
import { stampthewax } from './websites/stampthewax.js'
import { wearegoingsolo } from './websites/wearegoingsolo.js'

const funcs = [
  allthingsgomusic,
  anonymouslygifted,
  blahblahblahsciencesoul,
  bound2hiphop,
  dimestoresaints,
  emergingindiebands,
  carolinaontherise,
  fivechicago,
  goodmusicallday,
  neongoldrecords,
  nialler9hiphop,
  sophistefunk,
  soulmusicsongs,
  stampthewax,
  wearegoingsolo
]

setTimeout(() => {
  console.log("bye...")
  process.exit()
},30000)

funcs.forEach((func, i)=>{
  console.log(func, i)
  func()
})
