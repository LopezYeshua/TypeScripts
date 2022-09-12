import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { 
    TextField,
    Paper,
    Typography,
    Box,
    Button,
    Grid
} from '@mui/material'
import axios from 'axios';
import { LoggedinContext } from '../context/LoggedinContext'
import jwt from 'jwt-decode'

const RegisterForm = (props) => {
    const {setLoggedinInfo} = useContext(LoggedinContext)
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
            confirmPassword: user.confirmPassword
        }, { withCredentials: true })
        .then(res => {
            console.log(res.data)
            const token = res.data.userToken;
            console.log(jwt(token))

            // sets the login info of the user through the context
            setLoggedinInfo({
                loggedin: true,
                loggedinId: res.data.user_id,
                loggedInUsername: res.data.user.username,
                loadingUser: false
            })
            navigate("/dashboard")
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
            ...user, [e.target.name]: e.target.value
        })
    }

    return (
            <Paper elevation={5}>
                <Box sx={{padding: "1em"}}>
                    <form onSubmit={ createUser }>
                    {errors.map((err, index) => 
                    <Typography key={index} mb={2} px={1} sx={{backgroundColor: "#fff0f0", 
                                                        border: "2px solid red",
                                                        borderRadius: ".3rem"}}>
                        {err}
                    </Typography>)}
                        <Grid 
                        container 
                        spacing={2}
                        alignItems="flex-end"
                        >
                            <Grid
                            item >
                                <TextField 
                                variant="outlined" 
                                label="username"
                                name="username"
                                onChange={handleChange}
                                
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                variant="outlined"
                                label="email"
                                name="email"
                                onChange={handleChange}
                                value={ user.email }
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                variant="outlined"
                                label="password"
                                name="password"
                                onChange={handleChange}
                                value={ user.password }
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                variant="outlined"
                                label="confirm Password"
                                name="confirmPassword"
                                onChange={handleChange}
                                value={ user.confirmPassword }
                                />
                            </Grid>
                            <Grid item textAlign="bottom">
                                <Button type="submit" variant="outlined">Button</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
    )
}
export default RegisterForm