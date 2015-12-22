var watson = require('watson-developer-cloud');
var fs = require('fs');

var document_conversion = watson.document_conversion({
  username: '{{username}}',
  password: '{{password}}',
  version: 'v1'
});

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
  document_conversion.convert({
    file: fs.createReadStream(req.body.file),
    conversion_target: document_conversion.conversion_target.ANSWER_UNITS
  }, function (error, response) {
    if (error) {
      res.status(error.code).json(error.error);
    } else {
      // console.log(JSON.stringify(response, null, 2));
      res.send(response);
    }
  });
};
