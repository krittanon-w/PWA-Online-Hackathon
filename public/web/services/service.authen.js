const auth = {
    login() {
        console.log('login: called')
        return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((result) => {
                console.log('login: success', result)
            })
            .catch(function (error) {
                console.log('login: failed', error)
            })
    },
    logout() {
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
        var user = firebase.auth().currentUser
        console.log('getUser: success', user)
        return user
    },
    getUserInfo() {
        console.log('getUserInfo: ')
        var userInfo = this.getUser().providerData[0]
        console.log('getUserInfo: ', userInfo)
        return userInfo
    },
    onStageChange() {
        // jest def
    }
}