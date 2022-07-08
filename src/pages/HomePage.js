import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Home from '../components/home/Home';


// http 요청 시 사용하는 것 
/*
    1. jquary, ajax : (외부라이브러리) react에서 못씀 
    2. fetch : 순수 자바스크립트 함수
    3. axios : (외부라이브러리) 가장 인기많음
*/

/*
    props : 데이터를 자식에게 넘기는 것. 속성(변수)을 패싱하는 기법
            함수도 넘길 수 있음!

            자식에서 부모로 데이터를 넘길 수는 없움. data flow는 부모 ---> 자식 으로 흐른다.
*/

const HomePage = () => {


    const [boards, setBoards] = useState([]);
    const [number, setNumber] = useState(0);

    useEffect(() => {
        // DB에서 데이터를 가져왔다고 가정 => 
        let data = [
            {id:1, title:"제목1", content:"내용1"},
            {id:2, title:"제목2", content:"내용2"},
            {id:5, title:"제목4", content:"내용3"},

        ]

        // 비동기로 동작하는 환경이므로 data가 다 넘어오기 전까지 boards에는 빈 값이 들어간다.
        // 그리고 데이터가 다넘어와서 아래 setBoards가 실행되면 boards 상태가 변경되면서 다시 랜더링 된다.
        // 그렇기 때문에 데이터를 가져와 화면에 그리는 작업일 경우에 그 데이터 변수는 항상 **상태값이어야 한다.
        // 일반변수일 경우 빈데이터로 처음 로드되고.. 나중에 값이 바뀌어도 상태값이 아니므로 랜더링되지 않는다.

        setBoards([...data]);
    }, [])


    return (
        <div>
            <Header />
            <Home boards={boards} setBoards={setBoards} number={number} setNumber={setNumber}/>
            <Footer />
        </div>
    );
};

export default HomePage;