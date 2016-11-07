(function(angular) {
  function formDropdownCtrl() {
    var ctrl = this;
    if (!this.item.placeholder) {
      this.selected = this.item.choices[0];
    }
    this.selectChoice = function(index) {
      this.selected = this.item.choices[index];
      console.log(this.selected)
    }
    this.submitChoice = function() {
      if (this.formDropdown.$valid) {
        this.submitAnswer({
          label:this.item.label,
          answer: this.selected.urn
        });
      }
      else {
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
        templateUrl: 'app/common/directives/forms-directives/form-components/dropdown/form.dropdown.tpl.html',
        controller : formDropdownCtrl,
        bindings: {item: '=', submitAnswer: '=', progress:'=', previous:'=',next:'='}
    });
})(angular);
