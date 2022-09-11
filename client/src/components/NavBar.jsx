import React, { useContext } from 'react'
import {
    Link
} from 'react-router-dom'
import { 
    Button
} from '@mui/material'
import Logout from './Logout'
import { LoggedinContext } from '../context/LoggedinContext'

export default () => {
    const {loggedinInfo} = useContext(LoggedinContext)

    if (!loggedinInfo.loggedin) {
        return (
            <nav>
                <h1>Type Scripts</h1>
            </nav>
        )
    }
    
    return (
        <nav>
            <Link to="/dashboard"><h1>Type Scripts</h1></Link>
            <Logout />
        </nav>
    )
}