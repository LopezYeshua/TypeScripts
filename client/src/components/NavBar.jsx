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
    ButtonGroup
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

    const hostBeef = (e, userId) => {
        e.preventDefault()
        
    }

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ justifyContent: "space-between", display: "flex" }}>
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
                <ThemeToggler />
                <ButtonGroup>
                    <Button variant="outlined" onClick={togglePopup}>Beefit!</Button>
                    {loggedinInfo.loggedin ?
                        <Logout /> :
                        <Button onClick={handleClick}>Login</Button>}
                </ButtonGroup>
                <BeefitContent togglePopup={togglePopup} isVisible={isVisible} />
            </Container>


        </ThemeProvider>
    )
}

export default NavBar