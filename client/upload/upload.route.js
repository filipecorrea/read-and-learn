angular.module('natural-language-classifier')
.config(function ($stateProvider) {
  $stateProvider
    .state('upload',{
      url: '/upload',
      data: {'animateMain': 'view--animate-entry'},
      views: {
        'main': {
          templateUrl: 'upload/upload.html',
          controller: 'uploadController'
        },
        'navigation': {
          templateUrl: '_shared/navigation/navigation.html',
          controller: 'navigationController'
        }
      }
    });
});
