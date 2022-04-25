import useTimeAgo from '../../hooks/useTimeAgo'
import { Avatar } from '../Avatar'
import  Link  from 'next/link'
const Devit = ({ avatar, username, name, content, index, userId, createdAt, img, id }) => {
    const timeAgo = useTimeAgo(createdAt)

    return (
        <>
            <article key={index}>
                <Avatar avatar={avatar} />
                <div>
                    <section>
                        <strong className='username'>{username}</strong>
                        <span> . </span>
                        <Link href={`/status/${id}`}>
                            <time title={timeAgo}>{timeAgo}</time>
                        </Link>

                    </section>
                    <p>{content}</p>
                    {img && <img src={img} />}
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
            time{
                font-size:11px;
                color:#555;
            }
            p{
                margin:0;
                line-height:1.3;
                font-size:11px
            }
            img{
                border-radius:10px;
                width:100%;
                height:auto;
                margin-top:10px
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