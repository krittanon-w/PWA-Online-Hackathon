var myApp = angular.module("app.accost", []);


myApp.controller('SelectController', function($scope, $location, urlService, messageService, matchingService, userService, accountService, dtreeService) {
    // Parameter Start
    $scope.accounts = "";
    $scope.show = {
        main : false,
        preloading : true,
        select: false,
        warn: true,
    }
    $scope.questions = [];
    // Parameter End

    // Function Start
    $scope.init = function() {
        accountService.getUserInfo().then(function(resolve){
            if(resolve != null){
                userService.getInfo(resolve.uid).then(function(resolve){
                    if(resolve.type != undefined){
                        matchingService.getUsers(resolve.type).then(function(resolve){
                            $scope.accounts = resolve;
                            $scope.show.select = true;
                            $scope.show.preloading = false;
                            $scope.show.main = true;
                            $scope.$apply();
                        }).catch(function(reject){
                        });
                    } else {
                        $scope.show.warn = true;
                        $scope.show.preloading = false;
                        $scope.show.main = true;
                        $scope.$apply();
                    }
                }).catch(function(reject){
                });
            }
        }).catch(function(reject){
        })
    };

    $scope.submit = function(uid){
        $scope.show.select = false;
        $scope.show.preloading = true;
        $scope.show.main = false;
        accountService.getUserInfo().then(function(resolve){
            if(resolve != null){
                userService.getInfo(resolve.uid).then(function(resolve){
                    if(resolve != null){
                        var traningData = {
                            age: resolve.age,
                            gender: resolve.gender,
                            q1: $scope.questions[0],
                            q2: $scope.questions[1],
                            q3: $scope.questions[2],
                            q4: $scope.questions[3],
                            q5: $scope.questions[4],
                        };
                        dtreeService.getPrediction(traningData).then(function(resolve){
                            if(resolve.decission != null){
                                userService.updateType(resolve.decission).then(function(resolve){
                                    $scope.show.select = true;
                                    $scope.show.preloading = false;
                                    $scope.show.main = true;
                                    $scope.init();
                                    Materialize.toast('Finish now you can meet your favorite type', 4000);
                                }).catch(function(reject){
                                    $scope.show.select = true;
                                    $scope.show.preloading = false;
                                    $scope.show.main = true;
                                    Materialize.toast('Cannot login err:06', 4000); 
                                })
                            }
                        }).catch(function(reject){
                            $scope.show.select = true;
                            $scope.show.preloading = false;
                            $scope.show.main = true;
                            Materialize.toast('Cannot login err:05', 4000); 
                        })
                    }
                }).catch(function(reject){
                    $scope.show.select = true;
                    $scope.show.preloading = false;
                    $scope.show.main = true;
                    Materialize.toast('Cannot login err:04', 4000); 
                });
            }
        }).catch(function(reject){
            $scope.show.select = true;
            $scope.show.preloading = false;
            $scope.show.main = true;
            Materialize.toast('Cannot login err:04', 4000); 
        })
    };

    $scope.addTalk = function(uid){
        messageService.addTalk(uid).then(function(resolve){
        }).catch(function(reject){
        })
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

myApp.controller('ListController', function($scope, $location, $q, urlService, messageService, userService) {
    // Parameter Start
     $scope.accounts = [];
     var promises = [];
     $scope.show = {
         main: false,
         preloading: true,
     }
    // Parameter End

    // Function Start
    $scope.init = function() {
        messageService.getPartners().then(function(resolve){
            angular.forEach(resolve, function(value, key) {
                promises.push(userService.getInfo(key).then(function(resolve){
                    var tmp ={uid: key, displayName: resolve.displayName, photoURL: resolve.photoURL};
                    return tmp;
                }).catch(function(reject){
                }));
            })
            Promise.all(promises).then(function(result){
                $scope.accounts = result;
                $scope.show.main = true;
                $scope.show.preloading = false;
                $scope.$apply();
            });
        }).catch(function(reject){
        })
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
