import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import {
    TextField,
    Button,
    Container
} from '@mui/material'
import axios from 'axios';
import { LoggedinContext } from '../context/LoggedinContext'
import ErrorIcon from '@mui/icons-material/Error';
import { useEffect } from 'react';

const RegisterForm = () => {
    const { setLoggedinInfo } = useContext(LoggedinContext)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

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
                    loggedinId: res.data.user._id,
                    loggedinUsername: res.data.user.username,
                    loadingUser: false
                })
                navigate("/")
                // sets the login info of the user through the context
            })
            .catch(err => {
                const errorResponse = err.response.data.errors
                const errorArr = []
                if (!errorResponse) {
                    errorArr.push("Email already exists")
                    setErrors(errorArr)
                }
                else {
                    for (const key in errorResponse) {
                        errorArr.push(errorResponse[key].message)
                    }
                    setErrors(errorArr)
                }
            })
    }

    useEffect(() => {
        console.log(errors)
        console.log(errors.length)
    }, [errors])

    const handleChange = e => {
        setUser({
            ...user,
            icon: "smiley",
            [e.target.name]: e.target.value
        })
    }

    return (
        <Container>
            <span className={errors.length >= 1 ? "errMsg" : null}>
                {errors.length >= 1 ? errors.map((error, index) => {
                    return (
                        <p>
                            <p>{error}</p>
                        </p>
                    )
                    }) : null}
            </span>
            <form className="form-width" onSubmit={createUser}>
                    <TextField
                        variant="outlined"
                        label="username"
                        name="username"
                        autoComplete="off"
                        value={user.username}
                        onChange={handleChange} />
                    <TextField
                        label="email"
                        name="email"
                        onChange={handleChange}
                        value={user.email}
                    />
                {errors[0] === "Email already exists" ? (
                    <span className="email-err-msg">
                        <ErrorIcon/>
                        <p>{errors}</p>
                    </span>
                ) : null}
                    <TextField
                        label="password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={user.password}
                    />
                    <TextField
                        label="confirm Password"
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={user.confirmPassword}
                    />
                <Button type="submit" variant="outlined">Register</Button>
            </form>
        </Container>
    )
}
export default RegisterForm