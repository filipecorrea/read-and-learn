var app = angular.module('read-and-learn', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'ngCookies',
  'angular-jwt',
  'ngSanitize',
  'ngSocial',
  'ngFileUpload'
]).config(function($locationProvider,  $stateProvider, $urlRouterProvider){
    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/read");
});

app.run(function($rootScope, $state){
  $rootScope.state = $state;
});
