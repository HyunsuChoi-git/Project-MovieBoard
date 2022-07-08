import React from 'react';
import styled from 'styled-components';


const StyledHEaderDiv = styled.div`
    border: 1px solid black;
    height: 300px;
    background-color: ${(props)=>props.backgroundColor};
`

const Header = () => {
    return (
        <StyledHEaderDiv backgroundColor='skyblue'>
            <ul>
                <li>소개</li>
                <li>News</li>
            </ul>
        </StyledHEaderDiv>
    );
};

export default Header;