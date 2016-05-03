(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('thankYou1Ctrl', thankYou1Ctrl);

  function thankYou1Ctrl($scope, $state, getNextState) {
    $scope.nextState = function() {
      getNextState().then(function(nextState) {
        $state.go(nextState.stateName, nextState.params);
      });
    }
  }
})(angular);
