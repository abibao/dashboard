(function(angular) {
  angular
    .module('app')
    .component("formStatement", {
        templateUrl: 'app/common/directives/forms-directives/form-components/statement/form.statement.tpl.html',
        bindings: {item: '=', submitAnswer: '=', progress:'=', previous:'=',next:'='}
    });
})(angular);
