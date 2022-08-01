import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Card} from 'react-bootstrap';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import UpdateForm from './UpdateForm';

import Delete from './Delete';
import CommentForm from '../comment/CommentForm';

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
    font-size: 16px;
    font-weight: bold;
    max-height: 400px;
    overflow: auto;
`;
const StyledComment = styled(StyledCardText)`
    padding: 10px;
    font-size: 13px;
    font-weight: lighter;
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

    const [ liComments, setLiComment ] = useState([]);

    useEffect(() => {
        console.log('zzzzz');
        // 영화정보
        fetch("http://localhost:8080/movie/"+id, { method : "GET" })
            .then( res => res.json(), {
                suspense: true,
              })
            .then( res => {
                setMovie(res);
            });
    }, [propsParam.id]);
    
    // 영화정보 렌더링이 완료되면 감상평 가져오기
    const getComments = useMemo(() => {
        // 감상평
        fetch("http://localhost:8080/comment/"+id+"&"+movie.title, { method : "GET" })
        .then( res => res.json() )
        .then( res => {
            console.log('감상평List - ',res);
            setLiComment(res);
        });
    }, [movie]);


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
                        <StyledComment>{
                            liComments.map((comment, index) => {
                                return (
                                    <p key={index}>{comment.content} ({comment.email.substring(0,5)}...)</p>
                                )
                            })
                            
                            }</StyledComment>
                    </Card.Body>                    
                </StyledContentCard>
            </StyledCardBody_1>
            
            <StyledCardBody_2>
            <Suspense>
                {/* 관리자 */}
                <Delete id={id} title={movie.title}/>
                <UpdateForm movie={movie}/>
                {/* 회원 */}
                <CommentForm movie={movie}/>
            </Suspense>
            </StyledCardBody_2>
        </StyledContainerCard>      

    );
};

export default Detail;