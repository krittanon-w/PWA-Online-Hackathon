$(document).ready(function () {

    matching.getUsers()
        .then((users) => {
            console.log(users)
        })
        .catch((error) => {
            console.log(error)
        })
});