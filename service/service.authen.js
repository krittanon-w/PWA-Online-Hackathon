const auth = {
    login: function () {
        console.log('login: called')
        return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((result) => {
                console.log('login: success', result)
            })
            .catch(function (error) {
                console.log('login: failed', error)
            })
    },
    logout: function () {
        console.log('logout: called')
        return firebase.auth().signOut()
            .then(() => {
                console.log('logout: success')
            })
            .catch(function (error) {
                console.log('logout: failed', error)
            })
    },
    getUser() {
        console.log('getUser: called')
        return new Promise((resolve, reject) => {
            var user = firebase.auth().currentUser
            if (user != null) {
                console.log('getUser: success', user)
                resolve(user);
            } else {
                console.log('getUser: failed')
                reject(Error("unknow user"));
            }
        });
    }
}



// function login() {
//     firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
//         .then(function (res) {
//             console.log('login success', res)
//         })
//         .catch(function (error) {
//             console.log(error)
//         })
// }

// function getCuttentUser() {
//     var user = firebase.auth().currentUser
// }