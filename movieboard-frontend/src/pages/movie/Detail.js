import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";



const Detail = (props) => {

    // const propsParam = useParams();
    // const id =  propsParam.id;
    const {id} = props;

    const [ movie, setMovie ] = useState({
        id: '',
        title: '',
        director: '',
        genre: '',
        grade: 0,

    });
    const src = process.env.PUBLIC_URL+"/image/";


    useEffect(() => {
        fetch("http://localhost:8080/movie/"+id, { method : "GET" })
            .then( res => res.json() )
            .then( res => {
                console.log(1, res);
                setMovie(res);
            });
    }, []);


    return (
        <Container>
            <Row>
                <Col xs={12} md={8}>
                .col-xs-12 .col-md-8
                </Col>
                <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
                </Col>
            </Row>

            <Row>
                <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
                </Col>
                <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
                </Col>
                <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
                </Col>
            </Row>
        </Container>

    );
};

export default Detail;<h1>상세보기</h1>