(function (angular) {
angular
  .module('app')
  .controller('smfThanksCtrl', smfThanksCtrl);

  function smfThanksCtrl(Analytics, abibaoApiSvc, $rootScope, $scope, $state, $stateParams) {
    Analytics.pageView();
    $scope.selected_startup = false;
    $rootScope.enableLogoSMF = true;
    $rootScope.enableLogo = false;
    $rootScope.isLoggedIn = true;
    abibaoApiSvc.startups.getScore({node: $stateParams.node}, function (res) {
      $scope.selected_startup = res;
    }, function(error) {
    });
    $scope.shareFacebook = function() {
      window.location = 'https://www.facebook.com/abibao.for.awesome.people/'
    }
  }
})(angular);
