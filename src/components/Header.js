import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const StyledHeaderDiv = styled.div`
    border: 1px solid black;
    height: 300px;
    background-color: ${(props)=>props.backgroundColor};
`;

const StyledHeaderLink = styled(Link)`
    background-color: beige;
`;

const Header = () => {
    return (
        <StyledHeaderDiv backgroundColor='skyblue'>
            <ul>
                <li>
                    <StyledHeaderLink to='/'>HOME</StyledHeaderLink>    
                </li>
                <li>
                    <StyledHeaderLink to='/login/10'>LOGIN</StyledHeaderLink>
                </li>
            </ul>
        </StyledHeaderDiv>

        
    );
};

export default Header;