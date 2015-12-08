// Controllers
var nlcController = require('./nlc.controller.js');

module.exports = function(app) {

  app.post('/api/nlc', nlcController.post);

};
