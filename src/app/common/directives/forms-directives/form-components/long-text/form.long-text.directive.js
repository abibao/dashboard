(function(angular) {
  function formLongTextCtrl() {
    var $ctrl = this;
    console.log(this.item, this.item.label);
    this.longText = '';
    this.submitChoice = function(res) {
      this.submitAnswer({label: this.item.label, answer: res});
    }
  }
  angular
    .module('app')
    .component("formLongText", {
        templateUrl: 'app/common/directives/forms-directives/form-components/long-text/form.long-text.directive.tpl.html',
        controller : formLongTextCtrl,
        bindings: {item: '=', submitAnswer: '=', progress:'=', previous:'=',next:'='}
    });
})(angular);
