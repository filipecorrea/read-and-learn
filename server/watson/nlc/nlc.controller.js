var bluemix = require('../../../config/bluemix');
var extend = require('util')._extend;
var watson = require('watson-developer-cloud');
var bodyParser = require('body-parser');

/**
 * Classify texts
 * @param  {Object}   req  Requested object.
 * @param  {Object}   res  Response object.
 * @return {Object}        Text object classified.
 *
 * @author  filipecorrea@br.ibm.com
 * @since   2015-11-25
 * @version 0.1.0
 */
exports.post  = function(req, res) {

  // if bluemix credentials exists, then override local
  var credentials = extend({
    version: 'v1',
    url : 'https://gateway.watsonplatform.net/natural-language-classifier/api',
    username : 'eb3fc11b-7efb-4d9b-a017-ff017555432e',
    password : 'vVo5YNd0SFx1',
  }, bluemix.getServiceCreds('natural_language_classifier')); // VCAP_SERVICES

  // Create the service wrapper
  var nlClassifier = watson.natural_language_classifier(credentials);

  var params = {
    classifier: process.env.CLASSIFIER_ID || '0235B6x12-nlc-1355', // pre-trained classifier
    text: req.body.text
  };

  nlClassifier.classify(params, function(err, results) {
    if (err)
      return err;
    else
      res.json(results);
  });
};
