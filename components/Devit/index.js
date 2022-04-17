import { Avatar } from '../Avatar'
const Devit = ({ avatar, username, name, message, index }) => {
    return (
       <>
       <article key={index}>
        <Avatar user={{avatar,username}} />
        <div>
            <strong>{username}</strong>
            <p>{message}</p>
        </div>
       </article>
       <style jsx>
           {`
              article{
                display: flex;
                padding: 10px 15px;
            }
            div{
                padding-right: 8px;
            }
            p{
                margin:0;
                line-height:1.3
            }
           `}
       </style>
       </>
    )
}

export default Devit