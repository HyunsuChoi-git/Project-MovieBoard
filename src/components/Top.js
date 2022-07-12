import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css';


const Top = () => {

    const number = useSelector((store)=>store.number);

    return (
        <div className='sub_container'>
            <h1>TOP</h1>
            번호 : {number}
        </div>
    );
};

export default Top;