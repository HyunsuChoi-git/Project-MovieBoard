import React, { useEffect, useState } from 'react';
import MovieItem from '../../components/MovieItem';
import styled from "styled-components";


const StyledItemDiv = styled.div`
    display: inline-flexbox;
    margin-left: 0.5em;
    margin-top: 1em;

`;

const StyledContainerDiv = styled.div`
    text-align: center;
`;

const Home = () => {


    const [moives, setMovies] = useState([])

    useEffect(()=> {
        fetch('http://localhost:8080/movie', {  method : "GET" })
            .then(res=>res.json())
            .then(res=>{
                console.log(1, res);
                setMovies(res);
            });              
    }, []);

    return (
        <StyledContainerDiv>
            {moives.map((movie)=>(
                <StyledItemDiv>
                    <MovieItem key={movie.id} movie={movie}/>
                </StyledItemDiv>
            ))}
        </StyledContainerDiv>        
    );
};

export default Home;