(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('surveyCtrl', surveyCtrl);

  function surveyCtrl(Analytics,$rootScope, $scope, survey, abibaoApiSvc, $stateParams, $state, getNextState) {
    Analytics.pageView();
    $scope.progress = false;
    var answsers = [];

    if (survey.screenWelcomeContent) {
      loadScreenWelcomeContent();
    }

    console.log(survey);
    // console.log(screenWelcomeContent);
    // $scope.screenThankYouContent = survey.screenThankYouContent;
    function loadScreenWelcomeContent() {
      $scope.reverse = true;
      survey.items.unshift({
        type:'screenWelcomeContent',
        headertpl:survey.screenThankYouContent
      })
    }
    console.log(survey.screenThankYouContent);
    // function surveyTunneling() {
      // $scope.reverseorder = false;
      $scope.progress = {
        max : survey.items.length,
        current :  1,
        maxIndex : answsers.length + 1
      };
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
          answsers.push(response);
          if ($scope.progress.current >= $scope.progress.max) {
            getNextState().then(function(nextState) {
              $state.go(nextState.stateName, nextState.params);
            });
          }
          else {
            $scope.progress.maxIndex = answsers.length + 1;
            $scope.next();
          }
        });
      }
    // }

  }
})(angular);
