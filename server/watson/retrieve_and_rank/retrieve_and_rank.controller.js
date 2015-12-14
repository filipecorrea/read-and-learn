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
  var documents = convertAnswerUnitsToDocuments(req.body.data);
  console.log(documents);

  // TODO Send documents to retrieve and rank
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
