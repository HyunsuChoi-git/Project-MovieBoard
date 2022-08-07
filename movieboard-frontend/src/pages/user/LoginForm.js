import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { post } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { KAKAO_AUTH_URL } from '../../properties/KakaoPropertoes';


const StyledContainer = styled.div`
    margin: auto;
    margin-top: 3em;
    margin-bottom: 3em;
    max-width: 20em;
`;

const StyledH2 = styled.h2`
    margin: auto;
    font-weight: bolder;
    color: slateblue;
`;

const StyledDiv = styled.div`
    margin: auto;
    padding: 0;
    display: grid;
    
`;

const StyledButton = styled(Button)`
    margin: auto;
    width: 18.8em;
    height: 2.9em;
    margin-bottom: 5px;
`;

const StyledImg = styled.img`
    padding : 0;
    margin : auto;
`;


const LoginForm = (props) => {
    const { setLogin } = props;
    const [email, setEmail] = useState();
    const [pw, setPw] = useState();
    const navigation = useNavigate();

    const handleValue = (e) => {
        if(e.target.name === 'email') {
            setEmail(e.target.value);
        }else{
            setPw(e.target.value);
        }
    }

    const handleKaKao = (e) => {
        window.location.href = KAKAO_AUTH_URL;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "http://localhost:8080/login";
        const data = {
            'email' : email,
            'pw' : pw
        };
        const config = {"Content-Type": 'application/json'};
        
        post(url, data, config)
            .then(res => {
                const loginRes = res;
                post('http://localhost:8080/role',{'email':email}, {"Content-Type": 'application/json'})
                    .then(res => {
                        // 로그인 정보 로컬스토리지에 저장
                        localStorage.setItem('jwt', JSON.stringify(loginRes.headers.authorization));
                        localStorage.setItem('email', JSON.stringify(email));  
                        localStorage.setItem('role', JSON.stringify(res.data));
                        setLogin(true);
                        navigation('/');
                    }).catch(err => {
                        alert('오류가 발생하였습니다. 관리자에게 문의하세요');
                    })
                
            }).catch(err => {
                //console.log(err.response.data.message); --> 서버단 에러메세지 출력~
                alert('이메일과 패스워드를 확인하세요.');
            });

    };


    return (
        <StyledContainer>
            <StyledH2>LOGIN</StyledH2><br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>이메일</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleValue}/>
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" name="pw" placeholder="Password" onChange={handleValue}/>
                </Form.Group>
                <br/>
                <StyledDiv>
                <StyledButton variant="primary" type="submit">ENTER</StyledButton>
                <StyledImg className="btn" src={process.env.PUBLIC_URL+"/image/"+"kakao_login.png"} alt="kakaotalk login" onClick={handleKaKao} />
                </StyledDiv>
            </Form>
        </StyledContainer>
    );
};

export default LoginForm;