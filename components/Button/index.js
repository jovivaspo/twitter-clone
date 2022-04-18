
const Button = ({ children, onClick, disabled }) => {
    return (
        <>
            <button onClick={onClick} disabled={disabled}>
               
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
                button[disabled]{
                    opacity:0.2;
                    pointer-events:none
                }
               
               `}
            </style>
        </>
    )
}

export { Button }