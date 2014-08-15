var AUTHOR  = 'Author: Cristian Dinu, Read Forward';
var LICENSE = 'License: MPL v2';

var express = require('express');
var app = express();
var compression = require('compression')
var request = require('request');

var fbJSON = JSON.stringify({});
var lastRefresh = 0;


var interval  = process.env.REFRESH_INTERVAL || 120;
var pageId    = process.env.FB_PAGE_ID || '130380413723811';
var userAgent = process.env.USER_AGENT ||
                  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) ' +
                  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36';


app.use(compression());

app.get('/', function(req, res) {
  res.type('text/plain');
  res.header('Access-Control-Allow-Origin', '*');
  res.end(['This is a web service, not a web page.',
            AUTHOR,
            LICENSE].join('\n'));

});

app.get('/v1.0/macovei-fb-proxy.json', function(req, res){
  res.type('application/json');
  res.end(fbJSON);

  var now = +new Date();
  if (now - lastRefresh > interval * 1000) {
    refreshJSON();
  }
});

var options = {
    url: 'https://www.facebook.com/feeds/page.php?format=json&id=' + pageId,
    headers: {
        'User-Agent': userAgent
    }
};

function refreshJSON () {
  lastRefresh = +new Date();
  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      fbJSON = body;
    } else {
      console.error('Cannot fetch JSON', error);
      fbJSON = JSON.stringify({});
    }
  });
}

refreshJSON();

var server = app.listen(process.env.PORT || 8080, function() {
  console.log('Listening on port %d', server.address().port);
});
