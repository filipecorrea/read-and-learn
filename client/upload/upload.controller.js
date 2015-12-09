angular.module('read-and-rank').controller('uploadController', function ($scope, $rootScope, $http) {

  $scope.file = null;
  $scope.answerUnits = null;

  $scope.upload = function() {

    // TODO Ask for file

    $scope.file = 'data/samplePDF.pdf'; // TODO Change to uploaded file name and path
    $scope.answerUnits = null;

    // TODO Upload file to server

    // Call API to convert documents into normalized sets of answer units
    $http({
      method: 'POST',
      url: '/api/document-conversion',
      data: { 'file': $scope.file }
    }).then(function successCallback(response) {
      //console.log(response);
      $scope.answerUnits = response.data;

      // TODO Call retrieve and rank API
      // This sets can be used to train the retrieve and rank service.

    }, function errorCallback(response) {
      // TODO Treat error
      //console.log('error');
      //console.log(response.status);
    });

  };

});
