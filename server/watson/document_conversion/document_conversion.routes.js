// Controllers
var documentConversionController = require('./document_conversion.controller.js');

module.exports = function(app) {

  app.post('/api/document-conversion', documentConversionController.post);

};
