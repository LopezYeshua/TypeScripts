import * as React from 'react';
import {
    Container
} from '@mui/material';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import '../App.css';
import NavBar from '../components/NavBar';

const Main = () => {
    return (
        <Container>
            <NavBar />
            <Container sx={{textAlign: "center"}}>
                <h1>Register</h1>
                <RegisterForm />
            </Container>
            <Container sx={{textAlign: "center"}}>
                <h1>Login!</h1>
                <LoginForm />
            </Container>
        </Container>
    )
}

export default Main