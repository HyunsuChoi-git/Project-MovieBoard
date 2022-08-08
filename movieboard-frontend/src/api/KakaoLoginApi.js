import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REDIRECT_URI, REST_API_KEY } from '../properties/KakaoPropertoes';
import { post } from 'axios';

const KakaoLogin = (props) => {  
    const {setLogin, setKakaoUser} = props;
    const navigation = useNavigate();
    const params = new URL(document.location).searchParams;
    const KAKAO_CODE = params.get('code');
    const [ access_token, setAccess_token ] = useState(''); 

    useEffect(() => {
        //인가토큰 받아오기
        fetch(
            'https://kauth.kakao.com/oauth/token', {
                method : 'POST',
                headers: { 'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'},
                body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`
            }
        ).then(res=> res.json())
        .then(res => {
            setAccess_token(res.access_token);
        }
        );
    }, [])

    const getJwtToken = () =>  {
        let statusCode;
        // 서버로 인가토큰 전송
        fetch(`http://localhost:8080/kakaotoken/redirect?access_token=${access_token}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`, {method: 'GET'})
        .then(res=> {
            statusCode = res.status;
            return res.json()
        })
        .then(res=>{
            const userEntity = res;
            if(statusCode === 200) {
                // 로그인 처리
                post('http://localhost:8080/kakaojwt', userEntity, {"Content-Type": 'application/json'})
                    .then(res => {
                        // 로그인 정보 로컬스토리지에 저장
                        localStorage.setItem('jwt', JSON.stringify(res.headers.authorization));
                        localStorage.setItem('email', JSON.stringify(userEntity.email));  
                        localStorage.setItem('role', JSON.stringify(userEntity.roles));
                        setLogin(true);
                        navigation('/');
                    }).catch(err => {
                        alert('오류가 발생하였습니다. 관리자에게 문의하세요');
                    })
            }else if(statusCode === 202){
                console.log(2, userEntity);
                setKakaoUser({
                    email: userEntity.email,
                    gender: userEntity.gender,
                    birth: userEntity.birth
                })
                alert('회원가입 페이지로 이동합니다.');
                navigation('/joinForm', {replace: true});
            }else{
                alert("로그인에 실패하였습니다.");
                navigation('/');
            };
            
        })
    }

    useMemo(()=>{
        if(access_token !== undefined && access_token !== null && access_token !== '' && access_token !== ' '){
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