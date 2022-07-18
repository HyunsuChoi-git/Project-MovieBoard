import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css';


const Top = () => {

    const {number, body} = useSelector((store)=>store);

    return (
        <div className='sub_container'>
            <h1>TOP</h1>
            번호 : {number}<br/>
            기호 : {body != undefined ? body.name : "-"}
        </div>
    );
};

export default Top;