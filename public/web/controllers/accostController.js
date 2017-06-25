var myApp = angular.module("app.accost", []);


myApp.controller('SelectController', function($scope, $location, $http, urlService, messageService, matchingService, userService, accountService, dtreeService) {
    // Parameter Start
    $scope.accounts = "";
    $scope.show = {
        main : false,
        preloading : true,
        select: false,
        warn: true,
    }
    $scope.type = "",
    $scope.questions = [];
    // Parameter End

    // Function Start
    $scope.init = function() {
        accountService.getUserInfo().then(function(resolve){
            if(resolve != null){
                var uid = resolve.uid
                userService.getInfo(resolve.uid).then(function(resolve){
                    if(resolve.type != undefined){
                        $scope.type = resolve.type;
                        matchingService.getUsers(uid, resolve.type).then(function(resolve){
                            $scope.accounts = resolve;
                            $scope.show.select = true;
                            $scope.show.preloading = false;
                            $scope.show.main = true;
                            $scope.$apply();
                        }).catch(function(reject){
                            console.log(reject);
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
        var flag = true;
        for(var count = 0 ; count < 5 ; count++){
            if($scope.questions[count] == undefined){
                flag = false;
            }
        }
        if(flag){
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
        } else {
            Materialize.toast('Please fill all questions', 4000); 
        }
    };

    $scope.addTalk = function(uid){
        console.log(uid);
        messageService.addTalk($http, uid).then(function(resolve){
            window.location.href = urlService.server()+"/list";
        }).catch(function(reject){
            window.location.href = urlService.server()+"/list";
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

myApp.controller('ListController', function($scope, $location, urlService, messageService, userService, chatFactory) {
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

    $scope.talk = function(uid){
        window.location.href = urlService.server()+"/chat/"+uid;
    }
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

myApp.controller('ChatController', function($scope, $location, $routeParams, chatFactory, messageService, gpsService) {
    // Parameter Start
    var uid = 0;
    $scope.messages = [];
    $scope.text = "";
    // Parameter End

    // Function Start
    $scope.init = function() {
        uid = $routeParams.id;
         messageService.getMessages(uid,function(message, subObj){
             console.log(message);
            $scope.messages.push({name: Object.keys(message)[0], value: Object.values(message)[0]});
            window.scrollBy(0, 50);
            $scope.$apply();
        })
    };

    $scope.send = function(){
        if($scope.text != ""){
            messageService.addMessage(uid,$scope.text).then(function(){
            }).catch(function(){
            })
            $scope.text = "";
        }
    }

    $scope.sendGPS = function(){
        console.log(uid);
        gpsService.getLocation().then(function(result){
            console.log(result);
            var gps = "https://www.google.com/maps/search/?api=1&query="+result.lat+","+result.lng;
            messageService.addMessage(uid,gps).then(function(){
            }).catch(function(reject){
                console.log(reject);
            })
        }).catch(function(reject){
        })
    }

    $scope.chkUrlify = function(text){
        if(text.search("https://") >= 0 || text.search("http://") >= 0){
            return false;
        } else {
            return true;
        }
    }
 

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