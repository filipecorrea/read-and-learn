angular.module('natural-language-classifier')
.config(function ($stateProvider) {
  $stateProvider
    .state('about',{
      url: '/about',
      data: {'animateMain': 'view--animate-entry'},
      views: {
        'main': {
          templateUrl: 'about/about.html',
          controller: 'aboutController'
        },
        'navigation': {
          templateUrl: '_shared/navigation/navigation.html',
          controller: 'navigationController'
        }
      }
    });
});
