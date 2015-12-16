var watson = require('watson-developer-cloud');

// http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/retrieve-and-rank/api/v1/

var retrieve_and_rank = watson.retrieve_and_rank({
  username: 'f572ec81-7297-406d-afe6-f6105f1dc1e0',
  password: '8pAwhUstlrIX',
  version: 'v1'
});

/**
 * List Solr clusters
 * @param  {Object}   req  Requested object.
 * @param  {Object}   res  Response object.
 * @return {Object}        List of Solr clusters
 *
 * @author  filipecorrea@br.ibm.com
 * @since   2015-12-15
 * @version 0.1.0
 */
exports.listClusters = function(req, res) {
  retrieve_and_rank.listClusters({}, function (error, response) {
    if (error)
      res.status(500).json(error);
    else
      res.status(200).json(response);
  });
};

/**
 * Create Solr cluster
 * @param  {Object}   req  Requested object.
 * @param  {Object}   res  Response object.
 * @return {Object}        Solr cluster information
 *
 * @author  filipecorrea@br.ibm.com
 * @since   2015-12-15
 * @version 0.1.0
 */
exports.createCluster = function(req, res) {
  retrieve_and_rank.createCluster({
    cluster_size: '', // Send an empty value to create a small free-size cluster for testing
    cluster_name: ''
  }, function (error, response) {
    if (error)
      res.status(500).json(error);
    else
      res.status(200).json(response);
  });
};

/**
 * Get information about a Solr cluster
 * @param  {Object}   req  Requested object
 * @param  {Object}   res  Response object
 * @return {Object}        Solr cluster information
 *
 * @author  filipecorrea@br.ibm.com
 * @since   2015-12-15
 * @version 0.1.0
 */
exports.readCluster = function(req, res) {
  retrieve_and_rank.pollCluster({
    cluster_id: req.params.cluster_id
  }, function (error, response) {
    if (error)
      res.status(500).json(error);
    else
      res.status(200).json(response);
  });
};

/**
 * Delete a Solr cluster
 * @param  {Object}   req  Requested object
 * @param  {Object}   res  Response object
 * @return {Object}        HTTP response 200
 *
 * @author  filipecorrea@br.ibm.com
 * @since   2015-12-15
 * @version 0.1.0
 */
exports.deleteCluster = function(req, res) {
  retrieve_and_rank.deleteCluster({
    cluster_id: req.params.cluster_id
  }, function (error, response) {
    if (error)
      res.status(500).json(error);
    else
      res.status(200).json(response);
  });
};

/**
 * List Solr cluster configurations
 * @param  {Object}   req  Requested object.
 * @param  {Object}   res  Response object.
 * @return {Object}        List of Solr cluster configurations
 *
 * @author  filipecorrea@br.ibm.com
 * @since   2015-12-15
 * @version 0.1.0
 */
exports.listConfigurations = function(req, res) {
  retrieve_and_rank.listConfigs({
    cluster_id: req.params.cluster_id
  }, function (error, response) {
    if (error)
      res.status(500).json(error);
    else
      res.status(200).json(response);
  });
};

/**
 * List Solr cluster collections
 * @param  {Object}   req  Requested object.
 * @param  {Object}   res  Response object.
 * @return {Object}        List of Solr cluster collections
 *
 * @author  filipecorrea@br.ibm.com
 * @since   2015-12-16
 * @version 0.1.0
 */
exports.listCollections = function(req, res) {
  retrieve_and_rank.listCollections({
    cluster_id: req.params.cluster_id,
    config_name: req.params.config_name
  }, function (error, response) {
    if (error)
      res.status(500).json(error);
    else
      res.status(200).json(response);
  });
};

/**
 * Create Solr collection
 * @param  {Object}   req  Requested object.
 * @param  {Object}   res  Response object.
 * @return {Object}        Solr collection information
 *
 * @author  filipecorrea@br.ibm.com
 * @since   2015-12-16
 * @version 0.1.0
 */
exports.createCollection = function(req, res) {
  var params = {
    cluster_id: req.params.cluster_id,
    config_name: req.params.config_name,
    collection_name: (req.params.collection_name) ? req.params.collection_name : 'example-collection'
  };

  retrieve_and_rank.createCollection(params, function (error, response) {
    if (error)
      res.status(500).json(error);
    else
      res.status(200).json(response);
  });
};

/**
 * Delete a Solr collection
 * @param  {Object}   req  Requested object.
 * @param  {Object}   res  Response object.
 * @return {Object}        HTTP response 200
 *
 * @author  filipecorrea@br.ibm.com
 * @since   2015-12-16
 * @version 0.1.0
 */
exports.deleteCollection = function(req, res) {
  var params = {
    cluster_id: req.params.cluster_id,
    // config_name: req.params.config_name,
    collection_name: req.params.collection_name
  };

  retrieve_and_rank.deleteCollection(params, function (error, response) {
    if (error)
      res.status(500).json(error);
    else
      res.status(200).json(response);
  });
};

/**
 * Index a document in a Solr cluster
 * @param  {Object}   req  Requested object
 * @param  {Object}   res  Response object
 * @return {Object}        HTTP response 200
 *
 * @author  filipecorrea@br.ibm.com
 * @since   2015-12-16
 * @version 0.1.0
 */
exports.indexDocument = function(req, res) {
  var params = {
    cluster_id: req.params.cluster_id,
    // config_name: req.params.config_name,
    collection_name: req.params.collection_name
  };

  var doc = req.body.data;

  solrClient = retrieve_and_rank.createSolrClient(params);

  solrClient.add(doc, function (error, response) {
    if (error) {
      res.status(500).json(error);
    }
    else {
      solrClient.commit(function(error) {
        if (error)
          res.status(500).json(error);
        else
          res.status(200).json('Successfully committed changes.');
      });
    }
  });
};

/**
 * List Solr cluster documents
 * @param  {Object}   req  Requested object.
 * @param  {Object}   res  Response object.
 * @return {Object}        List of Solr cluster documents
 *
 * @author  filipecorrea@br.ibm.com
 * @since   2015-12-16
 * @version 0.1.0
 */
exports.listDocuments = function(req, res) {
  var params = {
    cluster_id: req.params.cluster_id,
    // config_name: req.params.config_name,
    collection_name: req.params.collection_name
  };

  // Get a Solr client for indexing and searching documents.
  // See https://github.com/watson-developer-cloud/nodejs-wrapper/tree/master/services/retrieve_and_rank.
  solrClient = retrieve_and_rank.createSolrClient(params);

  var query = solrClient.createQuery();
  query.q({ '*' : '*' });

  solrClient.search(query, function(error, searchResponse) {
    if (error)
      res.status(500).json(error);
    else
      res.status(200).json(searchResponse.response);
  });
};

















exports.searchDocument = function(req, res) {
  var params = {
    cluster_id: req.params.cluster_id,
    // config_name: req.params.config_name,
    collection_name: req.params.collection_name
  };

  // Get a Solr client for indexing and searching documents.
  // See https://github.com/watson-developer-cloud/nodejs-wrapper/tree/master/services/retrieve_and_rank.
  solrClient = retrieve_and_rank.createSolrClient(params);

  console.log('Searching all documents.');
  var query = solrClient.createQuery();
  query.q({ '*' : '*' });

  solrClient.search(query, function(error, searchResponse) {
    if (error) {
      res.status(500).json(error);
    }
    else {
      console.log('Found ' + searchResponse.response.numFound + ' documents.');
      console.log('First document: ' + JSON.stringify(searchResponse.response.docs[0], null, 2));

      res.status(200).json(searchResponse.response.docs[0]);
    }
  });
};
