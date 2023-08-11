import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Protected(props){
    const {Component} = props;
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        const isAdmin = localStorage.getItem('admin');

        if(token === null && isAdmin === null){
                navigate('/')
        }
    })
    return(
        <div>
            <Component/>
        </div>
    )


}

export default  Protected;