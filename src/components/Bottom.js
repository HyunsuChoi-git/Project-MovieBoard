import React from 'react';
import { Button } from 'react-bootstrap';
import '../App.css';
import { useDispatch } from 'react-redux';
import { increase } from '../store';


const Bottom = () => {
    const dispatcher = useDispatch();
    
    return (
        <div className='sub_container'>
            <h1>BOTTOM</h1>
            {/* <Button onClick={dispatcher(increase)}>증가</Button>  */}
            <Button onClick={() => {dispatcher(increase())}}>증가</Button>
        </div>
    );
};

export default Bottom;