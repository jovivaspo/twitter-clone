import { Button } from '../../../components/Button/index'
import { useUser } from '../../../hooks/useUser'
import { useState } from 'react'
import { addTweet } from '../../../firebase/client'
import {useRouter} from 'next/router'

const COMPOSE_STATES = {
    USER_NOT_KNOW: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: -1
}


export default function ComponeTweet() {
    const router = useRouter()
    const user = useUser()
    const [message,setMessage] = useState("")
    const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)
    const isButtonDisabled = message.length === 0 || status === COMPOSE_STATES.LOADING
    const handleChange = (e)=>{
        const value = e.target.value
        setMessage(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setStatus(COMPOSE_STATES.LOADING)
        addTweet({
            avatar:user.avatar,
            content:message,
            userId: user.uid,
            username: user.username
        })
        .then(()=>{
            router.push('/home')
            setStatus(COMPOSE_STATES.SUCCESS)
        })
        .catch(err=>{
            console.error(err)
            setStatus(COMPOSE_STATES.ERROR)
        })

    }

    return (<>
        <form onSubmit={handleSubmit}>
            <textarea onChange={handleChange}
            value={message}
            placeholder="¿Qué está pasando?"></textarea>
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
                border: 0;
                padding:10px
            }
            `}
        </style>
    </>)
}