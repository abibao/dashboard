(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('loginCtrl', loginCtrl);

  function loginCtrl($scope, userSvc ,abibaoApiSvc, $state, $stateParams,getNextState) {
    console.log($stateParams);
    $scope.title = 'login';
    if ($stateParams.fingerprint) {
      abibaoApiSvc.individuals.autologin({
        fingerprint:$stateParams.fingerprint
      },
        function(res) {
          getNextState(res.globalInfos).then(function(nextState) {
            $state.go(nextState.stateName, nextState.params);
          });
        }, function(err) {
          $scope.formError = {
            close : true,
            message : 'Votre lien est arrivé à expiration, veuillez entrer votre email et votre mot de passe'
          }
        }
      );
    }
    $scope.login = function(credentials) {
      abibaoApiSvc.individuals.login({
        email:credentials.email,
        password:credentials.password},
        function(res) {
          getNextState(res.globalInfos).then(function(nextState) {
            $state.go(nextState.stateName, nextState.params);
          });
        }, function(err) {
          $scope.formError = {
            close : true,
            message : 'Oups, votre adresse Email ou votre mot de passe est incorrect'
          }
        }
      );
    }
  }
})(angular);
