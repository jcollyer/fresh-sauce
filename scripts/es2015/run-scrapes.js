import { getAllTheIdsPromise } from './config.js'
import { allthingsgomusic } from './websites/allthingsgomusic.js'
import { anonymouslygifted } from './websites/anonymouslygifted.js'
import { badperm } from './websites/badperm.js'
import { beatmecca } from './websites/beatmecca.js'
import { beatspill } from './websites/beatspill.js'
import { blahblahblahsciencesoul } from './websites/blahblahblahsciencesoul.js'
import { bound2hiphop } from './websites/bound2hiphop.js'
import { bsand3s } from './websites/bsand3s.js'
import { carolinaontherise } from './websites/carolinaontherise.js'
import { chicityhiphop } from './websites/chicityhiphop.js'
import { chineurdesonschill } from './websites/chineurdesonschill.js'
import { chineurdesonsremix } from './websites/chineurdesonsremix.js'
import { crackedatoms } from './websites/crackedatoms.js'
import { cream } from './websites/cream.js'
import { dimestoresaints } from './websites/dimestoresaints.js'
import { djbooth } from './websites/djbooth.js'
import { dotgotit } from './websites/dotgotit.js'
import { emergingindiebands } from './websites/emergingindiebands.js'
import { fivechicago } from './websites/fivechicago.js'
import { goodmusicallday } from './websites/goodmusicallday.js'
import { highyellowsoul } from './websites/highyellowsoul.js'
import { neongoldrecords } from './websites/neongoldrecords.js'
import { nialler9electro } from './websites/nialler9electro.js'
import { nialler9hiphop } from './websites/nialler9hiphop.js'
import { nialler9soul } from './websites/nialler9soul.js'
import { repeatbutton } from './websites/repeatbutton.js'
import { sinimabeats } from './websites/sinimabeats.js'
import { sophistefunk } from './websites/sophistefunk.js'
import { soulmusicsongs } from './websites/soulmusicsongs.js'
import { stampthewax } from './websites/stampthewax.js'
import { thebluewalrus } from './websites/thebluewalrus.js'
import { theburningearremix } from './websites/theburningearremix.js'
import { thenewlofi } from './websites/thenewlofi.js'
import { wearegoingsolo } from './websites/wearegoingsolo.js'
import { zillanoise } from './websites/zillanoise.js'

const funcs = [
  allthingsgomusic,
  anonymouslygifted,
  badperm,
  beatmecca,
  beatspill, //new
  blahblahblahsciencesoul,
  bound2hiphop, //0(w 'this')
  bsand3s, //new
  carolinaontherise,
  chicityhiphop, //new
  chineurdesonschill, //new
  chineurdesonsremix, //new
  crackedatoms, //new
  cream,
  dimestoresaints, //1(w/out 'this') 3(w/ 'this')
  djbooth,
  dotgotit,
  emergingindiebands, //1(w/out 'this')
  fivechicago,
  goodmusicallday, //1(w/out 'this')
  highyellowsoul, //new
  // neongoldrecords, //1(w/out 'this')
  nialler9electro,
  nialler9hiphop,
  nialler9soul,
  repeatbutton,
  sinimabeats,
  sophistefunk, //0(w/out 'this') 0(w/ 'this')
  soulmusicsongs, //1(w/out 'this')
  stampthewax,
  thebluewalrus,
  theburningearremix,
  thenewlofi, //1(w/out 'this')
  wearegoingsolo,
  zillanoise // not testeted
]

getAllTheIdsPromise.then((allIds)=>{
  funcs.forEach((func, i)=>{
    console.log(func, 1 + i)
    func(allIds)
  })
})

setTimeout(() => {
  console.log("bye...")
  process.exit()
},30000)
