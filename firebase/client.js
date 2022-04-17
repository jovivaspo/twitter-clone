// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCuNAYT4JTxsW95K5ZxuSpjeqkyxgRErcg",
    authDomain: "twitter-clone-187ce.firebaseapp.com",
    projectId: "twitter-clone-187ce",
    storageBucket: "twitter-clone-187ce.appspot.com",
    messagingSenderId: "928860947573",
    appId: "1:928860947573:web:c732b8d40e6127d4dde43c",
    measurementId: "G-JBZK18H91L"
  }

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

//Para tomar los datos que realmente necesitamos de firebase
const mapUserFromFirebase = (userFirebase) => {
    console.log(userFirebase)
    if(userFirebase.user){
        const {displayName, photoURL} = userFirebase.user
        return {
            avatar: photoURL,
            username: displayName
        }
    }else{
        const {displayName, photoURL} = userFirebase
        return {
            avatar: photoURL,
            username: displayName
        }
    }
    
}

//Comprueba el usuario loggeado en firebase, donde onChanged es setUser para reactualizar el estado
export const onAuthStateChanged = (onChanged) => {
    return auth.onAuthStateChanged(user =>{
        const normalizedUser = user? mapUserFromFirebase(user) : null
        onChanged(normalizedUser)
    })
}

//Logging en firebase mediante popup
  export const loginWithGitHub = () => {
      const githubProvider =  new GithubAuthProvider()
      return signInWithPopup(auth,githubProvider)
      .then(user =>{
          console.log(user)
        return mapUserFromFirebase(user)
      })

  }