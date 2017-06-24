var myApp = angular.module("app.accost", []);


myApp.controller('SelectController', function($scope, $location, urlService, matchingService, userService, accountService) {
    // Parameter Start
    $scope.accounts = "";
    $scope.show = {
        main : false,
        preloading : true,
        select: false,
    }
    $scope.questions = [];
    // Parameter End

    // Function Start
    $scope.init = function() {
        accountService.getUserInfo().then(function(resolve){
            console.log("resolve", resolve);
            if(resolve != null){
                userService.getInfo(resolve.uid).then(function(resolve){
                    if(resolve.type != undefined){
                        matchingService.getUsers().then(function(resolve){
                            $scope.accounts = resolve;
                            $scope.show.select = true;
                            $scope.show.preloading = false;
                            $scope.show.main = true;
                            $scope.$apply();
                        }).catch(function(reject){
                        });
                    } else {
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
        console.log($scope.questions);
    };

    $scope.choose = function(uid){
        console.log(uid);
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

myApp.controller('ListController', function($scope, $location, urlService) {
    // Parameter Start
     $scope.accounts = [{
        displayName: 'son poo',
        firstName: 'son',
        lastName: 'poo',
        Age: '25',
        detail:'sdafweatgawg',
        photoURL:'https://lh6.googleusercontent.com/-9QHVXyYdoWM/AAAAAAAAAAI/AAAAAAAAABE/PzTK6xALEcU/photo.jpg',
        uid:'65464131',
    },{
        displayName: 'son poo',
        firstName: 'son',
        lastName: 'poo',
        Age: '25',
        detail:'sdafweatgawg',
        photoURL:'https://lh6.googleusercontent.com/-9QHVXyYdoWM/AAAAAAAAAAI/AAAAAAAAABE/PzTK6xALEcU/photo.jpg',
        uid:'65464131',
    },{
        displayName: 'son poo',
        firstName: 'son',
        lastName: 'poo',
        Age: '25',
        detail:'sdafweatgawg',
        photoURL:'https://lh6.googleusercontent.com/-9QHVXyYdoWM/AAAAAAAAAAI/AAAAAAAAABE/PzTK6xALEcU/photo.jpg',
        uid:'65464131',
    },{
        displayName: 'son poo',
        firstName: 'son',
        lastName: 'poo',
        Age: '25',
        detail:'sdafweatgawg',
        photoURL:'https://lh6.googleusercontent.com/-9QHVXyYdoWM/AAAAAAAAAAI/AAAAAAAAABE/PzTK6xALEcU/photo.jpg',
        uid:'65464131',
    }];
    // Parameter End

    // Function Start
    $scope.init = function() {
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
