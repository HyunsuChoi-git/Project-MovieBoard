import React, { useState } from 'react';
import { Button, ButtonGroup, Form, ToggleButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { post } from 'axios';
import styled from 'styled-components';

const StyledContainer = styled.div`
    margin: auto;
    margin-top: 5em;
    max-width: 25em;
`;

const StyledH2 = styled.h2`
    margin: auto;
    font-weight: bolder;
    color: slateblue;
`;

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
  
    const radios = [
      { name: '0', value: 0 },
      { name: '1', value: 1 },
      { name: '2', value: 2 },
      { name: '3', value: 3 },
      { name: '4', value: 4 },
      { name: '5', value: 5 },
      { name: '6', value: 6 },
      { name: '7', value: 7 },
      { name: '8', value: 8 },
      { name: '9', value: 9 },
      { name: '10', value: 10 }
    ];

    const handleValueChange = (e) => {
        console.log(e.target.name, e.target.value);
        setMovie({
            ...movie,
            [e.target.name]:e.target.value
        });
    };
    const handelFileChange = (e) => {

        setFile(e.target.files[0])    //사용자가 다중 파일을 선택할 때, 첫번째 파일만 가져오기
        setMovie({...movie, photo: e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        let url = '';
        let config = {};

        formData.append('movie', new Blob([JSON.stringify(movie)], {
            type: "application/json"
        }));

        if(file !== undefined) {
            url = 'http://localhost:8080/movieplus';
            formData.append('file', file);
            config = {
                headers: {
                    "Contest-Type": "multipart/form-data"
                }
            }
        }else{
            url = 'http://localhost:8080/movie';
        }

        console.log(url);

        post(url, formData, config
        ).then(res => {
            console.log(res);
            if(res.status === 201){
                alert('등록되었습니다.');
                navigation('/', {replace : true});
            }else{
                alert('실패하였습니다.');
            }
        }).catch(err => {
            alert('오류가 발생하였습니다.');
        });

    }

    return (
        <StyledContainer>
        <StyledH2>ADD NEW MOVIE</StyledH2><br/>
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
                    <br/>
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                                name="grade"
                                value={radio.value}
                                checked={movie.grade === radio.value}
                                onChange={(e) => handleValueChange(e)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>        
                    {/* <Form.Control type="text" placeholder="1 ~ 10" name="grade" onChange={(e) => handleValueChange(e)}/> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridPhoto">
                    <Form.Label>PHOTO</Form.Label>
                    <Form.Control type="file" name="photo" onChange={(e) => handelFileChange(e)}/>
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </StyledContainer>
    );
};

export default AddForm;