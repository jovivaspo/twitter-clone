import Devit from "../../../components/Devit"
import { firestore } from "../../../firebase/admin"

export default function DevitPage(props) {
    console.log(props)
    if(!props.id) return "Loading..."
    return (
        <>
            <Devit {...props} />

        </>
    )
}

/*DevitPage.getInitialProps = ( context ) => {
    const { id } = context.query
    const { res } = context
    console.log("getInitalProps",id)
    return fetch (`http://localhost:3000/api/devits/${id}`)
    .then(apiRes => {
        if(apiRes.ok) return apiRes.json()
        if(res)
        res.writeHead(301,{Location: '/home'}).end()
    })
}*/

/*export async function getServerSideProps(context) {
    const { id } = context.params
    const { res } = context
    const apiRes = await fetch(`http://localhost:3000/api/devits/${id}`)
    if (apiRes.ok) {
        const props = await apiRes.json()
        return { props: props }
    }
    if (res)
      //  res.writeHead(301, { Location: '/home' }).end()
      res.writeHead(404).end()

}*/

export async function getStaticPaths(){
    return {
        paths: [{params: {id: 'aaa' }}],
        fallback:true
    }
}

export async function getStaticProps(context) {
    const { id } = context.params
    
    return firestore
    .collection("tweets")
    .doc(id)
    .get()
    .then(doc => {
        const data = doc.data()
        const id = doc.id
        const  {createdAt} = data
        console.log(data)
       const props = {
           ...data,
           id,
           createdAt: +createdAt.toDate()
       }
       return {props}
    })
    .catch(()=>{
       return {props:{}}
    })
   
}
