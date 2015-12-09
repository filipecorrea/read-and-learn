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

  var credentials = {
    username: '<username>',
    password: '<password>',
    version: 'v1-experimental'
  };

  var document_conversion = watson.document_conversion(credentials);

  document_conversion.convert({
    file: fs.createReadStream(req.body.file),
    conversion_target: document_conversion.conversion_target.ANSWER_UNITS
  }, function (err, response) {
    if (err) {
      console.error(err);
    } else {
      res.send(response);
    }
  });
};
