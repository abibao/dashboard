(function(angular) {
  angular
    .module('app')
    .controller('registerCtrl', registerCtrl);

  function registerCtrl(Analytics, $scope, userSvc ,abibaoApiSvc, $location, $state) {
    Analytics.pageView();
    $scope.userCredentials = {
      email : locationEmailInterceptor(),
      entity : locationEntityInterceptor(),
      password : ''
    }
    $scope.step = ($scope.userCredentials.email) ? 2 : 1;
    $location.search({}).path('/register');

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
      var credentials = {
        email:$scope.userCredentials.email,
        password1:$scope.userCredentials.password,
        password2:$scope.userCredentials.password
      }
      if ($scope.userCredentials.entity) {
        credentials.entity = $scope.userCredentials.entity;
      }
      abibaoApiSvc.individuals.register(credentials
        , function(res) {
          userIsRegistered();
        }, function(err) {
          alert(err.data.message);
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
        return locationSearchEmail;
      }
      return '';
    }

    function locationEntityInterceptor() {
      var locationSearchEntity = $location.search().registercharity;
      if (typeof locationSearchEntity == 'string') {
        return locationSearchEntity;
      }
      return false;
    }
  }
})(angular);
