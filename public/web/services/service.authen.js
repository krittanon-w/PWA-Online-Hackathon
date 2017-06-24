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
                .then((user) => {
                    var info = (user == null ? null : user.providerData[0])
                    console.log('getUserInfo: success', info)
                    resolve(info)
                })
                .catch((error) => {
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
                    var updates = {};
                    updates[userInfo.uid + '/displayName'] = userInfo.displayName;
                    updates[userInfo.uid + '/photoURL'] = userInfo.photoURL;
                    updates[userInfo.uid + '/email'] = userInfo.email;
                    updates[userInfo.uid + '/firstName'] = inputInfo.firstName;
                    updates[userInfo.uid + '/lastName'] = inputInfo.lastName;
                    updates[userInfo.uid + '/age'] = inputInfo.age;
                    updates[userInfo.uid + '/gender'] = inputInfo.gender;

                    firebase.database().ref('users/').update(updates)
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
    getUsers() {
        return new Promise(function (resolve, reject) {
            firebase.database().ref('users').once('value')
                .then(function (snapshot) {
                    console.log('Snapshot value: ', snapshot.val());
                    return resolve(snapshot.val());
                }).catch((error) => {
                    return reject(error);
                });
        });
    },
    getInfo(uid) {
        return new Promise(function (resolve, reject) {
            firebase.database().ref('users/' + uid).once('value')
                .then(function (snapshot) {
                    console.log('Snapshot value: ', snapshot.val());
                    return resolve(snapshot.val());
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
    updateType(type) {
        return new Promise((resolve, reject) => {
            auth.getUserInfo()
                .then((userInfo) => {
                    var updates = {};
                    updates[userInfo.uid + '/type'] = type;

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
    updateNotificationToken(token) {
        return new Promise((resolve, reject) => {
            auth.getUserInfo()
                .then((userInfo) => {
                    var updates = {};
                    updates[userInfo.uid + '/notificationToken'] = token;

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


const dtree = {
    getTraningData() {
        console.log("dtree.getTraningData: called")
        return new Promise((resolve, reject) => {
            firebase.database().ref('dtree/trainingData').once('value')
                .then(function (snapshots) {
                    var tData = []
                    snapshots.forEach((snapshot) => {
                        var row = snapshot.val();
                        tData.push(row)
                    })
                    resolve(tData);
                }).catch((error) => {
                    reject(error)
                })
        })
    },
    getPrediction(testData) {
        console.log("dtree.getPrediction: called")
        return new Promise((resolve, reject) => {
            this.getTraningData()
                .then((tData) => {
                    var config = {
                        trainingSet: tData,
                        categoryAttr: 'type',
                    }

                    var decisionTree = new dt.DecisionTree(config)
                    var numberOfTrees = 10;
                    var randomForest = new dt.RandomForest(config, numberOfTrees)

                    // var testData = testData

                    var decisionTreePrediction = decisionTree.predict(testData)
                    var randomForestPrediction = randomForest.predict(testData)

                    resolve({
                        decission: decisionTreePrediction,
                        forest: randomForestPrediction
                    })
                })
                .catch((error) => {

                })
        })
    },
    addTraningData(inputUserData) {
        console.log("dtree.addTraningData: called")
        return new Promise((resolve, reject) => {
            firebase.database().ref('dtree/trainingData').push(inputUserData)
                .then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

const matching = {
    getUsers(type) {
        console.log("matching.getUsers: called")
        return new Promise((resolve, reject) => [
            firebase.database().ref('users').once('value')
            .then((snapshots) => {
                var users = []
                snapshots.forEach((snapshot) => {
                    var row = snapshot.val();
                    if (type == row.type) users.push(row)
                })
                resolve(users)
            }).catch((error) => {
                reject(error)
            })
        ])
    },
};

const messaging = {
    addTalk(uid) {
        console.log("messaging.addTalk: called");
        return new Promise((resolve, reject) => {
            var initMessage = {"00": {DoreamonSystem: "You've just created this chat room."}};
            var newRoomId = firebase.database().ref('messages').push(initMessage).key;

            auth.getUserInfo().
                then((userInfo) => {
                    var updates = {};
                    updates[uid] = newRoomId;
                    firebase.database().ref('users/' + userInfo.uid + '/messages' ).update(updates).
                        then((result) => {
                            resolve(result);
                        }).
                        catch((error) => {
                            reject(result);
                        });
                }).
                catch((error) => {
                    reject(error);
                });
        });
    },
};
