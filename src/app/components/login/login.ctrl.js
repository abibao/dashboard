(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('loginCtrl', loginCtrl);

  function loginCtrl($scope, userSvc ,abibaoApiSvc, $state, getNextState) {
    $scope.title = 'login';
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
