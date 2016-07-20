(function(angular) {
  'use strict';
  angular.module('app', [
    'angular-google-analytics',
    'ui.router',
    'ngResource',
    'ngCookies',
    'ngAnimate',
    'ngSanitize',
    'angular-loading-bar'
  ]);
  angular.module('app').constant('config', {
    baseapi: /pprod|localhost|local/.test(window.location.hostname) ? 'https://api.pprod.abibao.com/v1' : 'http://api.abibao.com/v1'
  });
  // angular.module('app').config(['$httpProvider', function($httpProvider) {
  //   $httpProvider.defaults.withCredentials = true;
  // }]);
  // angular.module('app').run(function(abibaoApiSvc) {
  //   abibaoApiSvc.alive.getCSRF();
  // });
})(angular);
