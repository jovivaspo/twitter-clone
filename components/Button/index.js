
const Button = ({ children, onClick }) => {
    return (
        <>
            <button onClick={onClick}>
                <img  className="logoGit" src='/github.png'/>
                {children}
            </button>
            <style jsx>
                {`
               button{
                   display:flex;
                   justify-content:center;
                   background: #000000;
                   border:0;
                    border-radius:9999px;
                    color:#fff;
                    font-size:14px;
                    font-weight:800;
                    padding: 8px 24px;
                    cursor:pointer;
                    transition: opacity 0.3s ease;   
                }
                button:hover{
                    opacity:0.7
                }
                .logoGit{
                   
                    width:18px;
                    margin-right: 10px;
                    
                }
               `}
            </style>
        </>
    )
}

export { Button }