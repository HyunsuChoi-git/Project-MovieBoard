import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Card} from 'react-bootstrap';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import UpdateForm from './UpdateForm';

import Delete from './Delete';
import AddCommentForm from '../comment/AddCommentForm';
import DeleteComment from '../comment/DeleteComment';
import UpdateCommentForm from '../comment/UpdateCommentForm';
import { commentRoleLevel, movieRoleLevel } from '../../properties/RoleProperties';

const StyledContainerCard = styled(Card)`   //전체 컨테이너
    margin: auto;
    margin-top: 3em;            
`;
const StyledCardBody_1 = styled(Card.Body)` // 이미지,영화정보 칸
    padding: 0;
    display:flex; 
    align-items: flex-start;
    height: 80%;
`;
const StyledImgCard = styled(Card.Body)` // 이미지
    width: 35%;
    padding: 0px;
`;
const StyledContentCard = styled(Card.Body)`   // 영화정보
    width: 65%;
`;
const StyledCardTitle = styled(Card.Title)` // 영화제목 text
    font-weight: bold;
`;
const StyledCardText = styled(Card.Text)`   // 영화정보 text
    margin-bottom : 0;
    font-size: 16px;
    font-weight: bold;
    max-height: 400px;
    overflow: auto;
`;
const StyledComment = styled(StyledCardText)`   // 감상평
    padding: 10px;
    font-size: 13px;
    font-weight: lighter;
`;
const StyledCardBody_2 = styled(Card.Body)` // 버튼 칸
    position: relative;
    bottom:   0;
    float: right;
    padding: 0;
`;


const Detail = (props) => {
    const {login} = props;
    const propsParam = useParams();
    const id =  propsParam.id;
    const src = process.env.PUBLIC_URL+"/image/";

    const [updateTogle, setUpdateTogle] = useState(false);
    const [commentTogle, setCommentTogle] = useState(false);

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
        // 영화정보
        fetch("http://localhost:8080/movie/"+id, { method : "GET" })
            .then( res => res.json(), {
                suspense: true,
              })
            .then( res => {
                setMovie(res);
            });
    }, [updateTogle]);
    
    // 영화정보 렌더링이 완료되면 감상평 가져오기
    useMemo(() => {
        // 감상평
        fetch("http://localhost:8080/comment/"+id+"&"+movie.title, { method : "GET" })
        .then( res => res.json() )
        .then( res => {
            setLiComment(res);
        });
    }, [movie, commentTogle]);


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
                                    <p key={index}>{comment.content} ({
                                        comment.email !== null && comment.email.substring(0,5)}...)
                                    {(comment.email === JSON.parse(localStorage.getItem('email')) 
                                        || commentRoleLevel.includes(JSON.parse(localStorage.getItem('role'))))
                                        &&     // 글쓴이 이거나, manager이상만 삭제 가능
                                        <DeleteComment id={comment.id} login={login} commentTogle={commentTogle} setCommentTogle={setCommentTogle}/>
                                    }
                                    {comment.email === JSON.parse(localStorage.getItem('email'))   // 글쓴이일 경우에만 수정 가능
                                        &&
                                        <UpdateCommentForm comment={comment} login={login} commentTogle={commentTogle} setCommentTogle={setCommentTogle} />
                                    }
                                    </p>
                                )
                            })
                            
                            }</StyledComment>
                    </Card.Body>                    
                </StyledContentCard>
            </StyledCardBody_1>
            
            <StyledCardBody_2>
                {/* 관리자 */}
                {movieRoleLevel.includes(JSON.parse(localStorage.getItem('role'))) &&
                    <Delete id={id} login={login} title={movie.title}/> }
                {movieRoleLevel.includes(JSON.parse(localStorage.getItem('role'))) &&
                    <UpdateForm movie={movie} login={login} updateTogle={updateTogle} setUpdateTogle={setUpdateTogle}/> }
                {/* 회원 */}
                <AddCommentForm movie={movie} login={login} commentTogle={commentTogle} setCommentTogle={setCommentTogle}/>
            </StyledCardBody_2> 
        </StyledContainerCard>      

    );
};

export default Detail;