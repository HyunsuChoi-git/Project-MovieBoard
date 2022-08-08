import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { movieRoleLevel } from '../properties/RoleProperties';

const StyledContainer = styled(Navbar)`
    background-color: snow;
`;

const StyledName = styled(Link)`
    font-size: x-large;
    font-weight: bold;
`;

const Header = (props) => {
    const {setKeyword, login} = props;
    const [text, setText] = useState('');
    const [email, setEamil] = useState('');
    const [role, setRole] = useState('');

    useEffect(()=>{
        if(localStorage.getItem('email') !== null){
            setEamil(JSON.parse(localStorage.getItem('email')));
        }else{
            setEamil('');
        }
        if(localStorage.getItem('role') !== null){
            setRole(JSON.parse(localStorage.getItem('role')));
        }else{
            setRole('');
        }
        
    }, [login]);

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
                    { email === '' &&
                        <Link to='/loginForm' className='nav-link'>LOGIN</Link> }
                    { email === '' &&
                        <Link to='/joinForm' className='nav-link'>JOIN</Link> }
                    { email !== '' &&
                        <Link to='/modifyForm' className='nav-link'>MY PAGE</Link> }
                    { email !== '' &&
                        <Link to='/logout' className='nav-link'>LOGOUT</Link> }
                    { ( email !== '' && movieRoleLevel.includes(role) ) &&
                        <Link to='/addForm' className='nav-link'>ADD</Link> }

                    {/* <Link to='/loginForm' className='nav-link'>LOGIN</Link>
                    <Link to='/joinForm' className='nav-link'>JOIN</Link> 
                    <Link to='/logout' className='nav-link'>LOGOUT</Link> */}
                    
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