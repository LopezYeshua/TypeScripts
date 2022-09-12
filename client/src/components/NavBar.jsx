import React, { useContext } from 'react'
import {
    Link
} from 'react-router-dom'
import { 
    Typography
} from '@mui/material'
import Logout from './Logout'
import { LoggedinContext } from '../context/LoggedinContext'
import '../static/css/NavBar.css'

const NavBar = () => {
    const {loggedinInfo} = useContext(LoggedinContext)

    if (!loggedinInfo.loggedin) {
        return (
            <nav>
                <h1>Type Scripts</h1>
            </nav>
        )
    }
    
    return (
        <nav className="navbar">
            <Link to="/dashboard">
                <Typography
                gutterBottom={false}
                variant="p"
                    sx={{ fontFamily: 'rubik',
                    fontSize: "2vw"}}>Type Scripts</Typography>
            </Link>
            <Logout />
        </nav>
    )
}

export default NavBar