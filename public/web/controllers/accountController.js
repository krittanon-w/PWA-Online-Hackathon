var myApp = angular.module("app.account", []);


myApp.controller('LoginController', function($scope) {
    // Parameter Start
    $scope.test = "test";
    // Parameter End

    // Function Start
    $scope.init = function() {
    };

    $scope.login = function(){
        console.log("cli");
    }
    // Function End

    // Directive Start
    // Directive End
    $scope.init();
});
