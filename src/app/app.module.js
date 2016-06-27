(function(angular) {
  'use strict';
  angular.module('app', [
    'angular-google-analytics',
    'ui.router',
    'ngResource',
    'ngCookies',
    'ngAnimate',
    'ngSanitize'
  ]);
  angular.module('app').constant('config', {
    baseapi: /pprod|localhost/.test(window.location.hostname) ? 'https://api.pprod.abibao.com/v1' : 'https://api.abibao.com/v1'
  });
})(angular);
