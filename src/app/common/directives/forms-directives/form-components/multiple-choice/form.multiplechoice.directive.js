(function(angular) {
  angular
    .module('app')
    .directive("formMultipleChoice", function() {
      return {
        restrict: 'EA',
        templateUrl: 'app/common/directives/forms-directives/form-components/multiple-choice/form.multiplechoice.tpl.html'
      };
    });
})(angular);
