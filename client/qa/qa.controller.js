angular.module('read-and-learn').controller('qaController', function ($scope, $rootScope, $http) {

  $scope.textChanged = function(event) {
    if ($scope.question) {

      $scope.answer = '';
      $scope.confidence = '';

      /*
      $http({
        method: 'POST',
        url: '/api/nlc',
        data: { 'text': $scope.question }
      }).then(function successCallback(response) {
        $scope.answer = response.data.top_class;
        $scope.confidence = percentNumber(response.data.classes[0].confidence);
      }, function errorCallback(response) {
        // TODO: Treat error
        //console.log('error');
        //console.log(response.status);
      });
      */
    }
  };

});
