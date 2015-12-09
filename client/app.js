var app = angular.module('read-and-rank', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'ngCookies',
  'angular-jwt',
  'ngSanitize',
  'ngSocial'
]).config(function($locationProvider,  $stateProvider, $urlRouterProvider){
    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/upload");
});

app.run(function($rootScope, $state){
  $rootScope.state = $state;
});
