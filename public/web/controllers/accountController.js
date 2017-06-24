var myApp = angular.module("app.account", []);


myApp.controller('LoginController', function($scope, $location, accountService, urlService, userService) {
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
                console.log('get');
                userService.updateInfo().then(function(){
                    console.log('up');
                    window.location.href = urlService.server()+"/profile";
                })
            }
        })
    }
    // Function End

    // Directive Start
    // Directive End
    $scope.init();
});


myApp.controller('ProfileController', function($scope, userService, accountService) {
    // Parameter Start
    $scope.form = {
        displayName: 'sss',
        firstName: '',
        lastName: '',
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
        userService.setInfo($scope.form).then(function(){
            Materialize.toast('Update Success', 4000); 
        });
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
