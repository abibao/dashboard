(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('dashboardCtrl', homeCtrl);

  // homeCtrl.$inject = ['$scope'];

  function homeCtrl() {
    var vm = this;
    vm.test = 'dashboard !';

  }
})(angular);
