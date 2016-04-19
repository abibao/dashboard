(function(angular) {
  angular
    .module('app')
    .directive("formNumber", function() {
      return {
        restrict: 'EA',
        templateUrl: 'app/common/directives/forms-directives/form-components/number/form.number.directive.tpl.html'
      };
    });
})(angular);
