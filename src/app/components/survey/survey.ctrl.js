(function(angular) {
    'use strict';

    angular
        .module('app')
        .controller('surveyCtrl', surveyCtrl);

    function surveyCtrl(Analytics, $rootScope, $scope, survey, abibaoApiSvc, $stateParams, $state, getNextState) {
        Analytics.pageView();
        console.log(survey);
        $scope.progress = false;
        var answsers = [];
        $scope.screenWelcomeContent = survey.screenWelcomeContent;
        $scope.hideScreenWelcomeContent = function() {
          $scope.screenWelcomeContent = '';
        }
        $scope.progress = {
            max: survey.items.length,
            current: 1,
            maxIndex: answsers.length + 1
        };
        $scope.$on("$stateChangeSuccess", function(event, toState, toParams) {
            var index = parseInt(toParams.index || 1) - 1;
            if (index < 0) {
                $state.go('survey.step', {
                    index: 1
                });
            }
            $scope.item = survey.items[index];
            $scope.progress.current = index + 1;
            $scope.next = function() {
                $state.go('survey.step', {
                    index: ++index + 1
                });
            }
            $scope.previous = function() {
                $state.go('survey.step', {
                    index: --index + 1
                });
            }
        });

        $scope.submitAnswer = function(response) {
                abibaoApiSvc.survey.answers({
                    urn: $stateParams.urn
                }, {
                    label: response.label,
                    answer: response.answer
                }, function() {
                    answsers.push(response);
                    // console.log(answsers);
                    if ($scope.progress.current >= $scope.progress.max) {
                      // if (survey.screenThankYouContent) {
                      //     $state.go('survey.screencontent', {
                      //         content: survey.screenThankYouContent,
                      //         type: 'thankYou'
                      //     });
                      // }
                      // else {
                        getNextState().then(function(nextState) {
                            $state.go(nextState.stateName, nextState.params);
                        });
                      // }
                    } else {
                        $scope.progress.maxIndex = answsers.length + 1;
                        $scope.next();
                    }
                });
            }
    }
})(angular);
