import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieItem = (props) => {

    const { id, title, director } = props.movie;

    return (
        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Link to={'/movie/'+id} className='btn btn-primary' variant='primary' >자세히</Link>
            </Card.Body>
        </Card>
    );
};

export default MovieItem;