var myApp = angular.module("app.account", []);


myApp.controller('LoginController', function($scope, accountService) {
    // Parameter Start
    // Parameter End

    // Function Start
    $scope.init = function() {
        const messaging = firebase.messaging();
        notification.requestPermission()
        .then(function(){
            return messaging.getToken();
        })
        .then(function(token){
            console.log(token);
            $scope.token = token;
        })
        .catch(function(err){
            console.log(err);
        });
    };

    $scope.login = function(){
        accountService.login();
    }

    const messaging = firebase.messaging();
    messaging.requestPermission()
    .then(function(){
        return messaging.getToken();
    })
    .then(function(token){
        console.log(token);
        $scope.token = token;
    })
    .catch(function(err){
        console.log(err);
    }); 
    // Function End

    // Directive Start
    // Directive End
    $scope.init();
});


myApp.controller('ProfileController', function($scope, accountService) {
    // Parameter Start
    $scope.test = "test";
    // Parameter End

    // Function Start
    $scope.init = function(){
    };

    $scope.update = function(){

    };
    // Function End

    // Directive Start
    $scope.header = {
        delegates: {
        },
        configs: {
        },
    };
    // Directive End
    $scope.init();
});
