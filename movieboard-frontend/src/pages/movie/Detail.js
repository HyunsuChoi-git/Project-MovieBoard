import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import styled from "styled-components";
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import UpdateForm from './UpdateForm';
import CommentForm from './CommentForm';
import Delete from './Delete';

const StyledContainerCard = styled(Card)`
    margin: auto;
    margin-top: 1em;            // Header와 Container 간격
`;
const StyledCardBody_1 = styled(Card.Body)`
    padding: 0;
    display:flex; 
    align-items: flex-start;
    height: 80%;
`;
const StyledImgCard = styled(Card.Body)` // 이미지
    width: 35%;
    padding: 0px;
`;
const StyledContentCard = styled(Card.Body)`   // 내용
    width: 65%;
`;
const StyledCardTitle = styled(Card.Title)`
    font-weight: bold;
`;
const StyledCardText = styled(Card.Text)`
    margin-bottom : 0;
    font-size: 14px;
    max-height: 400px;
    overflow: auto;
`;
const StyledCardBody_2 = styled(Card.Body)`
    position: relative;
    bottom:   0;
    float: right;
    padding: 0;
`;


const Detail = (props) => {

    const propsParam = useParams();
    const id =  propsParam.id;

    const src = process.env.PUBLIC_URL+"/image/";

    const [ movie, setMovie ] = useState({
        id: '',
        title: '',
        director: '',
        genre: '',
        grade: 0,
        photo: '',
        memo: ''
    });

    useEffect(() => {
        fetch("http://localhost:8080/movie/"+id, { method : "GET" })
            .then( res => res.json() )
            .then( res => {
                setMovie(res);
            });
    }, []);

    return (
        <StyledContainerCard style={{ width: '45rem'}}>
            <StyledCardBody_1>
                <StyledImgCard>
                    <Card.Img variant="top" src={src+movie.photo} alt="Movie img"/>
                </StyledImgCard>
                <StyledContentCard>
                    <Card.Body>
                        <StyledCardTitle>{movie.title}</StyledCardTitle>
                        <StyledCardText>감독 : {movie.director}</StyledCardText>
                        <StyledCardText>장르 : {movie.genre}</StyledCardText>
                        <StyledCardText>평점 : {[...Array(parseInt(movie.grade/2))].map((n, index) => {
                                return (<FontAwesomeIcon icon={faStar} key={index}/>)})}
                                { movie.grade%2 === 1 && (<FontAwesomeIcon icon={faStarHalf} />) }
                                ㅣ{movie.grade}
                        </StyledCardText>
                        <StyledCardText><br/></StyledCardText>
                        <StyledCardText>감상평 : </StyledCardText>
                        <StyledCardText>{movie.memo}</StyledCardText>
                    </Card.Body>                    
                </StyledContentCard>
            </StyledCardBody_1>

            <StyledCardBody_2>
                <Delete id={id} title={movie.title}/>
                <CommentForm id={id}/>
                <UpdateForm movie={movie}/>
            </StyledCardBody_2>
        </StyledContainerCard>      

    );
};

export default Detail;


///<StyledButton variant="danger" onClick={''}>delete</StyledButton>