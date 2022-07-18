import React from 'react';
import { Button } from 'react-bootstrap';
import '../App.css';
import { useDispatch } from 'react-redux';
import { increase, decrease } from '../store';


const Bottom = () => {
    const dispatcher = useDispatch();
    
    return (
        <div className='sub_container'>
            <h1>BOTTOM</h1>
            {/* <Button onClick={dispatcher(increase)}>증가</Button>  */}
            <Button onClick={() => {dispatcher(increase({id:2,name:"+"}))}}>증가</Button>
            <Button onClick={() => {dispatcher(decrease())}}>감소</Button>
        </div>
    );
};

export default Bottom;