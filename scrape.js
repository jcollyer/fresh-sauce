var ids = [];

var casper = require('casper').create({
   verbose: true
});


function getSCids() {
  var SCids = document.querySelectorAll('.sqs-block-content p iframe');
  return Array.prototype.map.call(SCids, function(e) {
    return e.getAttribute('src').substr(73,9);
  });
};

casper.start('http://www.mugatunes.com/homestream');

casper.then(function() {
  ids = this.evaluate(getSCids);
  // this.echo(ids);
});

casper.run(function() {
    this.echo(ids.length + ' ids found:');
    this.echo(' - ' + ids.join('\n - ')).exit();
});



// var links = [];
// var casper = require('casper').create();
//
// function getLinks() {
//     // this.echo("function getLInks");
//     var links = document.querySelectorAll('h3.r a');
//     return Array.prototype.map.call(links, function(e) {
//         return e.getAttribute('href');
//     });
// }
//
// casper.start('http://google.fr/', function() {
//     // search for 'casperjs' from google form
//     this.fill('form[action="/search"]', { q: 'casperjs' }, true);
// });
//
// casper.then(function() {
//     // aggregate results for the 'casperjs' search
//     links = this.evaluate(getLinks);
//     // now search for 'phantomjs' by filling the form again
//     this.fill('form[action="/search"]', { q: 'phantomjs' }, true);
// });
//
// casper.then(function() {
//     // aggregate results for the 'phantomjs' search
//     links = links.concat(this.evaluate(getLinks));
// });
//
// casper.run(function() {
//     // echo results in some pretty fashion
//     this.echo(links.length + ' links found:');
//     this.echo(' - ' + links.join('\n - ')).exit();
// });
