var fs = require('fs');

/**
 * Upload documents
 * @param  {Object}   req  Requested object.
 * @param  {Object}   res  Response object.
 * @return {Object}        HTTP response 200
 *
 * @author  filipecorrea@br.ibm.com
 * @since   2015-12-17
 * @version 0.1.0
 */
exports.uploadFile = function(req, res) {
  // We are able to access req.files.file thanks to
  // the multiparty middleware
  var file = req.files.file;
  console.log(file.name);
  console.log(file.type);

  fs.writeFile("data/"+file.name, function(error, response) {
    if (error)
      res.status(500).json(error);
    else
      res.status(200).json(response);
  });
};
