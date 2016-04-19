(function(angular) {
  angular
    .module('app')
    .config(routes);

  function routes($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise("404");
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push(function($q) {
      return {
        responseError: function(res) {
          switch (res.status) {
            case 401:
              window.location = '/login';
              break;
            default:
              window.location = '/404';
          }
          return $q.reject(res);
        }
      };
    });
    $stateProvider
      .state('dashboard', {
        url:'/',
        templateUrl: 'app/components/dashboard/dashboard.tpl.html',
        controller : 'dashboardCtrl'
      })
      .state('register', {
        url:'/register',
        templateUrl: 'app/components/register/register.tpl.html',
        controller : 'registerCtrl'
      })
      .state('login', {
        url:'/login',
        templateUrl: 'app/components/login/login.tpl.html',
        controller : 'loginCtrl'
      })
      .state('thank-you', {
        url:'/thank-you',
        templateUrl: 'app/components/thank-you/thank-you.tpl.html',
        controller : 'thankYouCtrl'
      })
      .state('charitychoice', {
        url:'/charity-choice',
        templateUrl: 'app/components/charity-choice/charity-choice.tpl.html',
        controller : 'charityChoiceCtrl',
        resolve : {
          charities : function(abibaoApiSvc) {
            return abibaoApiSvc.charity.query().$promise;
          }
        }
      })
      .state('survey', {
        url:'/survey/:urn',
        templateUrl: 'app/components/survey/survey.tpl.html',
        controller : 'surveyCtrl',
        resolve : {
          survey : function(abibaoApiSvc, $stateParams) {
            return abibaoApiSvc.survey.get({urn:$stateParams.urn}).$promise;
          }
        }
      })
      .state('survey.step', {
        url:'/etape-:index'
      })
      .state('404', {
        url:'/404',
        templateUrl: 'app/components/404/404.tpl.html'
      });
  }
})(angular);
