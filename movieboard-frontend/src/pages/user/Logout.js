import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
    const { setLogin } = props;
    const navigation = useNavigate();
    
    setLogin(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    navigation('/', {replace : true});
};

export default Logout;