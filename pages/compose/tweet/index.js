import { Button } from '../../../components/Button/index'
import { useUser } from '../../../hooks/useUser'
import { useState, useEffect } from 'react'
import { addTweet, uploadImage } from '../../../firebase/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getDownloadURL } from 'firebase/storage'


const COMPOSE_STATES = {
    USER_NOT_KNOW: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: -1
}

const DRAG_IMAGE_STATES = {
    ERROR: -1,
    NONE: 0,
    DRAG_OVER: 1,
    UPLOADING: 2,
    COMPLETE: 3
}


export default function ComponeTweet() {
    const router = useRouter()
    const user = useUser()

    const [message, setMessage] = useState("")
    const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)
    const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
    const [task, setTask] = useState(null)
    const [imageURL, setImageURL] = useState(null)

    useEffect(() => {
        if (task) {
            task.on('state_changed',
                //En progreso
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                //Ocurre un error
                (error) => {
                    console.log('Ups, algo salió mal, ', error.code)
                },
                //Completado
                () => {
                    console.log("Completado")
                    getDownloadURL(task.snapshot.ref)
                        .then(setImageURL)
                })
        }
    }, [task])

    const isButtonDisabled = message.length === 0 || status === COMPOSE_STATES.LOADING
    const handleChange = (e) => {
        const value = e.target.value
        setMessage(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setStatus(COMPOSE_STATES.LOADING)
        addTweet({
            avatar: user.avatar,
            content: message,
            userId: user.uid,
            username: user.username,
            img: imageURL
        })
            .then(() => {
                router.push('/home')
                setStatus(COMPOSE_STATES.SUCCESS)
            })
            .catch(err => {
                console.error(err)
                setStatus(COMPOSE_STATES.ERROR)
            })

    }

    const handleDragEnter = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
    }
    const handleDragLeave = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATES.NONE)
    }
    const handleDrop = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATES.NONE)
        const file = e.dataTransfer.files[0]
        const task = uploadImage(file)
        console.log(task)
        setTask(task)
    }

    return (<>
        <Head>
            <title>Crear un tweet</title>
        </Head>
        <form onSubmit={handleSubmit}>
            <textarea onChange={handleChange}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                value={message}
                placeholder="¿Qué está pasando?"></textarea>
            {imageURL &&
                <section>
                    <img src={imageURL} />
                    <button onClick={()=>setImageURL(null)}>X</button>
                </section>}
            <Button disabled={isButtonDisabled}>Twittear</Button>
        </form>

        <style jsx>
            {`
            form{
                padding:15px;
            }
            textarea{
                width:100%;
                min-height:200px;
                font-size:16px;
                resize:none;
                border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER ?
                    '3px dashed #09f' :
                    '0'
                };
                padding:10px
            }
            section{
                position:relative
            }
            button{
                position:absolute;
                top: 15px;
                right: 15px;

                display:flex;
                justify-content:center;
                align-items:center;

                background: rgba(0,0,0,0.3);
                color:#fff;
                font-size:16px;
                border:0;
                border-radius:999px;
                width:24px;
                height:24px;

            }
            img{
                border-radius: 10px;
                height: auto;
                width:100%;
            }
            `}
        </style>
    </>)
}