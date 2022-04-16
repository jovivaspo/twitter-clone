import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {Button} from '../components/Button/index'
import {loginWithGitHub, onAuthStateChanged} from '../firebase/client'
import { useEffect, useState } from 'react'
import {Avatar} from '../components/Avatar/index'

export default function Home() {
  const [user,setUser] = useState(undefined)

  useEffect(()=>{
    onAuthStateChanged(setUser)
  },[])

  const handlerClick = () => {
    loginWithGitHub()
    .then(user=>{
      setUser(user)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  console.log(user)
 
  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <img src='/logo.png' alt='logo' className={styles.logo}/>
        <h1 className={styles.title}>Twitter Clone</h1>
        <h2 className={styles.subtitle}>Talk about development with developers</h2>
        <nav className={styles.menu}>
          <Link href="/timeline"><a className={styles.menuEnlaces} >Timeline</a></Link>
        </nav>
        <div>
          {user === null &&  <Button onClick={handlerClick}>Login with GitHub</Button> }
          {
            user && user.avatar && <Avatar user={user}/>
          }
         
          
        </div>
      </main>
    </div>

  )
}
