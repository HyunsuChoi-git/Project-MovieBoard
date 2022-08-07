import React, { useEffect, useMemo, useState } from 'react';
import MovieItem from '../../components/MovieItem';
import styled from "styled-components";



const StyledContainerDiv = styled.div`
    text-align: center;
    margin: 0 auto;
`;

const Home = (props) => {

    const { keyword } = props;
    const [moives, setMovies] = useState([]);   // 원데이터
    const [moiveList, setMovieList] = useState([]); // 화면에 뿌릴 데이터

    useEffect(()=> {
        fetch('http://localhost:8080/movie', {  method : "GET",})
            .then(res=>res.json())
            .then(res=>{
                setMovies(res);
                setMovieList(res);
            });              
    }, []);

    useMemo(()=>{
        if (!(keyword === '' || keyword === undefined)) {
            console.log("키워드");
            const  keywordMovieList = moives.filter((c) => {
                return c.title.indexOf(keyword) > -1;});
                setMovieList(keywordMovieList); // 키워드에 추출된 건만 화면에 뿌릴 데이터에 넣어줌
        }else{
            setMovieList(moives);   // 원데이터를 화면에 뿌릴 데이터에 넣어줌
        }

    },[keyword]);


    return (
        <StyledContainerDiv>
            {moiveList.map((movie)=>(
                <MovieItem key={movie.id} movie={movie}/>
            ))}
        </StyledContainerDiv>        
    );
};

export default Home;