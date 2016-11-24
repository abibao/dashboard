(function (angular) {
angular
    .module('app')
    .controller('smfChoiceCtrl', smfChoiceCtrl)

  function smfChoiceCtrl (Analytics, $rootScope, $scope, abibaoApiSvc, $location, $state, $stateParams) {
    Analytics.pageView();
    $rootScope.enableLogoSMF = true;
    $rootScope.enableLogo = false;
    $rootScope.isLoggedIn = true;
    $scope.loading_in_progress = true;
    $scope.selected_startup = false;
    abibaoApiSvc.startups.get({node: $stateParams.node}, function (res) {
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
    $scope.user = {
      email: ''
    };
    $scope.startupVote = function() {
      $scope.loading_in_progress = true;
      abibaoApiSvc.startups.vote({
        node: $stateParams.node,
        email: $scope.user.email,
        startup: $stateParams.node
      }, function(res) {
        if (res.converted===1) {
          $state.go('smf-thanks');
        } else {
          $state.go('smf-thanks-welcome', {email: $scope.user.email, node: $stateParams.node});
        }
        $scope.loading_in_progress = false;
      }, function(error) {
        $scope.formError = {
          close : true,
          message : error.data.message
        };
        $scope.loading_in_progress = false;
      });
    };
  };
})(angular);
