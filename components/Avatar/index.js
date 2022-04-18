
const Avatar = ({ avatar}) => {
    
   return <>
     <div className="container">
        <img className="avatar" src={avatar} alt="avatar" />
    </div>
    <style jsx>
        {`
        .container{
            display:flex;
            margin:8px;
        }
        .avatar{
            width: 48px;
            height: 48px;
            border-radius:100%
           
        }
        `}
    </style>
    </> 
}

export {Avatar}