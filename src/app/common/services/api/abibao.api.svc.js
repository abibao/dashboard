(function(angular) {
  angular.module('app')
    .factory('abibaoApiSvc', abibaoApiSvc);

  function abibaoApiSvc(userSvc, config, $http, $resource, $httpParamSerializer, $rootScope) {
    $rootScope.enableLogo = config.enableLogo;
    $rootScope.enableLogoSMF = config.enableLogoSMF;
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $http.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded';

    $http.defaults.transformRequest = function(params) {
      return $httpParamSerializer(params);
    };

    if (userSvc.getToken()) {
      $http.defaults.headers.common['Authorization'] = userSvc.getToken();
      $rootScope.isLoggedIn = true;
    }

    function interceptToken(data) {
      var authRes = angular.fromJson(data);
      if (authRes && authRes.token) {
        userSvc.setToken(authRes.token);
        $http.defaults.headers.common['Authorization'] = authRes.token;
        $rootScope.isLoggedIn = true;
      }
      return authRes;
    }

    return {
      individuals: $resource(config.baseapi + '/individuals/:action/:fingerprint', {}, {
        'register': {
          method: 'POST',
          params: {
            action: 'register',
            email: '@email',
            entity: '@entity',
            password1: '@password1',
            password2: '@password2'
          },
          transformResponse: interceptToken
        },
        'login': {
          method: 'POST',
          params: {
            action: 'login',
            email: '@email',
            password: '@password'
          },
          transformResponse: interceptToken
        },
        'autologin': {
          method: 'POST',
          params: {
            action: 'autologin',
            fingerprint: '@fingerprint'
          },
          transformResponse: interceptToken
        }
      }),
      survey: $resource(config.baseapi + '/auth/surveys/:urn', {
        urn:'@urn'
      }, {
        answers: {
          method: 'POST',
          url : config.baseapi + '/auth/surveys/:urn/answers'
        }
      }),
      globalInfos : $resource(config.baseapi + '/auth/global/informations',{},{
        'get' : {method:'GET'}
      }),
      alive : $resource(config.baseapi + '/alive',{},{
        'getCSRF' : {method:'GET'}
      }),
      charity: $resource(config.baseapi + '/:action/charity',{},{
        'query':  {method:'GET', isArray:true, params:{action:'entities'}},
        'set':  {method:'PATCH', params:{action:'auth',charity:'@charity'}}
      }),
      startup: $resource(config.baseapi + '/wp_json/smf/startups/:node',{},{
        node:'@node'
      }),
      startupVote: $resource(config.baseapi + '/wp_json/smf/startups/vote', {}, {
        'send' : {
          method:'POST',
          params: {
            action: 'send',
            email: '@email',
            startup: '@startup'
          }
        }
      })
    }

  }
})(angular);
