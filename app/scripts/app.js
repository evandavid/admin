'use strict';

/**
 * @ngdoc overview
 * @name simplefiAdminApp
 * @description
 * # simplefiAdminApp
 *
 * Main module of the application.
 */
angular
  .module('simplefiAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'simplefiAdminApp.global.directives',
    'restangular'
  ])
  .config(function($stateProvider, $urlRouterProvider, RestangularProvider, $httpProvider) {
    RestangularProvider.setBaseUrl('http://localhost:51944');

    // $httpProvider.interceptors.push('APIInterceptor');

    $urlRouterProvider.otherwise('/application-search');
    $urlRouterProvider.when('', '/application-search');

    $stateProvider
      .state('app', {
        url: '',
        abstract: true,
        template: '<div ui-view></div>',
      })
        .state('app.login', {
          url: '/login',
          templateUrl: 'views/users/login.html',
          controller: 'LoginCtrl'
        })
        .state('app.applicationSearch', {
          url: '/application-search',
          templateUrl: 'views/application-search/index.html',
          controller: 'ApplicationSearchCtrl',
          controllerAs: 'vm'
        })
        .state('app.eligibilityQuestion', {
          url: '/eligibility_question',
          templateUrl: 'views/eligibilities/index.html',
          controller: 'EligibilitiesCtrl'
        })
        .state('app.disclosure', {
          url: '/disclosure',
          templateUrl: 'views/disclosure/index.html',
          controller: 'DisclosuresCtrl'
        })
        .state('app.requestInfo', {
          url: '/requestInfo/:type',
          templateUrl: 'views/requestInfo/index.html',
          controller: 'RequestinfoCtrl'
        });
  });
  // .service('APIInterceptor', function($rootScope, $q, $injector) {
  //   var service = this;

  //   service.responseError = function(rejection) {
  //     console.log(rejection);
     
  //     return $q.reject(rejection);
  //   };
  // });
