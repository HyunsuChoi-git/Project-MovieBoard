import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";


const MovieItem = (props) => {

    const { id, title, director, photo, genre, grade } = props.movie;
    const src = process.env.PUBLIC_URL+"/image/";

    return (
        <Card style={{ width: '15rem', height:'25rem'}}>
            <Card.Img variant="top" src={src+photo} alt="Movie img" height={260}/>
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>감독 : {director}</Card.Text>
            <Card.Text>장르 : {genre}</Card.Text>
            <Card.Text>평점 : {[...Array(parseInt(grade/2))].map((n, index) => {
                    return (<FontAwesomeIcon icon={faStar} />)})}
                    { grade%2 === 1 && (<FontAwesomeIcon icon={faStarHalf} />) }
                    ㅣ{grade}
            </Card.Text>
            </Card.Body>
        </Card>

    );
};

export default MovieItem;