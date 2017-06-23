function login() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(function (res) {
            // console.log('signInRes',res)
            console.log('login success', res)
        })
        .catch(function (error) {
            console.log(error)
        })
}