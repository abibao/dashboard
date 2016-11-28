(function(angular) {
  function formMultipleChoiceCtrl() {
    var ctrl = this;
    this.customOptionAnswer = {
      selected: false,
      meta: 'ABIBAO_CUSTOM_ANSWER',
      answer: ''
    };
    this.selectChoice = function(choice) {
      if(choice.meta==='ABIBAO_CGU__NO') {
        window.location = 'http://abibao.com/butwhy.html'
        return null;
      }
      if (!this.item.multipleSelections) {
        // reset selected
        this.customOptionAnswer.selected = false;
        this.item.choices.forEach(function(item) {
          item.selected = false;
        });
        if(choice.meta==='ABIBAO_CUSTOM_ANSWER') {
          // if custom then select the custom option answer
          this.customOptionAnswer.selected = this.customOptionAnswer.selected ? false : true;
        } else {
          // if not custom choice then submit the answer
          this.submitAnswer({label: this.item.label, answer: choice.urn});
        }
      } else {
        if(choice.meta==='ABIBAO_CUSTOM_ANSWER') {
          this.customOptionAnswer.selected = this.customOptionAnswer.selected ? false : true;
        } else {
          choice.selected = choice.selected ? false : true;
        }
      }
    }

    this.submitChoice = function() {
      var choicesSelected = this.item.choices.filter(function(item) {
        return item.selected;
      });
      choicesSelected = choicesSelected.map(function(item) {
        return item.urn;
      });
      if(this.customOptionAnswer.selected===true) {
        choicesSelected.push(this.customOptionAnswer.answer);
      }
      if (choicesSelected.length) {
        return this.submitAnswer({label: this.item.label, answer: choicesSelected});
      }
    }

  }
  angular
    .module('app')
    .component("formMultipleChoice", {
        templateUrl: 'app/common/directives/forms-directives/form-components/multiple-choice/form.multiplechoice.directive.tpl.html',
        controller : formMultipleChoiceCtrl,
        bindings: {item: '=', submitAnswer: '=', progress: '=', previous: '=', next: '='}
    });
})(angular);
