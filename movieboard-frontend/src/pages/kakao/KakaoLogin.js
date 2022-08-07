import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { REDIRECT_URI, REST_API_KEY } from '../../properties/KakaoPropertoes';

const KakaoLogin = () => {  
    const navigation = useNavigate();
    const params = new URL(document.location).searchParams;
    const KAKAO_CODE = params.get('code');
    const [ access_token, setAccess_token ] = useState(''); 

    const getToken = () => {
        fetch(
            'https://kauth.kakao.com/oauth/token', {
                method : 'POST',
                headers: { 'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'},
                body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`
            }
        ).then(res=> res.json())
        .then(res => {
            console.log(res.access_token);
            setAccess_token(res.access_token);
        }
        );
    }

    const getJwtToken = () =>  {
        fetch(`http://localhost:8080/kakaotoken/redirect?access_token=${access_token}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`, {method: 'GET'})
        .then(res=> res.json())
        .then(data=>{
            navigation('/');
        })
    }

    useEffect(() => {
        getToken();
    }, [])

    useMemo(()=>{
        if(access_token !== undefined && access_token !== null && access_token !== '' && access_token !== ' '){
            console.log("서버로 토큰 전송 : ", access_token);
            getJwtToken();
        }
    },[access_token])




    // useEffect(()=>{
    //     fetch(`http://localhost:8080/kakao/redirect?code=${KAKAO_CODE}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`, {method: 'GET'})
    //         .then(res=> res.json())
    //         .then(data=>{
    //             localStorage.setItem('jwt', data.token);
    //             navigation('/');
    //         })
    // },[])


    return (
        <div>
        </div>
    );
};

export default KakaoLogin;