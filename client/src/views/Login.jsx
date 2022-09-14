import * as React from 'react';
import {
    Container,
    Typography,
    ThemeProvider,
    useTheme,
    Link
} from '@mui/material';
import {
    Link as RouterLink
} from 'react-router-dom'
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import '../App.css';

const Main = () => {
    const theme = useTheme()
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Typography variant="h4"><Link component={RouterLink} to="/">TypeScripts</Link></Typography>
                <Container sx={{textAlign: "center"}}>
                    <h1>Register</h1>
                    <RegisterForm />
                </Container>
                <Container sx={{textAlign: "center"}}>
                    <h1>Login!</h1>
                    <LoginForm />
                </Container>
            </Container>
        </ThemeProvider>
    )
}

export default Main