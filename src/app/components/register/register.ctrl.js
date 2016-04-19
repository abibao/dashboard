(function(angular) {
  angular
    .module('app')
    .controller('registerCtrl', registerCtrl);

  function registerCtrl($scope, userSvc ,abibaoApiSvc, $location, $state) {
    $scope.userCredentials = {
      email : locationEmailInterceptor(),
      password : ''
    }
    $scope.step = ($scope.userCredentials.email) ? 2 : 1;

    $scope.submitFormRegisterMail = function() {
      if (this.formRegisterMail.$valid) {
        $scope.step = 2;
      }
    }
    $scope.submitFormRegisterPassword = function(formres) {
      if (this.formRegisterPassword.$valid) {
        registerUser();
      }
    }

    function registerUser() {
      abibaoApiSvc.individuals.register({
          email:$scope.userCredentials.email,
          password1:$scope.userCredentials.password,
          password2:$scope.userCredentials.password
        }, function(res) {
          userIsRegistered();
        }
      );
    }

    function userIsRegistered() {
        abibaoApiSvc.individuals.login({
          email:$scope.userCredentials.email,
          password:$scope.userCredentials.password
          }, function(res) {
            var loadUrn = (res.globalInfos.abibaoInProgress.length) ? res.globalInfos.abibaoInProgress[0].urn : res.globalInfos.abibaoCompleted[0].urn;
            $state.go('survey', {urn:loadUrn});
          }
        );
    }

    function locationEmailInterceptor() {
      var locationSearchEmail = $location.search().registermail;
      if (typeof locationSearchEmail == 'string') {
        $location.search({}).path('/register');
        return locationSearchEmail;
      }
      return '';
    }
  }
})(angular);
