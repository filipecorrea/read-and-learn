var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Config Express
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Serve the angular client
app.use('/', express.static(__dirname + '/client'));

// Features
require('./server/utils/upload/upload.routes.js')(app);
require('./server/watson/document_conversion/document_conversion.routes.js')(app);
require('./server/watson/retrieve_and_rank/retrieve_and_rank.routes.js')(app);

// Start server
var server = app.listen(process.env.VCAP_APP_PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

	console.log('Node server running on port 3000.');
});
