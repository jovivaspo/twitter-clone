// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import {ref, getStorage, uploadBytes, uploadBytesResumable} from "firebase/storage"
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import {getFirestore, Timestamp, collection, doc, setDoc, getDocs, orderBy, query} from 'firebase/firestore'

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
const db = getFirestore(app)

//Para tomar los datos que realmente necesitamos de firebase
const mapUserFromFirebase = (userFirebase) => {
    console.log(userFirebase)
    if(userFirebase.user){
        const {displayName, photoURL, email, uid} = userFirebase.user
        return {
            avatar: photoURL,
            username: displayName,
            email,
            uid
        }
    }else{
        const {displayName, photoURL, email, uid} = userFirebase
        return {
            avatar: photoURL,
            username: displayName,
            email,
            uid
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


export const addTweet = ({avatar, content, userId, username, img}) =>{
    //Referenciamos la colleción tweet
    const tweetRef = collection(db, "tweets")
    //Añadimos un documento a la colección tweet
    return setDoc(doc(tweetRef),{
        avatar,
        content,
        userId,
        img,
        username,
        createdAt: Timestamp.fromDate(new Date()),
        likesCount: 0,
        sharedCount:0
    })
       
    
}

export const fetchLastTweets = () => {
     //Referenciamos la colleción tweet
     const tweetRef = collection(db,"tweets")
     //Definimos la petición de los tweets ordenandolos
     const q = query(tweetRef, orderBy("createdAt","desc")) 
     //Obtenemos todos los documentos de la colección
    return getDocs(q)
    .then(snapshot=>{
        //Devolvemos un array con cada documento en forma de objeto
        return snapshot.docs.map(doc =>{
            const data = doc.data() //extraemos el contenido del documento
            const id = doc.id //extraemos el id del documento
            const {createdAt} = data
           
           
            return {
               id,
               ...data,
               createdAt: +createdAt.toDate()

            }
        })
    })
}

export const uploadImage = (file) => {
    //Creamos el almacén
    const storage = getStorage()
    //Creamos una referencia
    const imageRef = ref(storage,`images/${file.name}`)
    //Enviamos la imagen
    const uploadTask = uploadBytesResumable(imageRef, file)

    return uploadTask

    
}