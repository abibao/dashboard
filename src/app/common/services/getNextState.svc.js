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
      // 1) on a abibao position 1 en abibaoInProgress
      if (globalInfos.abibaoInProgress.length > 0 && globalInfos.abibaoInProgress[0].position === 1) {
        nextState.stateName = 'survey';
        nextState.params.urn = globalInfos.abibaoInProgress[0].urn;
        return nextState;
      }
      // 2) on a des surveysInProgress
      if (globalInfos.surveysInProgress.length > 0) {
        if (!globalInfos.currentCharity) {
          nextState.stateName = 'charitychoice';
          return nextState;
        }
        nextState.stateName = 'survey';
        nextState.params.urn = globalInfos.surveysInProgress[0].urn;
        return nextState;
      }
      // 3) on a abibao position 2 en abibaoInProgress
      if (globalInfos.abibaoInProgress.length > 0 && globalInfos.abibaoInProgress[0].position === 2) {
        if (!globalInfos.currentCharity) {
          nextState.stateName = 'charitychoice';
          return nextState;
        }
        nextState.stateName = 'survey';
        nextState.params.urn = globalInfos.abibaoInProgress[0].urn;
        return nextState;
      }
      // 4) on a abibaoInProgress non vide, alors on le joue (forcément position 3 et 4)
      if (globalInfos.abibaoInProgress.length > 0) {
        nextState.stateName = 'survey';
        nextState.params.urn = globalInfos.abibaoInProgress[0].urn;
        return nextState;
      }
      // 5) on a abibaoInProgress vide et surveysInProgress vide
      // 5.1) abibaoCompleted == 2 alors 'email-sended'
      if (globalInfos.abibaoCompleted.length === 2) {
        nextState.stateName = 'email-sended';
        return nextState;
      }
      // 5.2) abibaoCompleted == 4 alors 'all-finished'
      if (globalInfos.abibaoCompleted.length === 4) {
        nextState.stateName = 'all-finished';
        return nextState;
      }
    }

    return getNextState;
  });
})(angular);
