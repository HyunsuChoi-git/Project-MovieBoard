import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

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
        <div>
            {/* <StyledHeaderDiv backgroundColor='skyblue'>
                <ul>
                    <li>
                        <StyledHeaderLink to='/'>HOME</StyledHeaderLink>    
                    </li>
                    <li>
                        <StyledHeaderLink to='/login/10'>LOGIN</StyledHeaderLink>
                    </li>
                </ul>
            </StyledHeaderDiv> */}
            <Navbar bg="light" variant="light">
                <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                {/* <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                <Link to="/" className="nav-link">HOME</Link>
                <Link to="/login" className="nav-link">LOGIN</Link>
                </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;