import React from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Link to='/' className='navbar-brand'>무빙</Link>
                    <Nav className="me-auto">
                        <Link to='/loginForm' className='nav-link'>LOHIN</Link>
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
            </Navbar>
        </div>
    );
};

export default Header;