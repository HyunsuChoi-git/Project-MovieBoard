import React from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled(Navbar)`
    background-color: snow;
`;

const StyledName = styled(Link)`
    font-size: x-large;
    font-weight: bold;
`;

const Header = () => {
    return (
        <StyledContainer variant="light">
            <Container>
                <StyledName to='/' className='navbar-brand'>무빙</StyledName>
                <Nav className="me-auto">
                    <Link to='/loginForm' className='nav-link'>LOGIN</Link>
                    <Link to='/joinForm' className='nav-link'>JOIN</Link>
                    <Link to='/addForm' className='nav-link'>ADD</Link>
                </Nav>
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>`
            </Container>
        </StyledContainer>
    );
};

export default Header;