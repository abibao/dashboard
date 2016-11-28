(function(angular) {
  function formStatementCtrl($sce) {
    this.explicitlyTrustedHtml = $sce.trustAsHtml(this.item.description)
  }
  angular
    .module('app')
    .component("formStatement", {
      templateUrl: 'app/common/directives/forms-directives/form-components/statement/form.statement.directive.tpl.html',
      bindings: {item: '=', submitAnswer: '=', progress:'=', previous:'=',next:'='},
      controller : formStatementCtrl
    });
})(angular);
