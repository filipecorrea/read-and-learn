angular.module('natural-language-classifier').controller('uploadController', function ($scope, $rootScope, $http) {

  $scope.textChanged = function(event) {
    if ($scope.question) {

      $scope.answer = '';
      $scope.confidence = '';

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
    }
  };

  /**
   * Convert to percentage and round up a number with two decimal places.
   * @param  {Number} number The number to be converted.
   * @return {String}        The number converted.
   *
   * @author  filipecorrea@br.ibm.com
   * @since   2015-11-25
   * @version 0.1
   */
  var percentNumber = function(number) {
    return +(Math.ceil(number * 100 + "e+2")  + "e-2") + "%";
  };

});
