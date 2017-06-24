var myApp = angular.module("app.factory", []);

myApp.factory('authFactory', authFactory);

function authFactory() {
    var authObject = {
        displayName: "",
        email:"",
        firstName:"",
        gender:"",
        lastName:"",
        photoURL:"",
        age:"",
    };

    return {
        setAuthObject: function (obg) {
            localStorage.setItem('displayName', obg.displayName);
            localStorage.setItem('email', obg.email);
            localStorage.setItem('firstName', obg.firstName);
            localStorage.setItem('gender', obg.gender);
            localStorage.setItem('lastName', obg.lastName);
            localStorage.setItem('photoURL', obg.photoURL);
            localStorage.setItem('age', obg.age);
        },
        getetAuthObject: function () {
            authObject.displayName = localStorage.getItem('displayName');
            authObject.email = localStorage.getItem('email');
            authObject.firstName = localStorage.getItem('firstName');
            authObject.gender = localStorage.getItem('gender');
            authObject.lastName = localStorage.getItem('lastName');
            authObject.photoURL = localStorage.getItem('photoURL');
            authObject.age = localStorage.getItem('age');
            return authObject;
        },
    };
}
