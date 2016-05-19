(function(angular) {
  function screenWelcomeContentCtrl() {
    var ctrl = this;
    // if (!this.item.placeholder) {
    //   this.selected = this.item.choices[0].urn;
    // }
    // this.submitChoice = function(choiceUrn) {
    //   if (this.formDropdown.$valid) {
    //     this.submitAnswer({label:this.item.label,answer:choiceUrn});
    //   }
    // }
  }
  angular
    .module('app')
    .component("screenWelcomeContent", {
        templateUrl: 'app/common/directives/forms-directives/screen-content/screen-welcome-content/screen.welcome.content.tpl.html',
        controller : screenWelcomeContentCtrl,
        bindings: {item: '=', submitAnswer: '='}
    });
})(angular);
