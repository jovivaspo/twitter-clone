import { Button } from '../../../components/Button/index'
import { useUser } from '../../../hooks/useUser'
import { useState } from 'react'

export default function ComponeTweet() {
    const user = useUser()
    const [message,setMessage] = useState("")
    const handleChange = (e)=>{
        const value = e.target.value
        setMessage(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        

    }

    console.log(message)

    return (<>
        <form onSubmit={handleSubmit}>
            <textarea onChange={handleChange}
            value={message}
            placeholder="¿Qué está pasando?"></textarea>
            <Button disabled={message.length === 0}>Twittear</Button>
        </form>

        <style jsx>
            {`
            form{
                padding:15px;
            }
            textarea{
                width:100%;
                min-height:200px;
                font-size:21px;
                resize:none;
                border: 0;
                padding:10px
            }
            `}
        </style>
    </>)
}