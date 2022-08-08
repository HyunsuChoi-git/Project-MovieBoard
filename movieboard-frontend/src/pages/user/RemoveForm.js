import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledDelBtn = styled(Button)`
    float: right;
`;

const MydModalWithGrid = (props) => {
    const {email} = props;
    const jwtEmail = JSON.parse(localStorage.getItem('email'));
    const navigation = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email !== jwtEmail){
            console.log('e : '+ email);
            console.log('j : '+ jwtEmail);
            alert('잘못된 접근입니다.');
            navigation('/');
        }

        const url = "http://localhost:8080/user/"+email;

        const config = {headers: {
            "Authorization" : JSON.parse(localStorage.getItem('jwt'))
        }
        };
        axios.delete(url, config)
            .then(res => {
                alert('탈퇴가 완료되었습니다.');
                navigation('/logout');
            }).catch(err => {
                alert('오류가 발생하였습니다.');
            });

    }

    return(
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                회원 탈퇴
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                <Form.Label>정말로 탈퇴하시겠습니까?</Form.Label>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleSubmit}>탈퇴</Button>
                    <Button variant="primary" onClick={props.onHide} >닫기</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

const RemoveForm = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const { email } = props;
    const navigation = useNavigate();

    const handleDeleteUser = (e) => {

        const url = "http://localhost:8080/"+email;
        
        const config = {};
        axios.delete(url, config
            ).then(res => {
                alert('탈퇴가 완료되었습니다.');
                navigation('/');
            }).catch(err => {
                alert('오류가 발생하였습니다.');
            });    
            
    }



    return (
        <div>
            <StyledDelBtn variant="danger" type="button" onClick={() => setModalShow(true)}>탈퇴</StyledDelBtn>
            <MydModalWithGrid show={modalShow} email={email} onHide={() => setModalShow(false)} />
        </div>
    );
};

export default RemoveForm;