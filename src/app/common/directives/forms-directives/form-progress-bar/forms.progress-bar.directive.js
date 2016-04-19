(function(angular) {
  angular
    .module('app')
    .directive("formProgressBar", function() {
      return {
        restrict: 'E',
        templateUrl: 'app/common/directives/forms-directives/form-progress-bar/forms.progress-bar.tpl.html',
        link: function(scope) {
          scope.$watch('progress.current', function(newValue, oldValue) {
            var percentWidth = scope.progress.current * 100 / scope.progress.max;
            scope.progressWidth = (percentWidth <= 98) ? percentWidth : 98;
          }, true);
        }
      };
    });
})(angular);
