// Controllers
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var uploadController = require('./upload.controller.js');

module.exports = function(app) {

  // List Solr clusters
  app.post('/api/upload', multipartyMiddleware, uploadController.uploadFile);
  // Create Solr cluster
};
