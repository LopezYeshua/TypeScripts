import * as React from 'react';
import {
    Container,
    Box,
    ThemeProvider,
    useTheme,
} from '@mui/material';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import '../App.css';
import NavBar from '../components/NavBar';
import '../static/css/loginAndReg.css'

const Main = () => {
    const theme = useTheme()
    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            <Container sx={{ marginTop: "80px", padding: "20px 0"}}>
                <Box sx={{textAlign: "center"}}>
                    <h1>Register</h1>
                    <RegisterForm />
                </Box>
                <Container sx={{textAlign: "center", margin: "20px 0"}}>
                    <h1>Login!</h1>
                    <LoginForm />
                </Container>
            </Container>
        </ThemeProvider>
    )
}

export default Main