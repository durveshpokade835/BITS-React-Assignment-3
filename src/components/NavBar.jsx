import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { useState } from "react";

const NavBar = () => {
    const navigator = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const handleLogOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isAuthenticated");
        navigator("/");
    }
    return (

        <Navbar bg="dark" data-bs-theme="dark" className='nav'>
            <Container>

                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                    {/* <Nav.Link as={NavLink} to="/dashboard">DashBoard</Nav.Link> */}
                </Nav>
                {isLoggedIn && <Button variant="light" onClick={handleLogOut}>Logout</Button>}
            </Container>
        </Navbar>

    )
}

export default NavBar
