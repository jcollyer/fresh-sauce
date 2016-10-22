'use strict';

var _allthingsgomusic = require('./websites/allthingsgomusic.js');

var _anonymouslygifted = require('./websites/anonymouslygifted.js');

var _badperm = require('./websites/badperm.js');

var _beatmecca = require('./websites/beatmecca.js');

var _beatspill = require('./websites/beatspill.js');

var _blahblahblahsciencesoul = require('./websites/blahblahblahsciencesoul.js');

var _bound2hiphop = require('./websites/bound2hiphop.js');

var _bsand3s = require('./websites/bsand3s.js');

var _carolinaontherise = require('./websites/carolinaontherise.js');

var _chicityhiphop = require('./websites/chicityhiphop.js');

var _chineurdesonschill = require('./websites/chineurdesonschill.js');

var _chineurdesonsremix = require('./websites/chineurdesonsremix.js');

var _crackedatoms = require('./websites/crackedatoms.js');

var _cream = require('./websites/cream.js');

var _dimestoresaints = require('./websites/dimestoresaints.js');

var _djbooth = require('./websites/djbooth.js');

var _emergingindiebands = require('./websites/emergingindiebands.js');

var _fivechicago = require('./websites/fivechicago.js');

var _goodmusicallday = require('./websites/goodmusicallday.js');

var _highyellowsoul = require('./websites/highyellowsoul.js');

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

var _zillanoise = require('./websites/zillanoise.js');

var funcs = [_allthingsgomusic.allthingsgomusic, _anonymouslygifted.anonymouslygifted, _badperm.badperm, _beatmecca.beatmecca, _beatspill.beatspill, //new
_blahblahblahsciencesoul.blahblahblahsciencesoul, _bound2hiphop.bound2hiphop, //0(w 'this')
_bsand3s.bsand3s, //new
_carolinaontherise.carolinaontherise, _chicityhiphop.chicityhiphop, //new
_chineurdesonschill.chineurdesonschill, //new
_chineurdesonsremix.chineurdesonsremix, //new
_crackedatoms.crackedatoms, //new
_cream.cream, _dimestoresaints.dimestoresaints, //1(w/out 'this') 3(w/ 'this')
_djbooth.djbooth, _emergingindiebands.emergingindiebands, //1(w/out 'this')
_fivechicago.fivechicago, _goodmusicallday.goodmusicallday, //1(w/out 'this')
_highyellowsoul.highyellowsoul, //new
// neongoldrecords, //1(w/out 'this')
_nialler9electro.nialler9electro, _nialler9hiphop.nialler9hiphop, _nialler9soul.nialler9soul, _repeatbutton.repeatbutton, _sinimabeats.sinimabeats, _sophistefunk.sophistefunk, //0(w/out 'this') 0(w/ 'this')
_soulmusicsongs.soulmusicsongs, //1(w/out 'this')
_stampthewax.stampthewax, _thebluewalrus.thebluewalrus, _theburningearremix.theburningearremix, _thenewlofi.thenewlofi, //1(w/out 'this')
_wearegoingsolo.wearegoingsolo, _zillanoise.zillanoise // not testeted
];

funcs.forEach(function (func, i) {
  console.log(func, i);
  func(); //run functions from files
});

setTimeout(function () {
  console.log("bye...");
  process.exit();
}, 30000);