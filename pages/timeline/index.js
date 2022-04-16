import Link from "next/link"
const  Timeline = ({userName}) => {
    return( <h1>This is the timeline of {userName} back to <Link href="/"><a>Home</a></Link></h1>)
}

Timeline.getInitialProps =  async () =>{
    return fetch('http://localhost:3000/api/hello')
    .then(res=>res.json())
    .then(json=>({userName:json.name})
    )
}

export default Timeline