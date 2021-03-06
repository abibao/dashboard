(function (angular) {
  'use strict'

  angular
    .module('app')
    .controller('charityChoiceCtrl', charityChoiceCtrl)

  function charityChoiceCtrl ($rootScope, $scope, abibaoApiSvc, charities, $state, getNextState) {
    var submited = false
    $scope.charities = charities
    $scope.selectCharity = selectCharity
    $scope.sumbitSelectedCharity = sumbitSelectedCharity

    selectCharity(charities[0])

    function selectCharity (charity) {
      if (typeof charity.usages === 'string') {
        charity.usages = charity.usages.split('|')
      }
      $scope.selected_charity = charity
    }
    function sumbitSelectedCharity () {
      if (!submited) {
        submited = true
        abibaoApiSvc.charity.set({charity: $scope.selected_charity.urn}, function (res) {
          getNextState().then(function(nextState) {
            $state.go(nextState.stateName, nextState.params);
          });
        })
      }
    }
  }
})(angular);
