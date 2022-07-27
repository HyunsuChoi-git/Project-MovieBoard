import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

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

    const [movie, setMovie] = useState({
        id : '',
        title : '',
        director : '',
        genre : '',
        grade : 0,
        photo : ''
    });
    useEffect(() => {
        setMovie(props.movie);
    },[props.movie]);

    const handleValueChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]:e.target.value
        });
    };   
    const handleSubmit = (e) => {
        console.log(1, movie);

        e.preventDefault(); // submit action을 안타도록 설정
        fetch("http://localhost:8080/movie/"+movie.id, {
            method : "PUT",
            headers : {
                "Content-Type":"application/json; charset=utf-8"
            },
            body: JSON.stringify(movie)
        })
        .then(res=>{
            console.log(res);
            // json 파싱 전, 상태코드 확인하여 res값 초기화
            if(res.status === 200){
                return res.json();
            }else{
                return null;
            }
        })
        .then(res=> {
            console.log(res);
            // res 값에 따른 결과 처리
            if(res !== null){
                alert('수정을 완료하였습니다.');
                
            }else{
                alert('수정을 실패하였습니다.');
            }
        });

    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                수정하기
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Modal.Body className="show-grid">
                
                    <Form.Group className="mb-3" controlId="formGridTitle">
                        <Form.Label>TITLE</Form.Label>
                        <Form.Control type="text" value={movie.title} name="title" onChange={(e) => handleValueChange(e)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridDirector">
                        <Form.Label>DIRECTOR</Form.Label>
                        <Form.Control type="text" value={movie.director} name="director" onChange={(e) => handleValueChange(e)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridGenre">
                        <Form.Label>GENRE</Form.Label>
                        <Form.Select type="checkbox" value={movie.genre} name="genre" onChange={(e) => handleValueChange(e)}>
                            <option>드라마</option>
                            <option>멜로/로맨스</option>
                            <option>공포</option>
                            <option>스릴러</option>
                            <option>코미디</option>
                            <option>액션</option>
                            <option>SF</option>
                            <option>판타지</option>
                            <option>가족</option>
                            <option>다큐멘터리</option>
                            <option>전쟁</option>
                            <option>미스터리</option>
                            <option>사극</option>
                            <option>애니메이션</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridGrade">
                        <Form.Label>GRADE</Form.Label>
                        <Form.Control type="text" value={movie.grade} name="grade" onChange={(e) => handleValueChange(e)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridPhoto">
                        <Form.Label>PHOTO</Form.Label>
                        <Form.Control type="file" name="photo" onChange={(e) => handleValueChange(e)}/>
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="primary" type="submit">수정</Button>
                        <Button variant="primary" onClick={props.onHide} >닫기</Button>
                    </Modal.Footer>
                    
                </Modal.Body>
            </Form>
        </Modal>
    );
};

const UpdateForm = (props) => {

    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <StyledButton variant="primary" name={'update'} onClick={() => setModalShow(true)}>update</StyledButton>
            <MydModalWithGrid show={modalShow} movie={props.movie} onHide={() => setModalShow(false)} /> 
        </div>
    );
};

export default UpdateForm;
