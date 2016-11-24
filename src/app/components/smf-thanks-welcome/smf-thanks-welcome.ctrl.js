(function (angular) {
angular
  .module('app')
  .controller('smfThanksWelcomeCtrl', smfThanksWelcomeCtrl)

  function smfThanksWelcomeCtrl(Analytics, abibaoApiSvc, $rootScope, $scope, $state, $stateParams) {
    Analytics.pageView();
    $scope.selected_startup = false;
    $rootScope.enableLogoSMF = true;
    $rootScope.enableLogo = false;
    $rootScope.isLoggedIn = true;
    abibaoApiSvc.startups.getScore({node: $stateParams.node}, function (res) {
      $scope.selected_startup = res;
    }, function(error) {
    });
    $scope.registerEmail = function() {
      window.location = 'register?registermail=' + $stateParams.email
    }
  }
})(angular);
