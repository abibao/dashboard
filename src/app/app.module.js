(function(angular) {
  'use strict';
  angular.module('app', [
    'ui.router',
    'ngResource',
    'ngCookies',
    'ngAnimate'
  ]);
  angular.module('app').constant('config', {
    baseapi: /pprod|localhost/.test(window.location.hostname) ? 'http://api.pprod.abibao.com/v1' : 'http://api.abibao.com/v1'
  });
})(angular);
