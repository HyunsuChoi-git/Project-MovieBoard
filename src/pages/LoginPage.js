import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Login from '../components/login/Login';


// 페이지는 컴포넌트들의 조합니다.
// 컴포넌트를 만들어놓으면 재사용할 수 있다.

const LoginPage = () => {
    return (
        <div>
            <Header/>
            <Login/>
            <Footer/>
        </div>
    );
};

export default LoginPage;