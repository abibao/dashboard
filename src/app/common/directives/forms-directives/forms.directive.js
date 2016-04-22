(function(angular) {
  angular
    .module('app')
    .directive("formWrapper", function($compile) {
      return {
        restrict: 'E',
        templateUrl: 'app/common/directives/forms-directives/forms.directive.tpl.html'
      };
    });
})(angular);
