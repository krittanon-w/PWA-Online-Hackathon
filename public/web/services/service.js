var myApp = angular.module("app.service", []);

myApp.service('accountService', accountService);
myApp.service('urlService', urlService);
myApp.service('userService', userService);

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
    return {
        setInfo(inputInfo) {
            var userInfo = auth.getUserInfo();
            firebase.database.ref('/users/' + userInfo.id).set({
                displayName: userInfo.displayName,
                photoURL: userInfo.photoURL,
                email: userInfo.email,
                firstName: inputInfo.firstName,
                lastName: inputInfo.lastName,
                age: inputInfo.age,
                gender: inputInfo.gender
            });
        },
    };
}
