import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import styled from "styled-components";
import { post } from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)`  // 버튼
    height: 32px;       // 버튼크기
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    position: relative;
    float: right;
    padding-top: 2px;   // text위치
`;

const MydModalWithGrid = (props) => {
    const navigation = useNavigate();
    const {movie} = props;
    const [comment, setComment] = useState({
        titleId : 0,
        title : '',
        email : '',
        content : '',
    });

    useEffect(()=> {
        setComment({...comment, titleId : movie.id, title : movie.title});
    }, [movie])

    const handleValueChange = (e) => {
        setComment({...comment, content : e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(comment === ''){
            alert('감상평을 입력하세요.');
        }else{
            setComment({...comment, titleId : movie.id, title : movie.title});
            console.log(3, comment);

            const formData = new FormData();
            formData.append('comment', new Blob([JSON.stringify(comment)], {
                type: "application/json"
            }));
            post("http://localhost:8080/comment", formData, {}
                ).then(res => {
                    alert('등록되었습니다.');
                    props.onHide();
                }).catch(err => {
                    alert('실패하였습니다.');
                });
        }
    }

    return(
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                감상평 작성
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <FloatingLabel controlId="floatingTextarea2" label="Comments" name="comment" onChange={handleValueChange}>
                        <Form.Control as="textarea"style={{ height: '100px' }} />
                    </FloatingLabel>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">등록</Button>
                        <Button variant="primary" onClick={props.onHide} >닫기</Button>
                    </Modal.Footer>
                </Modal.Body>
            </Form>
        </Modal>
    );
}


const CommentForm = (props) => {

    const [modalShow, setModalShow] = useState(false);
    const { movie } = props;


    return (
        <div>
            <StyledButton variant="primary" name={'update'} onClick={() => setModalShow(true)}>comment</StyledButton>
            <MydModalWithGrid show={modalShow} movie={movie} onHide={() => setModalShow(false)} /> 
            
            
        </div>
    );
};

export default CommentForm;