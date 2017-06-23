var app = angular.module('app', ['firebase', 'ngRoute', 'app.account','app.service', 'app.factory']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: './web/views/login.html',
        controller: 'AccountController',
    })
}]);



