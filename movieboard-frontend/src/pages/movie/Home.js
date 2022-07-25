import React, { useEffect, useState } from 'react';
import MovieItem from '../../components/MovieItem';

const Home = () => {

    const [moives, setMovies] = useState([])

    useEffect(()=> {
        fetch('http://localhost:8080/movie', {
            method : "GET"
        }).then(res=>res.json()).then(res=>{
            console.log(1, res);
            setMovies(res);
        })              
        // JS 비동기 함수 fetch => 요청하는 것. 이때 IO 통신이 일어남. 페이지 로딩 속도와 IO통신 속도가 맞지 않기 떄문에
        // 첫번째 then에 빈깡통을 넣어서 일단 페이지 로드를 계속 진행하고,
        // 데이터가 다 넘어오면 두번재 then에 데이터 넣어둠.
        // 페이지 로드가 완료된 후 두번째 then에 데이터가 있으면 다시 랜더링이 일어남.
    }, []);

    return (
        <div>
            {moives.map((movie)=>(
                <MovieItem key={movie.id} movie={movie}/>
            ))}
        </div>
    );
};

export default Home;