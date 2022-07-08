import React from 'react';


const Home = (props) => {
    console.log(props);
    console.log(props.boards);

    //구조분할할당
    const { boards, setBoards, number, setNumber } = props;
    // { } 내부에, 넘어온 props명을 변수명으로 명시해주면 알아서 props내부에 있는 해당 데이터가 {}에 명시한 변수에 들어간다. {}내부는 ','로 복수개 가능

    return (
        <div>
          <h1>홈: {number}</h1>
          <button onClick={() => setNumber(number+1)}>번호 증가</button>
          <button onClick={() => setBoards([])}>전체삭제</button>
          {boards.map((board)=>(
            <h3>제목: {board.title}, 내용: {board.content} </h3>
          ))}
        </div>
    );
};

export default Home;