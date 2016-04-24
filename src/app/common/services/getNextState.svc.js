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
      console.log(globalInfos);
      if (!globalInfos.abibaoCompleted.length) {
        console.log('pas de sondage abibao de complété');
        nextState.stateName = 'survey';
        nextState.params.urn = globalInfos.abibaoInProgress[0].urn;
      }
      else {
        console.log('au moins 1 sondage abibao de complété');
        if (!globalInfos.currentCharity) {
          console.log('je n\'ai pas de charity');
          if (globalInfos.abibaoCompleted.length == 1) {
            console.log('choix de la charité');
            nextState.stateName = 'charitychoice';
          }
          else if(globalInfos.abibaoInProgress.length){
            console.log('next : autre sondage abibao');
            nextState.stateName = 'survey';
            nextState.params.urn = globalInfos.abibaoInProgress[0].urn;
          }
          else {
            console.log('next : plus de sondage !');
            nextState.stateName = 'all-finished';
          }
        }
        else {
          console.log('j\'ai une charity');
          if (globalInfos.surveysInProgress.length) {
            console.log('next : sondage de ma charity');
            nextState.stateName = 'survey';
            nextState.params.urn = globalInfos.surveysInProgress[0].urn;
          }
          else if(globalInfos.abibaoInProgress.length){
            console.log('next : autre sondage abibao');
            nextState.stateName = 'survey';
            nextState.params.urn = globalInfos.abibaoInProgress[0].urn;
          }
          else if (globalInfos.abibaoCompleted.length == 2 && !globalInfos.surveysCompleted.length) {
            console.log('next : un email vous a été envoyé');
            nextState.stateName = 'email-sended';
          }
          else {
            console.log('next : plus de sondage !');
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
