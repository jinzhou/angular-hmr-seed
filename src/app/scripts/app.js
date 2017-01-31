'use strict';

angular.module('angularHmrSeedApp', [
   'ui.router',
   'templateLoader'
])
.config(function($stateProvider, $urlRouterProvider) {
   //delete $httpProvider.defaults.headers.common['X-Requested-With'];
   $urlRouterProvider.otherwise('/');
   $stateProvider
   .state('index', {
      url: '/',
      templateUrl: './views/main.html',
      controller: 'MainCtrl'
   })
})




