var app = angular.module('app', ['firebase', 'ngRoute', 'app.account','app.service', 'app.factory']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: './web/views/login.html',
        controller: 'LoginController',
    }).when('/profile', {
        templateUrl: './web/views/profile.html',
        controller: 'ProfileController',
    })
}]);



app.run(function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
        .then(function(reg) {
            // registration worked
            console.log('Registration succeeded. Scope is ', reg);
        }).catch(function(error) {
            // registration failed
            console.log('Registration failed with ' + error);
        });
    }
    var config = {
        apiKey: "AIzaSyCVP--nIngflDoXV5qBKSPzzSyy712tpDA",
        authDomain: "drm-pwa-hkt.firebaseapp.com",
        databaseURL: "https://drm-pwa-hkt.firebaseio.com",
        projectId: "drm-pwa-hkt",
        storageBucket: "drm-pwa-hkt.appspot.com",
        messagingSenderId: "640169615174"
    };
    firebase.initializeApp(config);
});




