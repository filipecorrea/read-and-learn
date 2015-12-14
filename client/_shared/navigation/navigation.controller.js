angular.module('read-and-learn').controller('navigationController', function ($rootScope, $location, $scope, $timeout) {

  $scope.navbarCollapsed = true;

  $scope.getClass = function (path) {
    if ($location.path().substr(0, path.length) === path) {
      return 'active';
    } else {
      return '';
    }
  };

});
