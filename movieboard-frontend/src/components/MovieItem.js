import React, { useState } from 'react';
import { Card, ListGroup, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Detail from '../pages/movie/Detail';


const StyledItemDiv = styled.div`
    display: inline-flexbox;
    margin-left: 0.5em;
    margin-top: 1em;

`;

const StyledCardText = styled(Card.Text)`
    margin-bottom : 0;
`;
const StyledLink = styled(Button)`
    height: 32px;
    margin-top: 4px;
    padding-top: 2px;
`;

const MydModalWithGrid = (props) => {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Using Grid in Modal
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">

            <Detail id = {props.id}/>

            </Modal.Body>
            <Modal.Footer>
                <Link to={'/updateForm'} className='btn btn-primary'>수정</Link>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};


const MovieItem = (props) => {

    const { id, title, director, photo, genre, grade } = props.movie;
    const src = process.env.PUBLIC_URL+"/image/";

    const [modalShow, setModalShow] = useState(false);

    return (
        <StyledItemDiv>
            <Card style={{ width: '15rem', height:'25rem'}}>
                <Card.Img variant="top" src={src+photo} alt="Movie img" height={260}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <StyledCardText>감독 : {director} l 장르 : {genre}</StyledCardText>
                    <StyledCardText>평점 : {[...Array(parseInt(grade/2))].map((n, index) => {
                            return (<FontAwesomeIcon icon={faStar} key={index}/>)})}
                            { grade%2 === 1 && (<FontAwesomeIcon icon={faStarHalf} />) }
                            ㅣ{grade}
                    </StyledCardText>
                    {/* <StyledLink to={'/moive/'+id} className='btn btn-secondary'>more</StyledLink> */}
                    <StyledLink variant="primary" onClick={() => setModalShow(true)}>
                    more
                    </StyledLink>

                    <MydModalWithGrid show={modalShow} id={id} onHide={() => setModalShow(false)} />
                </Card.Body>
            </Card>
        </StyledItemDiv>

    );
};

export default MovieItem;