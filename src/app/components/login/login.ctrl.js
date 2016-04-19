(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('loginCtrl', loginCtrl);

  function loginCtrl($scope, userSvc ,abibaoApiSvc, $state, nextSurvey) {
    $scope.title = 'login';
    $scope.login = function(credentials) {
      abibaoApiSvc.individuals.login({
        email:credentials.email,
        password:credentials.password},
        function(res) {
          loadSurveyHighPriority(res.globalInfos);
        }
      );
    }

    function loadSurveyHighPriority(globalInfos) {
      var nextUrn = nextSurvey(globalInfos);
      console.log(nextUrn);
      if (nextUrn) {
        $state.go('survey', {urn:nextUrn})
      }
      else {
        if (!globalInfos.currentCharity) {
          $state.go('charitychoice');
        }
        else {
          console.log('PLUS DE SONDAGE');
        }
      }
    }
  }
})(angular);
