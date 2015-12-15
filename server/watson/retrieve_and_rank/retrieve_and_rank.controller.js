var watson = require('watson-developer-cloud');
var fs = require('fs');

/**
 * Convert documents into normalized sets of answer units.
 * @param  {Object}   req  Requested object.
 * @param  {Object}   res  Response object.
 * @return {Object}        Document object normalized.
 *
 * @author  filipecorrea@br.ibm.com
 * @since   2015-12-09
 * @version 0.1.0
 */
exports.post  = function(req, res) {

  // Convert answer units to documents

  //console.log(__filename);
  //console.log(__dirname);
  //console.log(req.body.path);

  var credentials = {
    username: 'f572ec81-7297-406d-afe6-f6105f1dc1e0',
    password: '8pAwhUstlrIX',
    version: 'v1'
  };
  var retrieve_and_rank = watson.retrieve_and_rank(credentials);

  var answerUnits = req.body.data;

  var author = getDocumentAuthor(answerUnits);


  for (var i = 0; i < answerUnits.answer_units.length; i++) {
    var doc = {};
    doc.id = i + 1;
    doc.author = author;
    doc.title = answerUnits.answer_units[i].title;
    doc.body = answerUnits.answer_units[i].content[0].text;

    // documents += '"add": { "doc":' + JSON.stringify(doc);
    // documents += '},';

    indexDocument(retrieve_and_rank, 'scf9b13b48_1835_48cf_ac7f_143b7bb8712b', 'example-collection', doc);
  }

  //var documents = convertAnswerUnitsToDocuments(req.body.data);
  //console.log(documents);

  // http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/retrieve-and-rank/api/v1/

  //var document_conversion = watson.document_conversion(credentials);


  //listClusters(retrieve_and_rank);
};

function convertAnswerUnitsToDocuments(answerUnits) {

  var documents = '{';
  var author = getDocumentAuthor(answerUnits);

  for (var i = 0; i < answerUnits.answer_units.length; i++) {
    var doc = {};
    doc.id = i + 1;
    doc.author = author;
    doc.title = answerUnits.answer_units[i].title;
    doc.body = answerUnits.answer_units[i].content[0].text;

    documents += '"add": { "doc":' + JSON.stringify(doc);
    documents += '},';

    //indexDocument(retrieve_and_rank, 'scf9b13b48_1835_48cf_ac7f_143b7bb8712b', 'example-collection', doc);
  }

  documents += '"commit" : {}';
  documents += '}';

  return documents; //JSON.parse(documents);
}

function getDocumentAuthor(document) {
  // Find author
  for (var i = 0; i < document.metadata.length; i++) {
    if (document.metadata[i].name === 'author')
      return document.metadata[i].content;
  }
}


function indexDocument(retrieve_and_rank, cluster_id, collection_name, doc) {

  var params = {
    cluster_id: cluster_id,
    collection_name: collection_name,
  };

  solrClient = retrieve_and_rank.createSolrClient(params);

  console.log('Indexing a document...');
  solrClient.add(doc, function (err, response) {
    if (err) {
      console.log('Error indexing document: ', err);
    }
    else {
      console.log('Indexed a document.');
      solrClient.commit(function(err) {
        if(err) {
          console.log('Error committing change: ' + err);
        }
        else {
          console.log('Successfully committed changes.');
        }
      });
    }
  });

}


function createCluster(retrieve_and_rank) {
  retrieve_and_rank.createCluster({
    cluster_size: '1',
    cluster_name: 'My cluster'
  },
  function (err, response) {
    if (err)
    console.log('error:', err);
    else
    console.log(JSON.stringify(response, null, 2));
  });
}

function listClusters(retrieve_and_rank) {
  retrieve_and_rank.listClusters({

  },
  function (err, response) {
    if (err)
    console.log('error:', err);
    else
    console.log(JSON.stringify(response, null, 2));
  });
}

function deleteCluster(retrieve_and_rank, cluster_id) {
  retrieve_and_rank.deleteCluster({
    cluster_id: cluster_id
  },
  function (err, response) {
    if (err)
    console.log('error:', err);
    else
    console.log(JSON.stringify(response, null, 2));
  });
}
