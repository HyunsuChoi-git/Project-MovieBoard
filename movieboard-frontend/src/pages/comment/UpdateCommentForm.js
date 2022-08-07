import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import {put} from 'axios';
import { useNavigate } from 'react-router-dom';

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
`;

const MydModalWithGrid = (props) => {
    const {commentTogle, setCommentTogle, comment} = props;
    const [newComment, setNewComment] = useState({
        id:0,
        titleId : 0,
        title : '',
        email : '',
        content : '',
    });

    useEffect(()=> {
        setNewComment({...comment});
    }, [comment])

    const handleValueChange = (e) => {
        setNewComment({...newComment, content : e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newComment === ''){
            alert('감상평을 입력하세요.');
        }else{
            const url = "http://localhost:8080/user/comment/"+newComment.id;
            const formData = new FormData();
            formData.append('comment', new Blob([JSON.stringify(newComment)], {
                type: "application/json"
            }));
            const config = {
                headers: { "Authorization" : JSON.parse(localStorage.getItem('jwt'))}
            }

            put(url, formData, config)
                .then(res => {
                    alert('수정되었습니다.');
                    props.onHide();
                    if(commentTogle === false){
                        setCommentTogle(true);
                    }else{
                        setCommentTogle(false);
                    }
                }).catch(err => {
                    alert('실패하였습니다.');
                });
        }
    }

    return(
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                감상평 수정
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <FloatingLabel controlId="floatingTextarea2" label="comments" onChange={handleValueChange}>
                        <Form.Control as="textarea"style={{ height: '100px' }} value={newComment.content}/>
                    </FloatingLabel>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">수정</Button>
                        <Button variant="primary" onClick={props.onHide} >닫기</Button>
                    </Modal.Footer>
                </Modal.Body>
            </Form>
        </Modal>
    );
}



const UpdatenewCommentForm = (props) => {
    const {login} = props;
    const {commentTogle, setCommentTogle} = props;
    const [modalShow, setModalShow] = useState(false);
    const { comment } = props;

    const navigation = useNavigate();

    const alertLogin = () => {
        alert('로그인이 필요합니다.');
        navigation('/loginForm');
    }

    const handleClick = (e) => {
        if(login){
            setModalShow(true);
        }else{
            alertLogin();
        }
    }

    return (
        <StyledDiv>
            { login &&
                <StyledButton variant="warning" name={'update'} onClick={handleClick}>수정</StyledButton>
            }
            <MydModalWithGrid show={modalShow} comment={comment} commentTogle={commentTogle} setCommentTogle={setCommentTogle} onHide={() => setModalShow(false)} /> 
        </StyledDiv>
    );
};

export default UpdatenewCommentForm;