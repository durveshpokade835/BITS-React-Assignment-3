import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";

const data = { email: "demo@gmail.com", password: "demo123" };

const Login = () => {
    const navigator = useNavigate();
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevLoginData) => ({
            ...prevLoginData,
            [name]: value,
        }));
        setIsLoggedIn(true);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const storedEmail = data.email;
        const storedPassword = data.password;
        if (
            storedEmail === loginData.email &&
            storedPassword === loginData.password
        ) {
            localStorage.setItem("isAuthenticated", "authenticated");
            navigator("/DashBoard");
        } else {
            alert('Enter Valid Credentials')
        }
    };


    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={loginData.email}
                        onChange={(e) => handleInputChange(e)} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={loginData.password}
                        onChange={(e) => handleInputChange(e)} />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
};

export default Login
