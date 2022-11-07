import React, { useState, useContext } from 'react'
import {
    Grid,
    TextField,
    Container,
    Button,
    Paper
} from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LoggedinContext } from '../context/LoggedinContext'
import '../static/css/loginAndReg.css'

const LoginForm = () => {
    const { setLoggedinInfo } = useContext(LoggedinContext)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState(false)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', {
            email: user.email,
            password: user.password
        }, { withCredentials: true })
            .then(res => {
                console.log(res.data.user.username)
                const token = res.data.userToken
                setLoggedinInfo({
                    loggedin: true,
                    loggedinId: res.data.user._id,
                    loggedinUsername: res.data.user.username,
                    loadingUser: false
                })
                navigate("/")
            })
            .catch(err => setErrors(true))
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleGuestLogin = () => {
        axios.post('http://localhost:8000/api/login', {
            email: "guest@email.com",
            password: "password123"
        }, { withCredentials: true })
            .then(res => {
                console.log(res.data.user.username)
                const token = res.data.userToken
                setLoggedinInfo({
                    loggedin: true,
                    loggedinId: res.data.user._id,
                    loggedinUsername: res.data.user.username,
                    loadingUser: false
                })
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Container sx={{ display: "flex", flexDirection: "column" }}>
            <span className={errors.length >= 1 ? "errMsg" : null}>
                {errors ? 
                <p className="errMsg">Username or password is incorrect. Please try again.</p> 
                : 
                null}
            </span>
            <form onSubmit={handleLogin}>
                <Grid container>
                    <Grid item>
                        <TextField
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            label="email" />
                    </Grid>
                    <Grid item>
                        <TextField
                            type="password"
                            name="password"
                            onChange={handleChange}
                            label="password" />
                    </Grid>
                </Grid>
                <Button type="submit" variant="outlined">Login</Button>
            </form>
            <Button
                sx={{ marginTop: "20px" }}
                onClick={handleGuestLogin}
                variant="outlined"
                type="submit">Sign in with guest profile</Button>
        </Container>
    )
}
export default LoginForm