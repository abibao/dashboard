(function(angular) {
  angular
    .module('app')
    .config(function (AnalyticsProvider) {
      AnalyticsProvider
        .setAccount('UA-77334841-2')
        .setDomainName('auto')
        .setHybridMobileSupport(true)
        .logAllCalls(true)
        .useDisplayFeatures(true);
    })
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
            case 400:
              break;
            default:
              // window.location = '/404';
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
        url:'/login?fingerprint',
        templateUrl: 'app/components/login/login.tpl.html',
        controller : 'loginCtrl'
      })
      .state('thank-you-1', {
        url:'/thank-you-1',
        templateUrl: 'app/components/messages/thank-you-1/thank-you-1.tpl.html',
        controller : 'thankYou1Ctrl'
      })
      .state('all-finished', {
        url:'/all-finished',
        templateUrl: 'app/components/messages/all-finished/all-finished.tpl.html'
      })
      .state('email-sended', {
        url:'/email-sended',
        templateUrl: 'app/components/messages/email-sended/email-sended.tpl.html'
      })
      .state('smf-choice', {
        url:'/smf-choice/:node',
        templateUrl: 'app/components/smf-choice/smf-choice.tpl.html',
        controller : 'smfChoiceCtrl'
      })
      .state('smf-thanks', {
        url:'/smf-thanks/:node',
        templateUrl: 'app/components/smf-thanks/smf-thanks.tpl.html',
        controller : 'smfThanksCtrl'
      })
      .state('smf-thanks-welcome', {
        url:'/smf-thanks-welcome/:email/:node',
        templateUrl: 'app/components/smf-thanks-welcome/smf-thanks-welcome.tpl.html',
        controller : 'smfThanksWelcomeCtrl'
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
        url:'/etape-:index',
        templateUrl: 'app/components/survey/survey.tpl.html'
      })
      .state('survey.screencontent', {
        url:'/message',
        templateUrl: 'app/components/screen-content/screen.content.tpl.html',
        controller : 'screenContentCtrl',
        params :{
          content : '',
          type:''
        }
      })
      .state('404', {
        url:'/404',
        templateUrl: 'app/components/404/404.tpl.html'
      });
  }
})(angular);
