var myApp = angular.module("app.account", []);


myApp.controller('LoginController', function($scope, $location, accountService, urlService) {
    // Parameter Start
    // Parameter End

    // Function Start
    $scope.init = function() {
        const messaging = firebase.messaging();
        messaging.requestPermission()
        .then(function(){
            return messaging.getToken();
        })
        .then(function(token){
            console.log(token);
        })
        .catch(function(err){
            console.log(err);
        }); 
    };

    $scope.login = function(){
        accountService.login().then(function(){
            if(accountService.getUser() != null){
                window.location.href = urlService.server()+"/profile";
            }
        })
    }



    // Function End

    // Directive Start
    // Directive End
    $scope.init();
});


myApp.controller('ProfileController', function($scope, accountService) {
    // Parameter Start
    $scope.form = {
        displayName: 'sss',
        name: '',
        lastname: '',
        age: '',
        gender: '',
        email: 'dsds',
        photoURL: '', 
    }
    // Parameter End

    // Function Start
    $scope.init = function(){
    };

    $scope.update = function(){
        console.log($scope.form );
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
