(function(angular) {
  function formNumberCtrl() {
    var $ctrl = this;
    this.numberRes = 0;
    this.submitChoice = function(res) {
      if (this.formNumber.$valid) {
        this.submitAnswer({label:this.item.label,answer:res});
      }
      else {
        $ctrl.formError = {
          close : true
        }
        if ($ctrl.item.minimum && $ctrl.item.maximum) {
          $ctrl.formError.message = 'Oups, vous devez entrer un nombre entre '+$ctrl.item.minimum+' et '+$ctrl.item.maximum;
        }
        else if ($ctrl.item.minimum) {
          $ctrl.formError.message = 'Oups, vous devez entrer un nombre plus grand que '+$ctrl.item.minimum;
        }
        else if ($ctrl.item.maximum) {
          $ctrl.formError.message = 'Oups, vous devez entrer un nombre entre 0 et '+$ctrl.item.maximum;
        }
        else {
          $ctrl.formError.message = 'Oups, vous devez entrer un nombre valide';
        }
      }
    }
  }
  angular
    .module('app')
    .component("formNumber", {
        templateUrl: 'app/common/directives/forms-directives/form-components/number/form.number.directive.tpl.html',
        controller : formNumberCtrl,
        bindings: {item: '=', submitAnswer: '=', progress:'=', previous:'=',next:'='}
    });
})(angular);
