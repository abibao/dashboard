(function(angular) {
  function formNumberCtrl() {
    var ctrl = this;
    this.submitChoice = function(res) {
      if (this.formNumber.$valid) {
        this.submitAnswer({label:this.item.label,answer:res});
      }
    }
  }
  angular
    .module('app')
    .component("formNumber", {
        templateUrl: 'app/common/directives/forms-directives/form-components/number/form.number.directive.tpl.html',
        controller : formNumberCtrl,
        bindings: {item: '=', submitAnswer: '='}
    });
})(angular);
