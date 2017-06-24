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
                userService.updateInfo().then(function(){
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
        displayName: '',
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        email: '',
        photoURL: '', 
    }
    // Parameter End

    // Function Start
    $scope.init = function(){
        $scope.form.gender = 'male';
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
               userService.getInfo(accountService.getUserInfo().uid).then(function(result){
                   console.log(result.firstName);
                   $scope.form = result;
                   $scope.$apply();
               })
            }
        });
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
