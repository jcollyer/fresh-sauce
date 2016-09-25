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

var _sophistefunk = require('./websites/sophistefunk.js');

var _soulmusicsongs = require('./websites/soulmusicsongs.js');

var _stampthewax = require('./websites/stampthewax.js');

var _thebluewalrus = require('./websites/thebluewalrus.js');

var _theburningearremix = require('./websites/theburningearremix.js');

var _thenewlofi = require('./websites/thenewlofi.js');

var _wearegoingsolo = require('./websites/wearegoingsolo.js');

var funcs = [_allthingsgomusic.allthingsgomusic, _anonymouslygifted.anonymouslygifted, _blahblahblahsciencesoul.blahblahblahsciencesoul, _bound2hiphop.bound2hiphop, _dimestoresaints.dimestoresaints, //1
_emergingindiebands.emergingindiebands, //1
_carolinaontherise.carolinaontherise, _fivechicago.fivechicago, _goodmusicallday.goodmusicallday, //1
_neongoldrecords.neongoldrecords, //1
_nialler9electro.nialler9electro, _nialler9hiphop.nialler9hiphop, _nialler9soul.nialler9soul, _repeatbutton.repeatbutton, _sophistefunk.sophistefunk, //0
_soulmusicsongs.soulmusicsongs, //1
_stampthewax.stampthewax, _thebluewalrus.thebluewalrus, _theburningearremix.theburningearremix, _thenewlofi.thenewlofi, //1
_wearegoingsolo.wearegoingsolo];

setTimeout(function () {
  console.log("bye...");
  process.exit();
}, 30000);

funcs.forEach(function (func, i) {
  console.log(func, i);
  func();
});