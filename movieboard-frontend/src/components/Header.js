import React, { useState } from 'react';
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

const Header = (props) => {
    const {setKeyword} = props;
    const [text, setText] = useState('');

    // home으로 이동 시 Search Text 비워주기, MovieList초기화
    const handleSearchValue = (e) => {
        setKeyword(undefined);
        setText('');
    }
    // Search Text 
    const handleValueChnage = (e) => {
        setText(e.target.value);
        setKeyword(e.target.value);
    }
    // 조회버튼 클릭 시 Search Text 비워주기
    const handleSubmit = (e) => {
        e.preventDefault();
        setText('');
    } 

    return (
        <StyledContainer variant="light">
            <Container>
                <StyledName to='/' className='navbar-brand' onClick={handleSearchValue}>무빙</StyledName>
                <Nav className="me-auto">
                    <Link to='/loginForm' className='nav-link'>LOGIN</Link>
                    <Link to='/joinForm' className='nav-link'>JOIN</Link>
                    <Link to='/addForm' className='nav-link'>ADD</Link>
                </Nav>
                <Form className="d-flex" onSubmit={handleSubmit}>
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={text}
                    onChange={handleValueChnage}/>
                    <Button variant="outline-success" type="submit">Search</Button>
                </Form>`
            </Container>
        </StyledContainer>
    );
};

export default Header;