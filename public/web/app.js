var app = angular.module('app', ['firebase', 'ngRoute', 'app.account', 'app.accost', 'app.service', 'app.factory']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: './web/views/login.html',
        controller: 'LoginController',
    }).when('/profile', {
        templateUrl: './web/views/profile.html',
        controller: 'ProfileController',
        resolve: {
          function(permission){
             permission.check();
          },
        },
    }).when('/select', {
        templateUrl: './web/views/select.html',
        controller: 'SelectController',
        resolve: {
          function(permission){
             permission.check();
          },
        },
    }).when('/list', {
        templateUrl: './web/views/list.html',
        controller: 'ListController',
        resolve: {
          function(permission){
             permission.check();
          },
        },
    }).when('/about', {
        templateUrl: './web/views/about.html',
        controller: 'AboutController',
        resolve: {
          function(permission){
             permission.check();
          },
        },
    }).when('/chat/:id', {
        templateUrl: './web/views/chat.html',
        controller: 'ChatController',
        resolve: {
          function(permission){
             permission.check();
          },
        },
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

app.service('permission', function ($location, urlService) {
    return {
        check: function () {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user != null) {
                } else {
                    //$location.path('/');
                    window.location.href = urlService.server()+"/";
                }
            });
        }
    };
});




