(function (angular) {
  'use strict';
  angular.module('app', [
    'angular-google-analytics',
    'ui.router',
    'ngResource',
    'ngCookies',
    'ngAnimate',
    'ngSanitize',
    'angular-loading-bar',
    'matchmedia-ng'
  ]);
  var baseapi = /localhost|local/.test(window.location.hostname) ? 'http://localhost:8383/v1' : false;
  if (baseapi === false) { baseapi = /pprod/.test(window.location.hostname) ? 'https://api.pprod.abibao.com/v1' : 'https://api.abibao.com/v1'; };
  angular.module('app').constant('config', {
    baseapi: baseapi,
    enableLogo: true,
    enableLogoSMF: false
  });
})(angular);
