import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    Paper,
    Box
} from '@mui/material'
import NavBar from '../components/NavBar'
import { LoggedinContext } from '../context/LoggedinContext'
import { useEffect } from 'react'
import TypingSim from '../components/TypingSim'
// import TypingSim2 from '../components/TypingSim2'
import '../App.css'
import "../static/css/Dashboard.css"
import Friends from '../components/TabComponents/Friends'

const Dashboard = () => {
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
            <Box sx={{ width: "100vw"}}>
                    <Container sx={{ marginTop: "1em"}} >
                        <Paper 
                            className="friends-people-list"
                            sx={{ margin: "1em 0"}}
                            elevation={10}>
                                <Friends />
                        </Paper>
                        <Paper elevation={10}>
                            <TypingSim />
                        </Paper>
                        {/* <Paper elevation={10}>
                            <TypingSim2 />
                        </Paper> */}
                    </Container>
            </Box>
        </>
    )
}

export default Dashboard