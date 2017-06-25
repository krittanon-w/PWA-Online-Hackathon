$(document).ready(function () {

    // matching.getUsers()
    //     .then((users) => {
    //         console.log(users)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })

<<<<<<< HEAD
<<<<<<< HEAD
    matching.getUsers('104610665900721852172', 'excitings')
=======
    matching.getUsers('104610665900721852172', 'exciting')
>>>>>>> 645882e50e9bdef17cb9de0ffa54f98d6ffd56d0
=======
    matching.getUsers('104610665900721852172', 'exciting')
>>>>>>> caf1e669bc32baca7e25c62e9ccfc75f67dfe6f2
        .then((usersMatch)=>{
            console.log(usersMatch)
        })
        .catch((error)=>{
            console.log(error)
        })
    // dtree.getTraningData()
    //     .then((tData) => {
    //         console.log(tData)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // var  meLoc = {
    //         lat: 13.6187,
    //         lng: 100.7634
    //       }

    // var userLoc = {
    //         lat: 13.6187,
    //         lng: 100.7634
    //       }
    // var res = gps.isInInArea(meLoc, userLoc)
    // console.log(res)

    // gps.updateLocation("101941526219391790665","A")
    // .then((result)=>{
    //     console.log("update gos", result)
    // })
    // .catch((error)=>{
    //     console.log("update error", error)
    // })

    // gps.getUsersInArea("A")
    //     .then((users)=>{
    //         console.log("user near you", users)
    //     })
    //     .catch((error)=>{
    //         console.log("update error", error)
    //     })

//    dtree.getPrediction({person: 'Homer', hairLength: 0, weight: 250, age: 36})
//         .then((predic) => {
//             console.log(predic)
//         })
//         .catch((error) => {
//             console.log(error)
//         })

    // matching.getUsers("A")
    //     .then((users)=>{
    //         console.log(users)
    //     })
//     //     .catch((error)=>{
//     //         console.log(error)
//     //     })

//         var data =
//     [{person: 'Homer', hairLength: 0, weight: 250, age: 36, sex: 'A'},
//      {person: 'Marge', hairLength: 10, weight: 150, age: 34, sex: 'B'},
//      {person: 'Bart', hairLength: 2, weight: 90, age: 10, sex: 'C'},
//      {person: 'Lisa', hairLength: 6, weight: 78, age: 8, sex: 'D'},
//      {person: 'Maggie', hairLength: 4, weight: 20, age: 1, sex: 'A'},
//      {person: 'Abe', hairLength: 1, weight: 170, age: 70, sex: 'C'},
//      {person: 'Abe', hairLength: 1, weight: 170, age: 70, sex: 'A'},
//      {person: 'Selma', hairLength: 8, weight: 160, age: 41, sex: 'B'},
//      {person: 'Otto', hairLength: 10, weight: 180, age: 38, sex: 'B'},
//      {person: 'Krusty', hairLength: 6, weight: 200, age: 45, sex: 'C'}];


//     //  for(var i =0 ; i<data.length; i++){
//     //         dtree.addTraningData(data[i])
//     //     .then((tData) => {
//     //         console.log(tData)
//     //     })
//     //     .catch((error) => {
//     //         console.log(error)
//     //     })
//     //  }

// // Configuration
// var config = {
//     trainingSet: data,
//     categoryAttr: 'sex',
//     ignoredAttributes: ['person']
// };

// // Building Decision Tree
// var decisionTree = new dt.DecisionTree(config);

// // Building Random Forest
// var numberOfTrees = 5;
// var randomForest = new dt.RandomForest(config, numberOfTrees);

// // Testing Decision Tree and Random Forest
// var comic = {person: 'Comic guy', hairLength: 8, weight: 150, age: 38};

// var decisionTreePrediction = decisionTree.predict(comic);
// var randomForestPrediction = randomForest.predict(comic);

// console.log(decisionTreePrediction)
// console.log(randomForestPrediction)

});