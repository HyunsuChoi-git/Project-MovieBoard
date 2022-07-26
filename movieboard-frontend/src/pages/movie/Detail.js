import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";



const Detail = (props) => {

    const propsParam = useParams();
    const id =  propsParam.id;

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
        <div >
            <h1>상세보기</h1>

 
        </div>
    );
};

export default Detail;<h1>상세보기</h1>