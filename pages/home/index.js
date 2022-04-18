import { useState, useEffect } from 'react'
import Devit from '../../components/Devit'
import { useUser } from '../../hooks/useUser'
const HomePage = () => {
    const [timelines, setTimelines] = useState([])
    const user = useUser()
    const fetchTimelines = () => {
        user &&
        fetch("http://localhost:3000/api/statuses/home_timeline")
            .then(res => res.json())
            .then(json => {
                setTimelines(json.timelines)
            })
    }
    useEffect(() => {
        fetchTimelines()
    }, [user])

    return (
        <>
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
                               message={devit.message}
                               />)
                        })
                    }
                </section>
                <nav>

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
              
                nav{
                    position:sticky;
                    bottom:0;
                    border-top:1px solid #eee;
                    height:49px;
                    width:100%;
                    background:#fff
                    
                }
                `}
            </style>
        </>
    )
}

export default HomePage