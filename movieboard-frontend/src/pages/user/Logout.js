import React from 'react';

const Logout = () => {
    localStorage.removeItem('user');
};

export default Logout;