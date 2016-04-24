(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('dashboardCtrl', dashboardCtrl);

  function dashboardCtrl($state,getNextState) {
    getNextState().then(function(nextState) {
      $state.go(nextState.stateName, nextState.params);
    });
  }
})(angular);
