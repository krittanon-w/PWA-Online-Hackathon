var myApp = angular.module("app.accost", []);


myApp.controller('SelectController', function($scope, $location, urlService, matchingService) {
    // Parameter Start
    $scope.accounts = "";
    // Parameter End

    // Function Start
    $scope.init = function() {
        matchingService.getUsers().then(function(resolve){
            console.log(resolve);
            $scope.accounts = resolve;
            $scope.$apply();
        }).catch(function(reject){

        });
    };

    $scope.choose = function(uid){
        console.log(uid);
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
