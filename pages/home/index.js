import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Devit from '../../components/Devit'
import Create from '../../components/Icons/Create'
import Home from '../../components/Icons/Home'
import Search from '../../components/Icons/Search'
import { fetchLastTweets, uploadImage } from '../../firebase/client'
import { useUser } from '../../hooks/useUser'
const HomePage = () => {
    const [timelines, setTimelines] = useState([])
    const user = useUser()
    const fetchTimelines = () => {
        user &&
        /*fetch("http://localhost:3000/api/statuses/home_timeline")
            .then(res => res.json())
            .then(json => {
                setTimelines(json.timelines)
            })*/
        fetchLastTweets()
        .then(setTimelines)
    }
    useEffect(() => {
        fetchTimelines()
    }, [user])

    return (
        <>
            <Head>
                <title>Inicio</title>
            </Head>
            <div>
                <header>
                    <h2>Inicio</h2>
                </header>
                <section>
                    {
                        timelines?.map((devit, index) => {
                            return (
                               <Devit 
                               index={index}
                               username={devit.username}
                               avatar={devit.avatar}
                               name={devit.name}
                               content={devit.content}
                               userId={devit.userId}
                               createdAt={devit.createdAt}
                               img={devit.img}
                               id={devit.id}
                               />)
                        })
                    }
                </section>
                <nav>
                    <Link href="/compose/tweet"><a><Home /></a></Link>
                    <Link href="/compose/tweet"><a><Search /></a></Link>
                    <Link href="/compose/tweet"><a><Create /></a></Link>
                </nav>
            </div>
            <style jsx>
                {`
                header{
                    position:sticky;
                    top:0;

                    display:flex;
                    align-items:center;

                    border-bottom:1px solid #eee;
                    height:49px;
                    width:100%;
                    background:#ffffffaa;
                    backdrop-filter:blur(5px)
                
                }

                h2{
                    font-size:20px;
                    font-weight:800;
                    padding-left: 15px;
                }

                section{
                    min-height:100vh
                }

              
                nav{
                    position:sticky;
                    bottom:0;

                    display:flex;
                    justify-content: space-around;
                    align-items: center;
                    border-top:1px solid #eee;
                    height:49px;
                    width:100%;
                    background:#fff
                    
                }
                nav a{
                    color: #09f;
                    border-radius:100%;
                    width:32px;
                    height:32px;
                    display:flex;
                    justify-content:center;
                    align-items:center
                                }
                nav a:hover{
                   background: radial-gradient(#0099ff22 15%,
                    transparent 16%);
                    background-size: 180px 180px;
                    background-position: center
                }
                `}
            </style>
        </>
    )
}

export default HomePage