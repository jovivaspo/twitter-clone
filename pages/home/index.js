import { useState, useEffect } from 'react'
import Devit from '../../components/Devit'
const HomePage = () => {
    const [timelines, setTimelines] = useState([])
    const fetchTimelines = () => {
        fetch("http://localhost:3000/api/statuses/home_timeline")
            .then(res => res.json())
            .then(json => {
                setTimelines(json.timelines)
            })
    }
    useEffect(() => {
        fetchTimelines()
    }, [])

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

                    border-bottom:1px solid #ccc;
                    height:49px;
                    width:100%;
                
                }

                h2{
                    font-size:20px;
                    font-weight:800;
                }
                section{
                    padding-top: 49px
                }
                nav{
                    position:sticky;
                    bottom:0;
                    border-top:1px solid #ccc;
                    height:49px;
                    width:100%
                    
                }
                `}
            </style>
        </>
    )
}

export default HomePage