import React, { useState, useContext } from 'react'
import {
    Grid,
    TextField,
    Container,
    Button
} from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LoggedinContext } from '../context/LoggedinContext'

const LoginForm = () => {
    const {setLoggedinInfo} = useContext(LoggedinContext)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', {
            email: user.email,
            password: user.password
        }, { withCredentials: true })
        .then(res => {
            console.log(res.data)
            const token = res.data.userToken
            setLoggedinInfo({
                loggedin : true,
                loggedinId : res.data.user._id,
                loggedinUsername : res.data.user.username,
                loadingUser : false
            })
            navigate("/dashboard")
        })
        .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <>
            <Container sx={{display: "flex", justifyContent: "center"}}> 
                <form onSubmit={handleLogin}>
                    <Grid container>
                        <Grid item>
                            <TextField
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            label="email"/>
                        </Grid>
                        <Grid item>
                            <TextField 
                            name="password"
                            onChange={handleChange}
                            label="password"/>
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="outlined">Login</Button>
                </form>
            </Container>
        </>
    )
}
export default LoginForm