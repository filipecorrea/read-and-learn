angular.module('read-and-learn').controller('readController', function ($scope, $rootScope, $http) {

  $scope.file = null;
  $scope.answerUnits = null;

  $scope.read = function() {
    $scope.file = 'data/samplePDF.pdf'; // TODO Change to uploaded file name and path
    $scope.answerUnits = null;

    // Call API to convert documents into normalized sets of answer units
    $http({
      method: 'POST',
      url: '/api/document-conversion',
      data: { 'file': $scope.file }
    }).then(function successCallback(response) {
      
      $scope.answerUnits = response.data;

      // Add documents to a collection
      $http({
        method: 'POST',
        url: '/api/retrieve-and-rank',
        data: {
          'data': $scope.answerUnits,
          'path': $scope.file
        }
      }).then(function successCallback(response) {
        console.log(response);
        $scope.file = null;
        //$scope.answerUnits = response.data;

      }, function errorCallback(response) {
        // TODO Treat error
      });



    }, function errorCallback(response) {
      // TODO Treat error
      //console.log('error');
      //console.log(response.status);
    });
  };

  $scope.upload = function() {
    // TODO Ask for file

    // TODO Upload file to server

    // TODO Call read function
  };

});
