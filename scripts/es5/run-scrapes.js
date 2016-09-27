'use strict';

var _bluebird = require('bluebird');

var _allthingsgomusic = require('./websites/allthingsgomusic.js');

var _anonymouslygifted = require('./websites/anonymouslygifted.js');

var _blahblahblahsciencesoul = require('./websites/blahblahblahsciencesoul.js');

var _bound2hiphop = require('./websites/bound2hiphop.js');

var _dimestoresaints = require('./websites/dimestoresaints.js');

var _emergingindiebands = require('./websites/emergingindiebands.js');

var _carolinaontherise = require('./websites/carolinaontherise.js');

var _fivechicago = require('./websites/fivechicago.js');

var _goodmusicallday = require('./websites/goodmusicallday.js');

var _neongoldrecords = require('./websites/neongoldrecords.js');

var _nialler9electro = require('./websites/nialler9electro.js');

var _nialler9hiphop = require('./websites/nialler9hiphop.js');

var _nialler9soul = require('./websites/nialler9soul.js');

var _repeatbutton = require('./websites/repeatbutton.js');

var _sinimabeats = require('./websites/sinimabeats.js');

var _sophistefunk = require('./websites/sophistefunk.js');

var _soulmusicsongs = require('./websites/soulmusicsongs.js');

var _stampthewax = require('./websites/stampthewax.js');

var _thebluewalrus = require('./websites/thebluewalrus.js');

var _theburningearremix = require('./websites/theburningearremix.js');

var _thenewlofi = require('./websites/thenewlofi.js');

var _wearegoingsolo = require('./websites/wearegoingsolo.js');

var funcs = [
// allthingsgomusic,
// anonymouslygifted,
// blahblahblahsciencesoul,
// bound2hiphop, //0(w 'this')
// dimestoresaints, //1(w/out 'this') 3(w/ 'this')
// emergingindiebands, //1(w/out 'this')
// carolinaontherise,
// fivechicago,
// goodmusicallday, //1(w/out 'this')
// neongoldrecords, //1(w/out 'this')
// nialler9electro,
// nialler9hiphop,
// nialler9soul,
// repeatbutton,
_sinimabeats.sinimabeats
// sophistefunk, //0(w/out 'this') 0(w/ 'this')
// soulmusicsongs, //1(w/out 'this')
// stampthewax,
// thebluewalrus,
// theburningearremix,
// thenewlofi, //1(w/out 'this')
// wearegoingsolo
];

setTimeout(function () {
  console.log("bye...");
  process.exit();
}, 30000);

funcs.forEach(function (func, i) {
  console.log(func, i);
  func();
});