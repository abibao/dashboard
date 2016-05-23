(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('screenContentCtrl', screenContentCtrl);

  function screenContentCtrl($rootScope, $scope, $stateParams, $state, getNextState) {
    if (!$stateParams.content || !$stateParams.type) {
      $state.go('survey');
    }
    $scope.content = $stateParams.content;
    $scope.type = $stateParams.type;
    $scope.loadSurvey = function() {
      $state.go('survey.step', {index:1});
    }
    $scope.nextState = function() {
      getNextState().then(function(nextState) {
        $state.go(nextState.stateName, nextState.params);
      });
    }
  }
})(angular);
