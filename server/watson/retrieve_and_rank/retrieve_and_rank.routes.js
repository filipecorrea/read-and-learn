// Controllers
var retrieveAndRankController = require('./retrieve_and_rank.controller.js');

module.exports = function(app) {

  // List Solr clusters
  app.get('/api/retrieve-and-rank', retrieveAndRankController.listClusters);
  // Create Solr cluster
  app.get('/api/retrieve-and-rank/create', retrieveAndRankController.createCluster);
  // Get information about a Solr cluster
  // http://localhost:3000/api/retrieve-and-rank/scf9b13b48_1835_48cf_ac7f_143b7bb8712b
  app.get('/api/retrieve-and-rank/:cluster_id', retrieveAndRankController.readCluster);
  // Delete Solr cluster
  app.get('/api/retrieve-and-rank/delete/:cluster_id', retrieveAndRankController.deleteCluster);

  // List Solr configurations
  app.get('/api/retrieve-and-rank/:cluster_id/configurations', retrieveAndRankController.listConfigurations);
  // TODO Upload Solr configuration
  // http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/retrieve-and-rank/api/v1/
  // TODO Get configuration
  // http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/retrieve-and-rank/api/v1/
  // TODO Delete configuration
  // http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/retrieve-and-rank/api/v1/

  // List Solr collections
  // http://localhost:3000/api/retrieve-and-rank/scf9b13b48_1835_48cf_ac7f_143b7bb8712b/example-config/collections
  app.get('/api/retrieve-and-rank/:cluster_id/:config_name/collections', retrieveAndRankController.listCollections);
  // Create Solr collection
  app.get('/api/retrieve-and-rank/:cluster_id/:config_name/create/:collection_name', retrieveAndRankController.createCollection);
  // Delete Solr collection
  app.get('/api/retrieve-and-rank/:cluster_id/:config_name/delete/:collection_name', retrieveAndRankController.deleteCollection);

  // Index documents
  app.post('/api/retrieve-and-rank/:cluster_id/:config_name/:collection_name', retrieveAndRankController.indexDocument);
  // List documents
  // http://localhost:3000/api/retrieve-and-rank/scf9b13b48_1835_48cf_ac7f_143b7bb8712b/example-config/example-collection2/documents
  app.get('/api/retrieve-and-rank/:cluster_id/:config_name/:collection_name/documents', retrieveAndRankController.listDocuments);
  // Search Solr standard query parser
  app.get('/api/retrieve-and-rank/:cluster_id/:config_name/:collection_name', retrieveAndRankController.searchDocument);

  // TODO Create ranker
  // http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/retrieve-and-rank/api/v1/
  // TODO List rankers
  // http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/retrieve-and-rank/api/v1/
  // TODO Get information about a ranker
  // http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/retrieve-and-rank/api/v1/
  // TODO Delete ranker
  // http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/retrieve-and-rank/api/v1/
  // TODO Rank
  // http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/retrieve-and-rank/api/v1/
  // TODO Search and rank
  // http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/retrieve-and-rank/api/v1/
};
