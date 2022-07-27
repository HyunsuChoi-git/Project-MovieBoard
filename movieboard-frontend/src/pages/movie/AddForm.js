import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

const AddForm = (props) => {
    const navigation = useNavigate();
    const [movie, setMovie] = useState({
        title : '',
        director : '',
        genre : '',
        grade : 0,
        photo : '',
    });
    const [file, setFile] = useState();
    const handleValueChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]:e.target.value
        });
    };
    const handelFileChange = (e) => {

        const filename = moment().format('YYYYMMDDHHmmss') + "_" +e.target.files[0]; 

        setFile(e.target.files[0])    //사용자가 다중 파일을 선택할 때, 첫번째 파일만 가져오기
        setMovie({...movie, photo: e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        saveAs(file, movie.photo);   //파일 저장

        fetch("http://localhost:8080/movie", {
            method : "POST",
            headers : {
                "Content-Type":"application/json; charset=utf-8"
            },
            body: JSON.stringify(movie)
        })
        .then(res=>{
            console.log(res);
            // json 파싱 전, 상태코드 확인하여 res값 초기화
            if(res.status === 201){
                return res.json();
            }else{
                return null;
            }
        })
        .then(res=> {
            console.log(res);
            // res 값에 따른 결과 처리
            if(res !== null){
                navigation('/', {replace : true});
            }else{
                alert('등록을 실패하였습니다.');
            }
        });

    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formGridTitle">
                <Form.Label>TITLE</Form.Label>
                <Form.Control type="text" placeholder="Movie title" name="title" onChange={(e) => handleValueChange(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridDirector">
                <Form.Label>DIRECTOR</Form.Label>
                <Form.Control type="text" placeholder="Movie director" name="director" onChange={(e) => handleValueChange(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridGenre">
                <Form.Label>GENRE</Form.Label>
                <Form.Select type="checkbox" placeholder="Choose..." name="genre" onChange={(e) => handleValueChange(e)}>
                    <option>Choose...</option>
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
                <Form.Control type="text" placeholder="1 ~ 10" name="grade" onChange={(e) => handleValueChange(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPhoto">
                <Form.Label>PHOTO</Form.Label>
                <Form.Control type="file" name="photo" onChange={(e) => handelFileChange(e)}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Save
            </Button>
        </Form>
    );
};

export default AddForm;