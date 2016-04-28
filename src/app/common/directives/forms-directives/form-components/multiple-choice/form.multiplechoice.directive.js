(function(angular) {
  function formMultipleChoiceCtrl() {
    var ctrl = this;
    console.log(this.item.multipleSelections);
    this.selectChoice = function(choice) {
      if (!this.item.multipleSelections) {
        this.item.choices.forEach(function(item) {
          item.selected = false;
        });
        this.submitAnswer({label:this.item.label,answer:choice.meta});
      }
      choice.selected = choice.selected ? false : true;
    }

    this.submitChoice = function() {
      var choicesSelected = this.item.choices.filter(function(item) {
        return item.selected;
      });
      choicesSelected = choicesSelected.map(function(item) {
        return item.meta;
      });
      if (choicesSelected.length) {
        this.submitAnswer({label:this.item.label,answer:choicesSelected});
      }
    }

  }
  angular
    .module('app')
    .component("formMultipleChoice", {
        templateUrl: 'app/common/directives/forms-directives/form-components/multiple-choice/form.multiplechoice.tpl.html',
        controller : formMultipleChoiceCtrl,
        bindings: {item: '=', submitAnswer: '='}
    });
})(angular);
