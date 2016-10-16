const funcs = [
  allthingsgomusic,
  anonymouslygifted,
  badperm,
  beatmecca,
  beatspill, //new
  blahblahblahsciencesoul,
  bound2hiphop, //0(w 'this')
  bsand3s, //new
  dimestoresaints, //1(w/out 'this') 3(w/ 'this')
  emergingindiebands, //1(w/out 'this')
  carolinaontherise,
  fivechicago,
  goodmusicallday, //1(w/out 'this')
  highyellowsoul, //new
  neongoldrecords, //1(w/out 'this')
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

funcs.forEach((func, i)=>{
  import { funcs[i] } from './websites/'+functs[i]+'.js' //import files
  console.log(func, i)
  func() //run functions from files
})

setTimeout(() => {
  console.log("bye...")
  process.exit()
},30000)
