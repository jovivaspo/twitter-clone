import { Avatar } from '../Avatar'
const Devit = ({ avatar, username, name, message, index }) => {
    return (
       <>
       <article key={index}>
        <Avatar avatar={avatar}/>
        <div>
            <strong className='username'>{username}</strong>
            <p>{message}</p>
        </div>
       </article>
       <style jsx>
           {`
              article{
                display: flex;
                padding: 10px 15px;
                border-bottom: 1px solid #eee
              
            }
            div{
                padding-right: 8px;
            }
            p{
                margin:0;
                line-height:1.3;
                font-size:14px
            }
            .username{
                font-size:15px
            }
           `}
       </style>
       </>
    )
}

export default Devit