var myApp = angular.module("app.service", []);

myApp.service('accountService', accountService);
myApp.service('urlService', urlService);

function accountService($firebaseAuth) {
    return {
        login: function() {
            firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .then(function (res) {
                    // console.log('signInRes',res)
                    console.log('login success', res)
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
    };
}

function urlService($location) {
    return {
        server: function() {
            return $location.protocol() + '://'+ $location.host() + ':' + $location.port() + '/#!';
        },
    };
}
