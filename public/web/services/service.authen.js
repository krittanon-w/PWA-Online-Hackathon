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
        console.log('getUser: called')
        return new Promise((resolve, reject) => {
            this.onAuthStageChange()
                .then((user) => {
                    console.log('getUser: success', user)
                    resolve(user)
                })
                .catch((error) => {
                    console.log('getUser: failed')
                    reject(error)
                })
        })
    },
    getUserInfo() {
        console.log('getUserInfo: called')
        return new Promise((resolve, reject) => {
            this.getUser()
            .then((user)=>{
                var info = (user == null ? null : user.providerData[0])
                console.log('getUserInfo: success', info)
                resolve(info)
            })
            .catch((error)=>{
                console.log('getUserInfo: failed')
                reject(error)
            })
        })
    },
    onAuthStageChange() {
        console.log("onStageChange: called")
        return new Promise((resolve, reject) => {
            var listenEvent = firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    console.log("onStageChange: user signed")
                    resolve(user)
                    listenEvent()
                } else {
                    console.log("onStageChange: no user signin")
                    // reject(Error("no user signin"))
                    resolve(null)
                    listenEvent()
                }
            })
        })
    }
};

const user = {
    setInfo(inputInfo) {
        return new Promise((resolve, reject) => {
            auth.getUserInfo()
                .then((userInfo) => {
                    var userTmp = {
                        displayName: userInfo.displayName,
                        photoURL: userInfo.photoURL,
                        email: userInfo.email,
                        firstName: inputInfo.firstName,
                        lastName: inputInfo.lastName,
                        age: inputInfo.age,
                        gender: inputInfo.gender,
                    };
                    firebase.database().ref('users/' + userInfo.uid).set(userTmp)
                        .then((result) => {
                            resolve(result);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }).
                catch((error) => {
                    reject(error);
                });
        });
    },
    getInfo(uid) {
        return new Promise(function(result, reject) {
            firebase.database().ref('users/' + uid).once('value')
                .then(function(snapshot) {
                    console.log('Snapshot value: ', snapshot.val());
                    return result(snapshot.val());
                }).catch((error) => {
                    return reject(error);
                });
        });
    },
    updateInfo() {
        return new Promise((resolve, reject) => {
            auth.getUserInfo()
                .then((userInfo) => {
                    var updates = {};
                    updates[userInfo.uid + '/displayName'] = userInfo.displayName;
                    updates[userInfo.uid + '/photoURL'] = userInfo.photoURL;
                    updates[userInfo.uid + '/email'] = userInfo.email;

                    firebase.database().ref('users/').update(updates)
                        .then((result) => {
                            resolve(result);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};
