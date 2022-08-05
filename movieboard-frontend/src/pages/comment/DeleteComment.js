import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';


const StyledDiv = styled.div`
    position: relative;
    float: right;
    padding: 0;
`;
const StyledButton = styled(Button)`  // 버튼
    height: 20px;       // 버튼크기
    width: 28px;       // 버튼크기
    position: relative;
    font-size: 5px;
    padding-top: 2px;   // text위치
    padding-left: 0px;
    padding-right: 0px;
    margin-left: 2px;
    margin-right: 0px;
`;


const DeleteComment = (props) => {
    const [show, setShow] = useState(false);
    const {commentTogle, setCommentTogle} = props;

    const { id } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const hadleDelete = (e) => {

        fetch(
            'http://localhost:8080/user/comment/'+id, { method: "DELETE" })
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
                    if(commentTogle === false){
                        setCommentTogle(true);
                    }else{
                        setCommentTogle(false);
                    }
                }else{
                    alert('오류가 발생하였습니다.');
                }
            });

        handleClose();
    }


    return (
        <StyledDiv>
            <StyledButton variant="danger" onClick={handleShow}>삭제</StyledButton>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>감상평을 삭제하시겠습니까?</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={hadleDelete}>
                    YES
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    CANCLE
                </Button>
                </Modal.Footer>
            </Modal>
        </StyledDiv>
    );
};

export default DeleteComment;