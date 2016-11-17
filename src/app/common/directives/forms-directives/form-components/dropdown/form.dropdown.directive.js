(function(angular) {
  function formDropdownCtrl() {
    var ctrl = this;
    if (!this.item.placeholder) {
      this.selected = this.item.choices[0].urn;
    }
    ctrl.customOptionAnswer = '';
    this.submitChoice = function(choiceUrn) {
      if (this.formDropdown.$valid) {
        if (choiceUrn === 'ABIBAO_CUSTOM_ANSWER') {
          choiceUrn = ctrl.customOptionAnswer;
        }
        this.submitAnswer({label: this.item.label, answer: choiceUrn});
      } else {
        $ctrl.formError = {
          message : 'Oups, vous devez faire un choix dans le liste.',
          close : true
        }
      }
    }
  }
  angular
    .module('app')
    .component("formDropdown", {
        templateUrl: 'app/common/directives/forms-directives/form-components/dropdown/form.dropdown.directive.tpl.html',
        controller : formDropdownCtrl,
        bindings: {item: '=', submitAnswer: '=', progress:'=', previous:'=',next:'='}
    });
})(angular);
