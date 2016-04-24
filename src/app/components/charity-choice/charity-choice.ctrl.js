(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('charityChoiceCtrl', charityChoiceCtrl);

  function charityChoiceCtrl($rootScope, $scope, abibaoApiSvc, charities, $state) {
    var submited = false;

    $scope.charities = charities;
    $scope.selectCharity = selectCharity;
    $scope.sumbitSelectedCharity = sumbitSelectedCharity;

    selectCharity(charities[0]);

    function selectCharity(charity) {
      if (typeof charity.usages === 'string') {
        charity.usages = charity.usages.split('|');
      }
      $scope.selected_charity = charity;
    }
    function sumbitSelectedCharity() {
      console.log($scope.selected_charity.urn);
      if (!submited) {
        submited = true;
        abibaoApiSvc.charity.set({charity:$scope.selected_charity.urn}, function(res) {
          $state.go('thank-you-1');
        });
      }
    }
  }
})(angular);
