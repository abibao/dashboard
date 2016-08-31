(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('smfChoiceCtrl', smfChoiceCtrl);

  function smfChoiceCtrl(Analytics, $scope, abibaoApiSvc, $location) {
    Analytics.pageView();
  }
})(angular);
