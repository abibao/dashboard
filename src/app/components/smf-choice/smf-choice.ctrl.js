(function (angular) {
  'use strict';

  angular
    .module('app')
    .controller('smfChoiceCtrl', smfChoiceCtrl)

  function smfChoiceCtrl (Analytics, $rootScope, $scope, abibaoApiSvc, $location, $stateParams) {
    Analytics.pageView();
    $rootScope.enableLogoSMF = true;
    $rootScope.enableLogo = false;
    $rootScope.isLoggedIn = true;
    $scope.loading_in_progress = true;
    $scope.selected_startup = false;
    abibaoApiSvc.startup.get({node: $stateParams.node}, function (res) {
      $scope.loading_in_progress = false;
      $scope.selected_startup = {
        node: $stateParams.node,
        content: res.content,
        title: res.title,
        media: res.media
      };
    }, function(error) {
      $scope.loading_in_progress = false;
      $scope.selected_startup = false;
    });
    // set vote
    $scope.email = '';
    $scope.startupVote = function() {
      console.log('startupVote', $scope.email, $stateParams.node);
    };
  };
})(angular);
