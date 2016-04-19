(function(angular) {
  'use strict';
  angular.module('app', [
    'ui.router',
    'ngResource',
    'ngCookies',
    'ngAnimate'
  ]);
  angular.module('app').constant('config', {
    baseapi: 'http://api.pprod.abibao.com/v1'
  });
})(angular);
