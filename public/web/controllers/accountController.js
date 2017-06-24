var myApp = angular.module("app.account", []);


myApp.controller('LoginController', function($scope, $location, $rootScope, accountService, urlService, userService) {
    // Parameter Start
    // Parameter End

    // Function Start
    $scope.init = function() {
        $('#preloading').css("display", "none");
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

        accountService.getUserInfo().then(function(resolve){
            if(resolve != null){
                window.location.href = urlService.server()+"/profile";
            }
        }).catch(function(reject){
            console.log(reject);
        })
    };

    $scope.login = function(){

        $('#preloading').css("display", "block");
        accountService.login().then(function(){
            accountService.getUser().then(function(resolve){
                if(resolve != null){
                    userService.updateInfo().then(function(){
                        $('#preloading').css("display", "none");
                        window.location.href = urlService.server()+"/profile";
                    }).catch(function(reject){
                        console.log(reject);
                        $('#preloading').css("display", "none");
                        Materialize.toast('Cannot login err:03', 4000); 
                    })
                } else {
                    console.log(reject);
                    $('#preloading').css("display", "none");
                    Materialize.toast('Cannot login err:02', 4000); 
                }
            }).catch(function(reject){
                console.log(reject);
                $('#preloading').css("display", "none");
                Materialize.toast('Cannot login err:02', 4000); 
            })
        }).catch(function(reject){
            console.log(reject);
            $('#preloading').css("display", "none");
            Materialize.toast('Cannot login err:01', 4000); 
        })
    }
    // Function End

    // Directive Start
    // Directive End
    $scope.init();
});


myApp.controller('ProfileController', function($scope, $location, urlService, authFactory, userService, accountService) {
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
    
    $scope.show = {
        main : false,
        preloading : true,
    }

    $scope.habit = [1,1,1,1,1];
    // Parameter End

    // Function Start
    $scope.init = function(){
        if(navigator.onLine){
            accountService.getUserInfo().then(function(resolve){
                console.log("resolve", resolve);
                if(resolve != null){
                    userService.getInfo(resolve.uid).then(function(resolve){
                        authFactory.setAuthObject(resolve);
                        $scope.form = resolve;
                        $scope.show.preloading = false;
                        $scope.show.main = true;
                        $scope.$apply();
                    }).catch(function(reject){
                        $scope.show.preloading = false;
                        $scope.show.main = true;
                        $scope.$apply();
                        console.log(reject);
                    })
                } else {
                    $scope.show.preloading = false;
                    $scope.show.main = true;
                    $scope.$apply();
                }
            }).catch(function(reject){
                $scope.show.preloading = false;
                $scope.show.main = true;
                $scope.$apply();
                console.log(reject);
            })
        }else{
            var authObject = authFactory.getetAuthObject();
            console.log(authObject);
            if(authObject != null && authObject != ""){
                $scope.form = authObject;
                $scope.show.preloading = false;
                $scope.show.main = true;
            }
        }
        
    };

    $scope.update = function(){
        userService.setInfo($scope.form).then(function(resolve){
            Materialize.toast('Update Success', 4000); 
        }).catch(function(reject){
            console.log(reject);
        });
    };

    $scope.updateHabit = function(){
        console.log($scope.habit);
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
