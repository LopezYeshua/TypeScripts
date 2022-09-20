import React from 'react'
import '../../static/css/avatars.css'
import {
    Box,
    Typography
} from '@mui/material'

const UserNavItem = ({ id, tabName, activeTab, setActiveTab }) => {


    const containerHover = {
        "&:hover": {
            backgroundColor: "lightblue",
            cursor: "pointer"
        }
    }
    const handleTab = () => {
        setActiveTab(id)
    }

    const donthandleTab = () => {
        setActiveTab("")
    }

    return (
        <Box
            sx={containerHover}
            onClick={handleTab}
            className={`
            ${activeTab === id ? "active" : ""}`}>
            <Typography 
            variant="h4">{tabName}</Typography>
        </Box>
    )
}

export default UserNavItem