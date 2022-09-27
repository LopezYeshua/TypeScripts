import React, { useContext, useState } from 'react'
import {
    Link as LinkRouter, useNavigate
} from 'react-router-dom'
import {
    Typography,
    Button,
    ThemeProvider,
    Container,
    Link,
    ButtonGroup,
    Box
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Logout from './Logout'
import { LoggedinContext } from '../context/LoggedinContext'
import '../static/css/NavBar.css'
import ThemeToggler from './ThemeToggler'
import BeefItPopup from './Popups/BeefItPopup'
import BeefitContent from './Popups/BeefitContent'

const NavBar = (props) => {
    const { loggedinUsername } = props
    const [login, setLogin] = useState(false)
    const { loggedinInfo } = useContext(LoggedinContext)
    const navigate = useNavigate()
    const theme = useTheme()
    const [isVisible, setIsVisible] = useState(false)

    const togglePopup = () => {
        setIsVisible(!isVisible)
    }

    const handleClick = () => {
        navigate('/login')
    }

    // const hostBeef = (e, userId) => {
    //     e.preventDefault()
        
    // }

    const navBar = {
        justifyContent: "space-between",
        display: "flex",
        minWidth: "90vw"
    }

    const navButtonBox = {
        margin: "auto 0",
        display: "flex"
    }

    return (
        <ThemeProvider theme={theme}>
            <Container sx={navBar}>
                <Link component={LinkRouter} to="/">
                    <Typography
                        gutterBottom={false}
                        variant="h5">
                        WeScripts
                    </Typography>
                    <Typography>
                        Welcome {loggedinUsername}
                    </Typography>
                </Link>
                <Box sx={navButtonBox}>
                    <ThemeToggler />
                    <ButtonGroup>
                        <Button variant="contained" onClick={togglePopup}>Beefit!</Button>
                        {loggedinInfo.loggedin ?
                            <Logout /> :
                            <Button variant="contained" onClick={handleClick}>Login</Button>}
                    </ButtonGroup>
                </Box>
                <BeefitContent togglePopup={togglePopup} isVisible={isVisible} />
            </Container>


        </ThemeProvider>
    )
}

export default NavBar