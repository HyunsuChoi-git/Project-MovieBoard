import React from 'react';
import styled from 'styled-components';


let StyledDeleteButton = styled.button`
color : ${(props) => props.user.name === 'hera' ? 'blue' : 'yellow'};
`;


const Home = (props) => {
    console.log(props);
    console.log(props.boards);

    //구조분할할당
    const { boards, setBoards, user, setUser} = props;

    return (
        <div>
          <StyledDeleteButton user={user} onClick={() => setUser({...user, name:'su'})}>전체삭제</StyledDeleteButton>
          {boards.map((board)=>(
            <h3>제목: {board.title}, 내용: {board.content} </h3>
          ))}
        </div>
    );
};

export default Home;