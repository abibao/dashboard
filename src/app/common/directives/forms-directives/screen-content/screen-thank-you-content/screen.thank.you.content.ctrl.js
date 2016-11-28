(function(angular) {
  function screenThankYouContentCtrl($sce) {
    this.explicitlyTrustedHtml = $sce.trustAsHtml(this.content)
  }
  angular
    .module('app')
    .component("screenThankYouContent", {
      templateUrl: 'app/common/directives/forms-directives/screen-content/screen.thank.you.content/screen.thank.you.content.tpl.html',
      bindings: {show: '=', content: '=', click: '='},
      controller : screenThankYouContentCtrl
    });
})(angular);
