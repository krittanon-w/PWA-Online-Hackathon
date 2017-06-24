var myApp = angular.module("app.service", []);

myApp.service('accountService', accountService);
myApp.service('urlService', urlService);
myApp.service('userService', userService);
myApp.service('matchingService', matchingService);
myApp.service('dtreeService', dtreeService);

function accountService($firebaseAuth) {
    return auth;
}

function urlService($location) {
    return {
        server: function() {
            return $location.protocol() + '://'+ $location.host() + ':' + $location.port() + '/#!';
        },
    };
}

function userService() {
    return user;
}

function matchingService() {
    return matching;
}

function dtreeService() {
    return dtree;
}
