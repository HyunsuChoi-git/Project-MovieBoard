import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


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

    const { id, title } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const hadleDelete = (e) => {

        fetch(
            'http://localhost:8080/movie/'+id, { method: "DELETE" })
            .then(res=>{
                console.log(res);
                if(res.status === 200){
                    return "OK";
                }else{
                    return null;
                }
            })
            .then(res=> {
                if(res !== null){
                    alert('삭제되었습니다.');
                    navigation('/', {replace: true});
                }else{
                    alert('오류가 발생하였습니다.');
                }
            });

        handleClose();
    }


    return (
        <div>
            <StyledButton variant="danger" onClick={handleShow}>delete</StyledButton>

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