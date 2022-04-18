import {useState, useEffect} from 'react'
import { onAuthStateChanged } from '../firebase/client'
import { useRouter } from 'next/router'
const useUser = () => {
    const [user,setUser] = useState(undefined)

//Verificación del usuario logeado
  useEffect(()=>{
    onAuthStateChanged(setUser)
  },[])

  useEffect(()=>{
   user === null && router.push('/')
  },[])

  return user
}

export {useUser}