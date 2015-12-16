angular.module('read-and-learn')
.config(function ($stateProvider) {
  $stateProvider
    .state('qa',{
      url: '/qa',
      data: {'animateMain': 'view--animate-entry'},
      views: {
        'main': {
          templateUrl: 'qa/qa.html',
          controller: 'qaController'
        },
        'navigation': {
          templateUrl: '_shared/navigation/navigation.html',
          controller: 'navigationController'
        }
      }
    });
});
