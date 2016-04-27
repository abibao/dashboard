(function(angular) {
  function formMultipleChoiceCtrl() {
    var ctrl = this;
    this.selectChoice = function(choice) {
      choice.selected = choice.selected ? false : true;
    }
    this.submitChoice = function() {
      var choicesSelected = this.item.choices.filter(function(item) {
        return item.selected;
      });
      console.log(choicesSelected);
    }
  }
  angular
    .module('app')
    .component("formMultipleChoice", {
        templateUrl: 'app/common/directives/forms-directives/form-components/multiple-choice/form.multiplechoice.tpl.html',
        controller : formMultipleChoiceCtrl,
        bindings: {item: '='}
    });
})(angular);
