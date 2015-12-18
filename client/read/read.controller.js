angular.module('read-and-learn').controller('readController', function ($scope, $rootScope, $http, Upload, $timeout) {

  $scope.documents = null;

  var cluster_id = 'scf9b13b48_1835_48cf_ac7f_143b7bb8712b';
  var config_id = 'example-config';
  var collection_id = 'example-collection3';

  getAllDocuments();

  $scope.read = function(file) {
    $scope.documents = null;
    console.log(file);
    if (file)
      $scope.file = 'data/' + file;
    else
      $scope.file = 'data/samplePDF.pdf';

    // Call API to convert documents into normalized sets of answer units
    $http({
      method: 'POST',
      url: '/api/document-conversion',
      data: { 'file': $scope.file }
    }).then(function successCallback(response) {

      var author = getDocumentAuthor(response.data.metadata);

      var answersToConvert = response.data.answer_units.length;
      var answersConverted = 0;

      for (var i = 0; i < response.data.answer_units.length; i++) {
        var doc = {};
        doc.id = author + ' ' + $scope.file + (i + 1); // TODO Improve solution to check if document is already readed
        doc.author = author;
        doc.bibliography = $scope.file;
        doc.title = response.data.answer_units[i].title;
        doc.body = response.data.answer_units[i].content[0].text;

        // Add documents to a collection
        $http({
          method: 'POST',
          url: '/api/retrieve-and-rank/'+cluster_id+'/'+config_id+'/'+collection_id,
          data: {
            'data': doc
          }
        }).then(function successCallback(response) {
          answersConverted++;
          if (answersConverted === answersToConvert)
            getAllDocuments();

        }, function errorCallback(response) {
          // TODO Treat error
          getAllDocuments();
        });
      }

    }, function errorCallback(response) {
      // TODO Treat error
      getAllDocuments();
    });
  };

  $scope.upload = function(files, errFiles) {
    $scope.files = files;
    $scope.errFiles = errFiles;
    angular.forEach(files, function(file) {
      file.upload = Upload.upload({
        url: '/api/upload',
        data: {
          file: file
        }
      });

      file.upload.then(function successCallback(response) {
        $timeout(function () {
          file.result = response.data;
          // Convert document
          $scope.read(response.config.data.file.name);
        });
      }, function errorCallback(response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    });
  };

  function getAllDocuments() {
    $http({
      method: 'GET',
      url: '/api/retrieve-and-rank/'+cluster_id+'/'+config_id+'/'+collection_id+'/documents'
    }).then(function successCallback(response) {
      if (response.data.docs.length > 0)
        $scope.documents = [];

      $scope.answers = 0;

      // Count distinct documents
      var currentDoc = null;
      for (var i = 0; i < response.data.docs.length; i++) {
        if (response.data.docs[i].bibliography[0] !== currentDoc) {
          var doc = {
            "id" : response.data.docs[i].id[0],
            "author" : response.data.docs[i].author[0],
            "bibliography" : response.data.docs[i].bibliography[0],
            "title" : response.data.docs[i].title[0],
            "body" : response.data.docs[i].body[0]
          };
          $scope.documents.push(doc);
          currentDoc = response.data.docs[i].bibliography[0];
        }
      }
      // Count answer units
      $scope.answers = response.data.numFound;
    }, function errorCallback(response) {
      // TODO Treat error
    });
  }

  /**
   * Find author information in document metadata
   * @param  {Object}   metadata  Metadata array
   * @return {String}             Author name
   *
   * @author  filipecorrea@br.ibm.com
   * @since   2015-12-16
   * @version 0.1.0
   */
  function getDocumentAuthor(metadata) {
    for (var i = 0; i < metadata.length; i++) {
      if (metadata[i].name === 'author')
        return metadata[i].content;
    }
  }

});
