(function(angular) {
  angular
    .module('app')
    .directive("formDropdown", function() {
      return {
        restrict: 'EA',
        templateUrl: 'app/common/directives/forms-directives/form-components/dropdown/form.dropdown.tpl.html',
        link: function(scope) {
          scope.selected = scope.item.choices[0].urn;
        }
      };
    });
})(angular);
