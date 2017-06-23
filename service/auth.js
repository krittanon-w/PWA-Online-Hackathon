import firebase from 'firebase'

const getCurrentUser = () => {
  return firebase.auth().currentUser
}

// const requireUser = (cb) => {
//   const cancle = firebase.auth().onAuthStateChanged((user)=>{
//     cancle()
//     cb(user)
//   })
// }

const requireUser = () => {
  return new Promise((resolve, reject) =>{
    const cancle = firebase.auth().onAuthStateChanged((user)=>{
      cancle()
      if(user){
        resolve(user)
        return
      }
      reject()
    })
  })
}

const getToken = () => {
  return new Promise((resolve, reject) =>{
    const cancle = firebase.auth().onAuthStateChanged((user)=>{
      cancle()
      if(user){
        resolve(user)
        return
      }
      reject()
    })
  })
}


export default{
  getCurrentUser,
  requireUser,
  getToken
}