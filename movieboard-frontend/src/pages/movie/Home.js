import React, { useEffect, useState } from 'react';
import MovieItem from '../../components/MovieItem';
import styled from "styled-components";



const StyledContainerDiv = styled.div`
    text-align: center;
    margin: 0 auto;
`;

const Home = () => {


    const [moives, setMovies] = useState([]);

    useEffect(()=> {
        fetch('http://localhost:8080/movie', {  method : "GET" })
            .then(res=>res.json())
            .then(res=>{
                setMovies(res);
            });              
    }, []);

    return (
        <StyledContainerDiv>
            {moives.map((movie)=>(
                <MovieItem key={movie.id} movie={movie}/>
            ))}
        </StyledContainerDiv>        
    );
};

export default Home;