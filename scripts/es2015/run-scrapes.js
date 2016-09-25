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
import { nialler9electro } from './websites/nialler9electro.js'
import { nialler9hiphop } from './websites/nialler9hiphop.js'
import { nialler9soul } from './websites/nialler9soul.js'
import { repeatbutton } from './websites/repeatbutton.js'
import { sophistefunk } from './websites/sophistefunk.js'
import { soulmusicsongs } from './websites/soulmusicsongs.js'
import { stampthewax } from './websites/stampthewax.js'
import { thebluewalrus } from './websites/thebluewalrus.js'
import { theburningearremix } from './websites/theburningearremix.js'
import { thenewlofi } from './websites/thenewlofi.js'
import { wearegoingsolo } from './websites/wearegoingsolo.js'

const funcs = [
  allthingsgomusic,
  anonymouslygifted,
  blahblahblahsciencesoul,
  bound2hiphop,
  dimestoresaints, //1
  emergingindiebands, //1
  carolinaontherise,
  fivechicago,
  goodmusicallday, //1
  neongoldrecords, //1
  nialler9electro,
  nialler9hiphop,
  nialler9soul,
  repeatbutton,
  sophistefunk, //0
  soulmusicsongs, //1
  stampthewax,
  thebluewalrus,
  theburningearremix,
  thenewlofi, //1
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
