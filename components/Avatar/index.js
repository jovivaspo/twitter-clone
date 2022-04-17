
const Avatar = ({ user }) => {
    
   return <>
     <div className="container">
        <img className="avatar" src={user.avatar} alt="avatar" />
        <strong>{user.username}</strong>
    </div>
    <style jsx>
        {`
        .container{
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            margin:16px;
        }
        .avatar{
            width: 100px;
            height: 100px;
            margin:10px;
            border-radius:100%
           
        }
        `}
    </style>
    </> 
}

export {Avatar}