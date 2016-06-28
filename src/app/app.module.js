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
<<<<<<< HEAD
    baseapi: /pprod|localhost|local/.test(window.location.hostname) ? 'https://api.pprod.abibao.com/v1' : 'https://api.abibao.com/v1'
=======
    baseapi: /pprod|localhost/.test(window.location.hostname) ? 'https://api.pprod.abibao.com/v1' : 'https://api.abibao.com/v1'
>>>>>>> origin/dev-mvp
  });
  // angular.module('app').config(['$httpProvider', function($httpProvider) {
  //   $httpProvider.defaults.withCredentials = true;
  // }]);
  // angular.module('app').run(function(abibaoApiSvc) {
  //   abibaoApiSvc.alive.getCSRF();
  // });
})(angular);
