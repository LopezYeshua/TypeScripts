import React, { useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    Paper,
    Box,
    ThemeProvider,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import NavBar from '../components/NavBar'
import { LoggedinContext } from '../context/LoggedinContext'
import { useEffect } from 'react'
import TypingSim from '../components/TypingSim'
// import TypingSim2 from '../components/TypingSim2'
import '../App.css'
import "../static/css/Dashboard.css"
import Friends from '../components/TabComponents/Friends'
import ThemeToggler from '../components/ThemeToggler'

const Dashboard = () => {
    const { loggedinInfo } = useContext(LoggedinContext)
    const theme = useTheme()
    const [loadLogin, setLoadLogin] = useState(false)

    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            setLoadLogin(false)
        }
    })

    const pleaseLogin = ( isLogin ) => {
        setLoadLogin(isLogin)
    }

    if (!loggedinInfo.loggedin) {
        return (
            <ThemeProvider theme={theme}>
                <NavBar login={pleaseLogin}/>
                <ThemeToggler />
                <Box sx={{ width: "100vw" }}>
                    <Container sx={{ marginTop: "1em" }} >
                        <Paper elevation={10}>
                            <TypingSim />
                        </Paper>
                    </Container>
                </Box>
            </ThemeProvider>
        )
    }


    return (
        <>
            <ThemeProvider theme={theme}>
                <NavBar login={pleaseLogin}/>
                <ThemeToggler />
                <Box sx={{ width: "100vw", height: "" }}>
                    <Container sx={{ marginTop: "1em" }} >
                        <Paper
                            className="friends-people-list"
                            sx={{ margin: "1em 0" }}
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
            </ThemeProvider>
        </>
    )
}

export default Dashboard