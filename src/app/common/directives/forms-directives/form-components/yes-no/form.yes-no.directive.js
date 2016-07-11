(function(angular) {
  angular
    .module('app')
    .component("formYesNo", {
        templateUrl: 'app/common/directives/forms-directives/form-components/yes-no/form.yes-no.tpl.html',
        bindings: {item: '=', submitAnswer: '=', progress:'=', previous:'=',next:'='}
    });
})(angular);
