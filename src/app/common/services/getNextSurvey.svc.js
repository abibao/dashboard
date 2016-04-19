(function(angular) {
  angular.module('app').factory('nextSurvey', function($q, abibaoApiSvc, userSvc){
    function getNextSurvey(cachedGlobalInfos) {
      if (cachedGlobalInfos) {
        return findNextSurvey(cachedGlobalInfos);
      }
      else {
        var deferred = $q.defer();
        abibaoApiSvc.globalInfos.get(function(globalInfos) {
          userSvc.globalInfos = globalInfos;
          deferred.resolve(findNextSurvey(globalInfos));
        });
        return deferred.promise;
      }
    }

    function findNextSurvey(globalInfos) {
      var nextUrn = '';
      if (!globalInfos.abibaoCompleted.length) {
        console.log('pas de sondage abibao de complété');
        nextUrn = globalInfos.abibaoInProgress[0].urn;
      }
      else {
        console.log('au moins 1 sondage abibao de complété');
        if (!globalInfos.currentCharity) {
          console.log('je n\'ai pas de charity');
          if(globalInfos.abibaoInProgress.length){
            console.log('next : autre sondage abibao');
            nextUrn = globalInfos.abibaoInProgress[0].urn;
          }
          else {
            console.log('next : plus de sondage !');
            nextUrn = false;
          }
        }
        else {
          console.log('j\'ai une charity');
          if (globalInfos.surveysInProgress.length) {
            console.log('next : sondage de ma charity');
            nextUrn = globalInfos.surveysInProgress[0].urn;
          }
          else if(globalInfos.abibaoInProgress.length){
            console.log('next : autre sondage abibao');
            nextUrn = globalInfos.abibaoInProgress[0].urn;
          }
          else {
            console.log('next : plus de sondage !');
            nextUrn = false;
          }
        }
      }
      return nextUrn;
    }

    return getNextSurvey;
  });
})(angular);
