(function(angular) {
  function formMessageCtrl() {
    var ctrl = this;
    this.closeMessage = function(){
      delete this.message;
    }
  }
  angular
    .module('app')
    .component("formMessage", {
        templateUrl: 'app/common/directives/forms-directives/form-message/form.message.tpl.html',
        controller : formMessageCtrl,
        bindings: {message: '=', close: '='}
    });
})(angular);
