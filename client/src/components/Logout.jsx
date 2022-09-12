import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoggedinContext } from '../context/LoggedinContext'
import {
    Button
} from '@mui/material'


const Logout = () => {
    const navigate = useNavigate()
    const {setLoggedinInfo} = useContext(LoggedinContext)

    const logout = (e) => {
        axios.get('http://localhost:8000/api/logout', {withCredentials: true})
        .then(res => {
            setLoggedinInfo({
                loggedin: false,
                loggedinId: null,
                loggedinUsername: null,
                loadingUser: false
            })
            navigate("/")
        })
        .catch(err => console.log(err))
    }

    return (
        <Button onClick={logout}>Logout</Button>
    )
} 
export default Logout