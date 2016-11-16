(function(angular) {
  angular
    .module('app')
    .controller('registerCtrl', registerCtrl);

  function registerCtrl(Analytics, $scope, userSvc ,abibaoApiSvc, $location, $state) {
    Analytics.pageView();
    $scope.userCredentials = {
      email : locationEmailInterceptor(),
      entity : locationEntityInterceptor(),
      survey : locationSurveyInterceptor(),
      source : locationSourceInterceptor(),
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
      if ($scope.userCredentials.survey) {
        credentials.survey = $scope.userCredentials.survey;
      }
      if ($scope.userCredentials.source) {
        credentials.source = $scope.userCredentials.source;
      }
      abibaoApiSvc.individuals.register(credentials
        , function(res) {
          userIsRegistered();
        }, function(err) {
          $scope.formError = {
            close : true,
            message : 'Oups, il semblerait que vous ayez déjà un compte avec cette adresse Email'
          }
          $scope.step = 1;
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
      var locationSearchEntity = $location.search().registerentity;
      if (typeof locationSearchEntity == 'string') {
        return locationSearchEntity;
      }
      return false;
    }

    function locationSurveyInterceptor() {
      var locationSearchSurvey = $location.search().registersurvey;
      if (typeof locationSearchSurvey == 'string') {
        return locationSearchSurvey;
      }
      return false;
    }

    function locationSourceInterceptor() {
      var locationSearchSource = $location.search().registersource;
      if (typeof locationSearchSource == 'string') {
        return locationSearchSource;
      }
      return false;
    }

  }
})(angular);
