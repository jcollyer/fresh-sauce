
var fs = require('fs');
var casper = require('casper').create();
var ids = [];
var path = 'scrapes/ids.json';


function getSCids() {
  var SCids = document.querySelectorAll('.sqs-block-content p iframe');
  return Array.prototype.map.call(SCids, function(e) {
    return e.getAttribute('src').substr(73,9);
  });
};

casper.start('http://www.mugatunes.com/homestream');

casper.then(function() {
  ids = this.evaluate(getSCids);
  this.echo(ids);
});

casper.run(function() {
    fs.write(path, ids, 'w');
    this.echo(ids.length + ' ids found:');
    this.echo(' - ' + ids.join('\n - ')).exit();
});
