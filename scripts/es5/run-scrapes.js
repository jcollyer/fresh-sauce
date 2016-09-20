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

var _sophistefunk = require('./websites/sophistefunk.js');

var _soulmusicsongs = require('./websites/soulmusicsongs.js');

var _stampthewax = require('./websites/stampthewax.js');

var funcs = [_allthingsgomusic.allthingsgomusic, _anonymouslygifted.anonymouslygifted, _blahblahblahsciencesoul.blahblahblahsciencesoul, _bound2hiphop.bound2hiphop, _dimestoresaints.dimestoresaints, _emergingindiebands.emergingindiebands, _carolinaontherise.carolinaontherise, _fivechicago.fivechicago, _goodmusicallday.goodmusicallday, _sophistefunk.sophistefunk, _soulmusicsongs.soulmusicsongs, _stampthewax.stampthewax];

setTimeout(function () {
  console.log("bye...");
  process.exit();
}, 30000);

funcs.forEach(function (func, i) {
  console.log(func, i);
  func();
});
