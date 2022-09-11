import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Grid,
    Container,
    Paper,
    Typography
} from '@mui/material'
import Posts from '../components/Posts'
import NavBar from '../components/NavBar'
import { LoggedinContext } from '../context/LoggedinContext'
import { useEffect } from 'react'

export default () => {
    const {loggedinInfo} = useContext(LoggedinContext)
    const navigate = useNavigate()
    
    
    
    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate("/")
            return
        }
    })
    return (
        
        <>
            <NavBar />
            <Grid container spacing={5} sx={{ justifyContent: "center" }}>
                <Grid item>
                    <Paper elevation={7} sx={{ marginBottom: "150px" }} className="dashboardContainers">
                        <Typography variant="h1">👍</Typography>
                    </Paper>
                    <Paper elevation={7} className="dashboardContainers">
                        <Typography variant="h1">💩</Typography>
                    </Paper>
                </Grid>
                <Grid item sx={{ margin: "auto 0" }}>
                    <Paper elevation={7} className="postContainer">
                        <Posts />
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}