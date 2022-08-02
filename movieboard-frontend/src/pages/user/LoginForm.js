import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { post } from 'axios';
import { useNavigate } from 'react-router-dom';


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


const LoginForm = () => {
    const [email, setEmail] = useState();
    const [pw, setPw] = useState();
    const navigation = useNavigate();

    const handleValue = (e) => {
        console.log(e.target.value);
        if(e.target.name === 'email') {
            setEmail(e.target.value);
        }else{
            setPw(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('pw', pw);

        post("http://localhost:8080/login", formData, {}
            ).then(res => {
                navigation('/');
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
                <Button variant="primary" type="submit">Enter</Button>
            </Form>
        </StyledContainer>
    );
};

export default LoginForm;