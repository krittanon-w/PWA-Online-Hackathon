const auth = {
    login(provider) {
        console.log('login: called')
        if (provider == 'github') provider = new firebase.auth.GithubAuthProvider()
        else if (provider == 'facebook') provider = new firebase.auth.FacebookAuthProvider()
        else if (provider == 'google') provider = new firebase.auth.GoogleAuthProvider()
        else provider = new firebase.auth.GoogleAuthProvider()
        return firebase.auth().signInWithPopup(provider)
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
    getUsers(myUid, type) {
        console.log("matching.getUsers: called")
        return new Promise((resolve, reject) => {
            var users = [];
            firebase.database().ref('users').orderByChild('type').equalTo(type).
                once('value').
                then((snapshots) => {
                    if(snapshots.val() != null){
                        var matchUsers = snapshots.val()
                        delete matchUsers[myUid]
                        resolve(matchUsers)
                    }
                    resolve({})
                }).
                catch((error) => {
                    reject(error);
                });
        });
    },
};

const noti = {
    notifyAddTalk($http, uid) {
        return new Promise((resolve, reject) => {
            user.getInfo(uid).
                then((userInfo) => {
                    var req = {
                        method: 'POST',
                        url: 'https://fcm.googleapis.com/fcm/send',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'key=AIzaSyAUNqwxh248KWyNpaeU7WD8uIsb6kENyh8'
                        },
                        data: {
                            notification: {
                                title: 'Doreamon Dating',
                                body: 'Somebody has added you to his/her talk.'
                            },

                            to: userInfo.notificationToken,
                        },
                    };

                    $http(req).
                        then((response) => {
                            resolve(response);
                        }).
                        catch((response) => {
                            reject(response);
                        });
                });
        });
    },
};

const messaging = {
    addTalk($http, uid) {
        console.log("messaging.addTalk: called");
        return new Promise((resolve, reject) => {
            var initMessage = {"00": {DoreamonSystem: "You've just created this chat room."}};
            var newRoomId = firebase.database().ref('messages').push(initMessage).key;

            auth.getUserInfo().
                then((userInfo) => {
                    var updates = {};
                    updates[userInfo.uid + '/messages/' + uid] = newRoomId;
                    updates[uid + '/messages/' + userInfo.uid] = newRoomId;

                    firebase.database().ref('users').update(updates).
                        then((result) => {
                            noti.notifyAddTalk($http, uid).
                                then((response) => {
                                    resolve(response);
                                }).
                                catch((error) => {
                                    reject(error);
                                });
                        }).
                        catch((error) => {
                            reject(error);
                        });
                }).
                catch((error) => {
                    reject(error);
                });
        });
    },
    getPartners() {
        console.log("messaging.getPartners: called");
        return new Promise((resolve, reject) => {
            auth.getUserInfo().
                then((userInfo) => {
                    firebase.database().ref('users/' + userInfo.uid + '/messages' ).once('value').
                        then((snapshots) => {
                            // console.log('snapshots: ', snapshots.val());
                            resolve(snapshots.val());
                        }).
                        catch((error) => {
                            reject(error);
                        });
                }).
                catch((error) => {
                    reject(error);
                });
        });
    },
    getMessages(uid, onMessage) {
        console.log("messaging.getMessages: called");
        auth.getUserInfo().
            then((userInfo) => {
                firebase.database().ref('users/' + userInfo.uid + '/messages/' + uid).once('value').
                    then((snapshots) => {
                        // console.log('snapshots: ', snapshots.val());
                        var roomId = snapshots.val();

                        var subObj = firebase.database().ref('messages/' + roomId).
                            on('child_added', function(snapshot) {
                                // console.log('new message: ', snapshot.val());

                                if (onMessage)
                                    onMessage(snapshot.val(), subObj);
                            });
                    }).
                    catch((error) => {
                        console.log(error);
                    });
            }).
            catch((error) => {
                console.log(error);
            });
    },
    addMessage(uid, msg) {
        console.log("messaging.addMessage: called");
        return new Promise((resolve, reject) => {
            auth.getUserInfo().
                then((userInfo) => {
                    firebase.database().ref('users/' + userInfo.uid + '/messages/' + uid).once('value').
                        then((snapshots) => {
                            // console.log('snapshots: ', snapshots.val());

                            var roomId = snapshots.val();
                            var newMessage = {};
                            newMessage[userInfo.displayName] = msg;

                            firebase.database().ref('messages/' + roomId).push(newMessage)
                                .then((result) => {
                                    resolve(result)
                                })
                                .catch((error) => {
                                    reject(error)
                                });
                        }).
                        catch((error) => {
                            reject(error);
                        });
                }).
                catch((error) => {
                    reject(error);
                });
        });
    },
    removeTalk(uid) {
        console.log("messaging.removeTalk: called");
        return new Promise((resolve, reject) => {
            auth.getUserInfo().
                then((userInfo) => {
                    firebase.database().ref('users/' + userInfo.uid + '/messages/' + uid).once('value').
                        then((snapshots) => {
                            // console.log('snapshots: ', snapshots.val());

                            var roomId = snapshots.val();
                            var updates = {};
                            updates['users/' + userInfo.uid + '/messages/' + uid] = null;
                            updates['users/' + uid + '/messages/' + userInfo.uid] = null;
                            updates['messages/' + roomId] = null;

                            firebase.database().ref().update(updates).
                                then((result) => {
                                    resolve(result);
                                }).
                                catch((error) => {
                                    reject(error);
                                });
                        }).
                        catch((error) => {
                            reject(error);
                        });
                }).
                catch((error) => {
                    reject(error);
                });
        });
    },
};

const gps = {
    getLocation(){
        return new Promise((resolve, reject)=>{
            navigator.geolocation.getCurrentPosition((geo)=>{
                var gps = geo.coords
                resolve({
                    lat: gps.latitude,
                    lng: gps.latitude
                })
            },
            (error)=>{
                console.log("GPS Not Allow By User!!!")
                reject(error)
            },{timeout: 20000})
        })
    },
    isInInArea(meLoc, userLoc){
        var user_location = new google.maps.LatLng(userLoc)
        area = this.createCircle(meLoc)
        if (google.maps.geometry.spherical.computeDistanceBetween(user_location, area.getCenter()) <= area.getRadius()) {
          return true
        }
        return false
    },
    createCircle(location){
        var area = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.7,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            center: location,
            radius: 20
        })
        return area
    },
    updateLocation(id, type){
        return new Promise((resolve, reject)=>{
            this.getLocation()
                .then((location)=>{
                    firebase.database().ref('locations/'+id).update({
                            location: location,
                            type: type
                        })
                        .then((result) => {
                            resolve(result);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error)=>{
                    reject(error)
                })
        })
    },
    getUsersInArea(){
        var _self = this
        return new Promise((resolve, reject)=>{
            console.log("getUserinfo")
            auth.getUserInfo()
                .then((myInfo)=>{
                    console.log("updatelocation")
                    _self.updateLocation(myInfo.uid, myInfo.type)
                        .then((result)=>{
                            console.log("getAllUsersLocation")
                            firebase.database().ref('locations').once('value')
                                .then((snapshots) => {
                                    var users_location = []
                                    var result = snapshots.val()
                                    for(var key in result) {
                                        if(key!=myInfo.uid){
                                            if(_self.isInInArea(myInfo.uid, result[key].location)){
                                                users_location.push({
                                                     uid: key,
                                                    type: result[key].type
                                                })
                                            }
                                        }
                                        else{
                                            console.log("me me me")
                                        }
                                    };
                                    resolve(users_location);
                                })
                                .catch((error) => {
                                    reject(error);
                                })
                        })
                        .catch((error)=>{
                            reject(error)
                        })
                })
                .catch((error)=>{
                    reject(error)
                })
        })
    }


}