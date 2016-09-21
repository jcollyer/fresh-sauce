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

var _sophistefunk = require('./websites/sophistefunk.js');

var _soulmusicsongs = require('./websites/soulmusicsongs.js');

var _stampthewax = require('./websites/stampthewax.js');

var _wearegoingsolo = require('./websites/wearegoingsolo.js');

var funcs = [
// allthingsgomusic,
// anonymouslygifted,
// blahblahblahsciencesoul,
// bound2hiphop,
// dimestoresaints,
// emergingindiebands,
// carolinaontherise,
// fivechicago,
// goodmusicallday,
_neongoldrecords.neongoldrecords
// sophistefunk,
// soulmusicsongs,
// stampthewax,
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
