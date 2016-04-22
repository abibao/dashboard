(function(angular) {
  angular.module('app').factory('userSvc', function($cookies, $rootScope){
    var user = {
      token : false,
      isLoggedIn : false,
      email : false,
      globalInfos : false
    }
    return {
      setToken : function(token) {
        $cookies.put('abibao_user_token', token);
        user.token = token;
        return user.token;
      },
      getToken : function() {
        var abibao_user_token = $cookies.get('abibao_user_token');
        return (abibao_user_token) ? abibao_user_token : user.token;
      },
      isLoggedIn : user.isLoggedIn,
      email : user.email,
      globalInfos : user.globalInfos,
      user : user
    };
  });
})(angular);
