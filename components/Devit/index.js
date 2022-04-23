import useTimeAgo from '../../hooks/useTimeAgo'
import { Avatar } from '../Avatar'
const Devit = ({ avatar, username, name, content, index, userId, createdAt }) => {
    const timeAgo = useTimeAgo(createdAt)

    return (
        <>
            <article key={index}>
                <Avatar avatar={avatar} />
                <div>
                    <section>
                        <strong className='username'>{username}</strong>
                        <span> . </span>
                        <date>{timeAgo}</date>
                    </section>
                    <p>{content}</p>
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
            date{
                font-size:11px;
                color:#555;
            }
            p{
                margin:0;
                line-height:1.3;
                font-size:11px
            }
            .username{
                font-size:12px
            }
           `}
            </style>
        </>
    )
}

export default Devit