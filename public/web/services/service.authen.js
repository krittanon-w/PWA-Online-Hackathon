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
            console.log('getUser: failed')
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
            console.log('getUserInfo: failed')
            return error
        }
    },
    onStageChange() {
        // jest def
    }
};

const user = {
    setInfo(inputInfo) {
        var userInfo = auth.getUserInfo();
        var userTmp = {
            displayName: userInfo.displayName,
            photoURL: userInfo.photoURL,
            email: userInfo.email,
            firstName: inputInfo.firstName,
            lastName: inputInfo.lastName,
            age: inputInfo.age,
            gender: inputInfo.gender,
        };
        return firebase.database().ref('users/' + userInfo.uid).set(userTmp);
    },
    getInfo(uid) {
        return firebase.database().ref('users/' + uid).once('value')
            .then(function(snapshot) {
                console.log('Snapshot value: ', snapshot.val());
            });
    },
    updateInfo() {
        var userInfo = auth.getUserInfo();
        var updates = {};
        updates['/users/' + userInfo.uid + '/displayName'] = userInfo.displayName;
        updates['/users/' + userInfo.uid + '/photoURL'] = userInfo.photoURL;
        updates['/users/' + userInfo.uid + '/email'] = userInfo.email;

        return firebase.database().ref().update(updates);
    },
};
