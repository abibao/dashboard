(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('surveyCtrl', surveyCtrl);

  function surveyCtrl($rootScope, $scope, survey, abibaoApiSvc, $stateParams, $state, nextSurvey) {
    $scope.progress = {
      max : survey.items.length,
      current : 1,
      maxIndex : 1
    };
    console.log(survey);
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
      abibaoApiSvc.survey.answers({urn:$stateParams.urn},{
        label:response.label,
        answer:response.answer
      }, function() {
        if ($scope.progress.current >= $scope.progress.max) {
          abibaoApiSvc.globalInfos.get(function(globalInfos) {
            if (!globalInfos.currentCharity) {
              $state.go('charitychoice');
            }
            else {
              var nextUrn = nextSurvey(globalInfos);
              console.log(nextUrn);
            }
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