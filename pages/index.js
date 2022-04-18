import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Button} from '../components/Button/index'
import {loginWithGitHub} from '../firebase/client'
import { useEffect} from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../hooks/useUser'

export default function Home() {
  const user = useUser()
  const router = useRouter()

  //Si hay usuario, redirección a home
  useEffect(()=>{
    user && router.replace('/home')
  },[user])

  const handlerClick = () => {
    loginWithGitHub()
    .catch(err=>{
      console.log(err)
    })
  }

  console.log(user)
 
  return (
    <>
        <div className={styles.container}>
      <Head>
        <title>Twitter clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <img src='/logo.png' alt='logo' className={styles.logo}/>
        <h1 className={styles.title}>Twitter Clone</h1>
        <h2 className={styles.subtitle}>Talk about development with developers</h2>
        <div>
          {user === null &&  <Button onClick={handlerClick}>
          <img  className="logoGit" src='/github.png'/>
            Login with GitHub</Button> }
          {
            user === undefined && <span>Loading...</span>
          }
        </div>
      </main>
    </div>
    <style jsx>
      {`
      .logoGit{
                   
        width:18px;
        margin-right: 10px;
        
      }
      `}
    </style>
    </>


  )
}
