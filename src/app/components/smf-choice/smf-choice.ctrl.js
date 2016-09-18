(function (angular) {
  'use strict';

  angular
    .module('app')
    .controller('smfChoiceCtrl', smfChoiceCtrl)

  function smfChoiceCtrl (Analytics, $scope, abibaoApiSvc, $location, $stateParams) {
    Analytics.pageView()
    abibaoApiSvc.startup.get({node: $stateParams.node}, function (res) {
      $scope.selected_startup = {
        node: $stateParams.node,
        content: res.content,
        title: res.title,
        media: res.media
      }
    })
  }
})(angular);
