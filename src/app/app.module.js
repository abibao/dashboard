(function (angular) {
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
  var baseapi = /localhost|local/.test(window.location.hostname) ? 'http://localhost:8080/v1' : false;
  if (baseapi === false) { baseapi = /pprod/.test(window.location.hostname) ? 'https://api.pprod.abibao.com/v1' : 'http://api.abibao.com/v1'; };
  angular.module('app').constant('config', {
    baseapi: baseapi
  });
})(angular);
