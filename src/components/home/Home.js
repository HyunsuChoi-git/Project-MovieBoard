
import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';


let StyledDeleteButton = styled.button`
    color : ${(props) => props.user.name === 'hera' ? 'blue' : 'black'};
`;
let StyledAddButton = styled(StyledDeleteButton)`
    background-color: beige;
`;


const Home = (props) => {

    //구조분할할당
    const { boards, setBoards, user} = props;

    return (
        <div>
          <Button variant="primary">Primary</Button>{' '}
          <StyledAddButton user={user} onClick={() => setBoards([...boards, {id:4,title:' 제목4',content:'내용4'}])}>더하기</StyledAddButton>
          <StyledDeleteButton user={user} onClick={() => setBoards([])}>전체삭제</StyledDeleteButton>
          {boards.map((board)=>(
            <h3 key={board.id}>제목: {board.title}, 내용: {board.content} </h3>
          ))}
        </div>
    );
};

export default Home;