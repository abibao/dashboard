(function(angular) {
  angular
    .module('app')
    .directive("formYesNo", function() {
      return {
        restrict: 'EA',
        templateUrl: 'app/common/directives/forms-directives/form-components/yes-no/form.yes-no.tpl.html'
      };
    });
})(angular);
