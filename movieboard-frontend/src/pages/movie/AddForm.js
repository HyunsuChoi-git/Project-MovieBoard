import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddForm = () => {

    const [movie, setMovie] = useState({
        title : '',
        director : '',
        genre : '',
        grade : 0,
        photo : ''
    });


    const handleValueChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]:e.target.value
        });
    }   

    const handleSubmit = (e) => {
        e.preventDefault(); // submit action을 안타도록 설정
        fetch("http://localhost:8080/movie", {
            method : "POST",
            headers : {
                "Content-Type":"application/json; charset=utf-8"
            },
            body: JSON.stringify(movie)
        })
        .then(res=>res.json())
        .then(res=> {
            console.log(res);
        }).catch((err) => {
            alert('등록에 실패하였습니다.');
        }
        );
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
                <Form.Control type="file" name="photo" onChange={(e) => handleValueChange(e)}/>
            </Form.Group>

{/*             <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default AddForm;