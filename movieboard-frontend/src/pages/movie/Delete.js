import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';


const StyledButton = styled(Button)`  // 버튼
    height: 32px;       // 버튼크기
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    position: relative;
    float: right;
    padding-top: 2px;   // text위치
`;
const Delete = (props) => {
    const [show, setShow] = useState(false);
    const navigation = useNavigate();

    const { id, title, login } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const hadleDelete = (e) => {

        const url = 'http://localhost:8080/manager/movie/'+id;
        const config = {
            headers: { "Authorization" : JSON.parse(localStorage.getItem('jwt'))  }
        };

        axios.delete(url, config)
        .then(res => {
            alert('삭제되었습니다.');
            navigation('/', {replace: true});
        }).catch(err => {
            //console.log(err.response.data.message); --> 서버단 에러메세지 출력~
            alert('오류가 발생하였습니다.');
        });

        handleClose();
    }

    const alertLogin = () => {
        alert('로그인이 필요합니다.');
        navigation('/loginForm');
    }

    const handleClick = (e) => {
        if(login){
            handleShow();
        }else{
            alertLogin();
        }
    }

    return (
        <div>
            <StyledButton variant="danger" onClick={handleClick}>delete</StyledButton>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>정말로 영화 '{title}'을/를 삭제하시겠습니까?</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={hadleDelete}>
                    YES
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    CANCLE
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Delete;