import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, ToggleButton } from 'react-bootstrap';
import styled from 'styled-components';
import { put } from 'axios';
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


const JoinForm = () => {

    const [user, setUser] = useState({
        email : JSON.parse(localStorage.getItem('email')),
        pw : '',
        birth : '',
        gender : '남'
    });

    const navigation = useNavigate();

    const [disagreePw, setDisagreePw] = useState(false);

    const radios = [
      { name: '남', value: '남' },
      { name: '여', value: '여' },
    ];

    useEffect(()=>{
        const url = 'http://localhost:8080/user/'+JSON.parse(localStorage.getItem('email'));
        console.log(JSON.parse(localStorage.getItem('jwt')))
        const config = {
            headers: {
                "Authorization" : JSON.parse(localStorage.getItem('jwt'))
            }
        };
        post(url, new FormData(), config)
            .then(res => {
                console.log(res);
                setUser({...user, 
                    birth : res.data.birth,
                    gender : res.data.gender
                });
            }).catch(err => {
                alert('잘못된 접근입니다.');
                navigation('/', {replace:true})
            });

    }, []);

    const handlePassword = (e) => { //비번일치여부
        if(user.pw === e.target.value){
            setDisagreePw(true);
        }else{
            setDisagreePw(false);
        }
    }

    const handleValue = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('저장 >>', user)
        if(disagreePw === true){

            const url = "http://localhost:8080/"+user.email;
            const formData = new FormData();
            formData.append('user', new Blob([JSON.stringify(user)], {
                type: "application/json"
            }));
            const config = {
                headers: {
                    "Authorization" : JSON.parse(localStorage.getItem('jwt'))
                }
            };
            put(url, formData, config
                ).then(res => {
                    alert('수정이 완료되었습니다.');
                    navigation('/');
                }).catch(err => {
                    alert('수정을 실패하였습니다');
                });
        }else{
            alert('패스워드가 일치하지 않습니다.');
        }
    };

    return (
        <StyledContainer>
            <StyledH2>MY PAGE</StyledH2><br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control type="email" name="email" placeholder={user.email} readOnly={true} onChange={handleValue}/>
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" name="pw" placeholder="Password" onChange={handleValue}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control type="password" name="pw2" placeholder="Password" onChange={handlePassword}/>
                    <Form.Text className="text-muted">
                    { disagreePw ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.' }
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>생년월일</Form.Label>
                    <Form.Control type="text" name="birth" value={user.birth} onChange={handleValue}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>성별</Form.Label>
                    <br/>
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant='outline-secondary'
                            name="gender"
                            value={radio.value}
                            checked={user.gender === radio.value}
                            onChange={handleValue}
                        >
                            {radio.name}
                        </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">Enter</Button>
            </Form>
        </StyledContainer>
    );
};

export default JoinForm;