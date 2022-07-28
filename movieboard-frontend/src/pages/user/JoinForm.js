import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { post } from 'axios';
import { useNavigate } from 'react-router-dom';


const StyledContainer = styled.div`
    margin: auto;
    margin-top: 3em;
    max-width: 20em;
`;

const StyledH2 = styled.h2`
    margin: auto;
    font-weight: bolder;
    color: slateblue;
`;
const JoinForm = () => {

    const [user, setUser] = useState({
        email : '',
        pw : '',
        birth : '',
        gender : ''
    });

    const navigation = useNavigate();

    const [disagreePw, setDisagreePw] = useState(false);

    const handleValue = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(disagreePw === false){
            const formData = new FormData();
            formData.append('user', new Blob(JSON.parse(user),
            { type: "application/json" } ));
    
            post("http://localhost:8080/login", formData, {}
                ).then(res => {
                    alert('회원가입이 완료되었습니다.');
                    navigation('/');
                }).catch(err => {
                    alert('이메일과 패스워드를 확인하세요.');
                });
        }
    };

    return (
        <StyledContainer>
            <StyledH2>JOIN</StyledH2><br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>이메일</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleValue}/>
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" name="pw" placeholder="Password" onChange={handleValue}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control type="password" name="pw2" placeholder="Password" onChange={handleValue}/>
                <Form.Text show={disagreePw} className="text-muted" >
                    비밀번호가 일치하지 않습니다.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>생년월일</Form.Label>
                <Form.Control type="text" name="pw" placeholder="Password" onChange={handleValue}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>성별</Form.Label>
                <Form.Control type="text" name="pw" placeholder="Password" onChange={handleValue}/>
                </Form.Group>

                <Button variant="primary" type="submit">Enter</Button>
            </Form>
        </StyledContainer>
    );
};

export default JoinForm;