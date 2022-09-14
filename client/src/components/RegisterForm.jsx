import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { 
    TextField,
    Paper,
    Typography,
    Box,
    Button,
    Container
} from '@mui/material'
import axios from 'axios';
import { LoggedinContext } from '../context/LoggedinContext'
import jwt from 'jwt-decode'
import { useEffect } from 'react';

const RegisterForm = () => {
    const {loggedinInfo, setLoggedinInfo} = useContext(LoggedinContext)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // called from form submission
    const createUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', {
            username: user.username,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            icon: "smiley"
        }, { withCredentials: true })
        .then(res => {
            setLoggedinInfo({
                loggedin: true,
                loggedinId: res.data.user_id,
                loggedInUsername: res.data.user.username,
                loadingUser: false
            })
            console.log(res.data)
            const token = res.data.userToken;
            console.log(jwt(token))

            // navigate("/")
            // sets the login info of the user through the context
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for ( const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message);
            }

            setErrors(errorArr);
        });
    }

    const handleChange = e => {
        setUser({
            ...user,
            icon: "smiley",
            [e.target.name]: e.target.value
        })
    }

    return (
            <Paper elevation={5}>
                <Container>
                    <form onSubmit={ createUser }>
                        {errors.map((err, index) => 
                        <Typography 
                            key={index} 
                            mb={2} 
                            px={1} 
                            sx={{backgroundColor: "#fff0f0", 
                                border: "2px solid red",
                                borderRadius: ".3rem"}}>
                            {err}
                        </Typography>)}
                        <Box>
                            <TextField 
                                variant="outlined" 
                                label="username"
                                name="username"
                                onChange={handleChange}/>
                        </Box>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="email"
                                name="email"
                                onChange={handleChange}
                                value={ user.email }
                                />
                        </Box>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="password"
                                name="password"
                                onChange={handleChange}
                                value={ user.password }
                                />
                        </Box>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="confirm Password"
                                name="confirmPassword"
                                onChange={handleChange}
                                value={ user.confirmPassword }
                                />
                        </Box>
                        <Button type="submit" variant="outlined">Register</Button>
                    </form>
                </Container>
            </Paper>
    )
}
export default RegisterForm