const auth = {
    login() {
        console.log('login: called')
        return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((result) => {
                console.log('login: success', result)
            })
            .catch((error) => {
                console.log('login: failed', error)
            })
    },
    logout() {
        console.log('logout: called')
        return firebase.auth().signOut()
            .then(() => {
                console.log('logout: success')
            })
            .catch((error) => {
                console.log('logout: failed', error)
            })
    },
    getUser() {
        try {
            console.log('getUser: called')
            var user = firebase.auth().currentUser
            console.log('getUser: success', user)
            return user
        } catch (error) {
            return error
        }
    },
    getUserInfo() {
        try {
            console.log('getUserInfo: called')
            var userInfo = null
            var user = this.getUser()
            if (user != null) userInfo = user.providerData[0]
            console.log('getUserInfo: success', userInfo)
            return userInfo
        } catch (error) {
            return error
        }
    },
    onStageChange() {
        // jest def
    }
}