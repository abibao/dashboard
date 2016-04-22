(function(angular) {
  angular
    .module('app')
    .directive("formText", function() {
      return {
        restrict: 'EA',
        templateUrl: 'app/common/directives/forms-directives/form-components/text/form.text.directive.tpl.html'
      };
    });
})(angular);
