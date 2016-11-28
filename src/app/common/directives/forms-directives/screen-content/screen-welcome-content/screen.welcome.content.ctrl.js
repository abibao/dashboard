(function(angular) {
  function screenWelcomeContentCtrl($sce) {
    this.explicitlyTrustedHtml = $sce.trustAsHtml(this.content)
  }
  angular
    .module('app')
    .component("screenWelcomeContent", {
      templateUrl: 'app/common/directives/forms-directives/screen-content/screen-welcome-content/screen.welcome.content.tpl.html',
      bindings: {show: '=', content: '=', click: '='},
      controller : screenWelcomeContentCtrl
    });
})(angular);
