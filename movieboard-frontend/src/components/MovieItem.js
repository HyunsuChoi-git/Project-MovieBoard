import React from 'react';
import { Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";


const StyledItemDiv = styled.div`
    display: inline-flexbox;    // Card 배치
    margin-left: 0.5em;        // Card간 간격
    margin-top: 1em;            // Header와 Container 간격
`;
const StyledCardTitle = styled(Card.Title)`
    margin-top: -5px;
    font-weight: bold;
    font-size: 17px;    
`;
const StyledCardText = styled(Card.Text)`
    margin-bottom : 0;
    font-size: 13px;
`;
const StyledLink = styled(Link)`
    height: 32px;
    margin-top: 8px;
    padding-top: 2px;
`;


const MovieItem = (props) => {

    const { id, title, director, photo, genre, grade } = props.movie;
    const src = process.env.PUBLIC_URL+"/image/";

    return (
        <StyledItemDiv>
            <Card style={{ width: '15rem', height:'25.8rem'}}>
                <Card.Img variant="top" src={src+photo} alt="Movie img" height={260}/>
                <Card.Body>
                    <StyledCardTitle>{title}</StyledCardTitle>
                    <StyledCardText>감독 : {director}</StyledCardText>
                    <StyledCardText>장르 : {genre}</StyledCardText>
                    <StyledCardText>평점 : {[...Array(parseInt(grade/2))].map((n, index) => {
                            return (<FontAwesomeIcon icon={faStar} key={index}/>)})}
                            { grade%2 === 1 && (<FontAwesomeIcon icon={faStarHalf} />) }
                            ㅣ{grade}
                    </StyledCardText>
                    <StyledLink to={'/moive/'+id} className='btn btn-primary'>more</StyledLink>
                </Card.Body>
            </Card>
        </StyledItemDiv>

    );
};

export default MovieItem;