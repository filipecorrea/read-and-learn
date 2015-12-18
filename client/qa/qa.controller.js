angular.module('read-and-learn').controller('qaController', function ($scope, $rootScope, $http) {

  $scope.documents = null;
  $scope.error = null;

  var cluster_id = 'scf9b13b48_1835_48cf_ac7f_143b7bb8712b';
  var config_name = 'example-config';
  var collection_name = 'example-collection3';

  $scope.textChanged = function(event) {
    if ($scope.question) {
      $scope.documents = null;
      $scope.error = null;

      // TODO Set timeout to show message if no result is found

      // Call API to retrieve documents
      $http({
        method: 'POST',
        url: '/api/retrieve-and-rank/' + cluster_id + '/' + config_name + '/' + collection_name + '/documents',
        data: {
          'query': $scope.question
        }
      }).then(function successCallback(response) {
        $scope.documents = response.data.docs;
      }, function errorCallback(response) {
        $scope.error = response;
      });
    }
  };

});
