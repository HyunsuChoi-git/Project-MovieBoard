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
    const {commentTogle, setCommentTogle} = props;
    const {movie} = props;
    const [comment, setComment] = useState({
        titleId : 0,
        title : '',
        email : '',
        content : '',
    });

    useEffect(()=> {
        setComment({...comment, titleId : movie.id, title : movie.title, email: JSON.parse(localStorage.getItem('email'))});
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
            console.log(comment);
            const url = "http://localhost:8080/user/comment";
            const formData = new FormData();
            formData.append('comment', new Blob([JSON.stringify(comment)], {
                type: "application/json"
            }));
            const config = {
                headers: { "Authorization" : JSON.parse(localStorage.getItem('jwt'))}
            }

            post(url, formData, config)
                .then(res => {
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
    const {commentTogle, setCommentTogle, login} = props;
    const [modalShow, setModalShow] = useState(false);
    const { movie } = props;

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
        <div>
            <StyledButton variant="primary" name={'update'} onClick={handleClick}>comment</StyledButton>
            <MydModalWithGrid show={modalShow} movie={movie} commentTogle={commentTogle} setCommentTogle={setCommentTogle} onHide={() => setModalShow(false)} /> 
        </div>
    );
};

export default CommentForm;