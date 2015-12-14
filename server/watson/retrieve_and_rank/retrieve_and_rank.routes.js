// Controllers
var retrieveAndRankController = require('./retrieve_and_rank.controller.js');

module.exports = function(app) {

  app.post('/api/retrieve-and-rank', retrieveAndRankController.post);

};
