$(document).ready(function () {

    setInterval(()=>{

    gps.getUsersInArea("101941526219391790665", "A")
        .then((ourLoc)=>{
            console.log("user near you", ourLoc)
            gps.updateGoogleMap('map',ourLoc)
        })
        .catch((error)=>{
            console.log("update error", error)
        })
    }, 10000)

    // gps.upSertLocation("101941526219391790667", "A")
    //     .then((users)=>{
    //         console.log("user near you", users)
    //     })
    //     .catch((error)=>{
    //         console.log("update error", error)
    //     })

});