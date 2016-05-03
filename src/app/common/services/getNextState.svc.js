(function(angular) {
  angular.module('app').factory('getNextState', function($q, abibaoApiSvc, userSvc){
    function getNextState(cachedGlobalInfos) {
      var deferred = $q.defer();
      if (cachedGlobalInfos) {
        deferred.resolve(findNextState(cachedGlobalInfos));
      }
      else {
        abibaoApiSvc.globalInfos.get(function(globalInfos) {
          userSvc.globalInfos = globalInfos;
          deferred.resolve(findNextState(globalInfos));
        });
      }
      return deferred.promise;
    }

    function findNextState(globalInfos) {
      var nextState = {
        params : {}
      };
      if (!globalInfos.abibaoCompleted.length) {
        nextState.stateName = 'survey';
        nextState.params.urn = globalInfos.abibaoInProgress[0].urn;
      }
      else {
        if (!globalInfos.currentCharity) {
          if (globalInfos.abibaoCompleted.length == 1) {
            nextState.stateName = 'charitychoice';
          }
          else if(globalInfos.abibaoInProgress.length){
            nextState.stateName = 'survey';
            nextState.params.urn = globalInfos.abibaoInProgress[0].urn;
          }
          else {
            nextState.stateName = 'all-finished';
          }
        }
        else {
          if (globalInfos.surveysInProgress.length) {
            nextState.stateName = 'survey';
            nextState.params.urn = globalInfos.surveysInProgress[0].urn;
          }
          else if(globalInfos.abibaoInProgress.length){
            nextState.stateName = 'survey';
            nextState.params.urn = globalInfos.abibaoInProgress[0].urn;
          }
          else if (globalInfos.abibaoCompleted.length == 2 && !globalInfos.surveysCompleted.length) {
            nextState.stateName = 'email-sended';
          }
          else {
            nextState.params.urn = false;
            nextState.stateName = 'all-finished';
          }
        }
      }
      return nextState;
    }

    return getNextState;
  });
})(angular);
