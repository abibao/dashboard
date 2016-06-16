(function(angular) {
  angular
    .module('app')
    .component("screenThankYouContent", {
        templateUrl: 'app/common/directives/forms-directives/screen-content/screen-welcome-content/screen.welcome.content.tpl.html',
        bindings: {show: '=', content: '=', click: '='}
    });
})(angular);
