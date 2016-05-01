(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('surveyCtrl', surveyCtrl);

  function surveyCtrl($rootScope, $scope, survey, abibaoApiSvc, $stateParams, $state, getNextState) {
    $scope.progress = {
      max : survey.items.length,
      current : 1,
      maxIndex : 1
    };
    $scope.loadingState = false;
    $scope.$on("$stateChangeSuccess", function(event, toState, toParams) {
      var index = parseInt(toParams.index || 1) - 1;
      $scope.item = survey.items[index];
      $scope.progress.current = index + 1;
      $scope.next = function() {
        $state.go('survey.step', {index:++index + 1});
      }
      $scope.previous = function() {
        $state.go('survey.step', {index:--index + 1});
      }
    });

    $scope.submitAnswer = function(response) {
      $scope.loadingState = true;
      abibaoApiSvc.survey.answers({urn:$stateParams.urn},{
        label:response.label,
        answer:response.answer
      }, function() {
        $scope.loadingState = false;
        if ($scope.progress.current >= $scope.progress.max) {
          getNextState().then(function(nextState) {
            $state.go(nextState.stateName, nextState.params);
          });
        }
        else {
          ++$scope.progress.maxIndex;
          $scope.next();
        }
      });
    }
  }
})(angular);
