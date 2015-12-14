angular.module('read-and-learn')
.config(function ($stateProvider) {
  $stateProvider
    .state('read',{
      url: '/read',
      data: {'animateMain': 'view--animate-entry'},
      views: {
        'main': {
          templateUrl: 'read/read.html',
          controller: 'readController'
        },
        'navigation': {
          templateUrl: '_shared/navigation/navigation.html',
          controller: 'navigationController'
        }
      }
    });
});
