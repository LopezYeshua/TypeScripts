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
    Box
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Logout from './Logout'
import { LoggedinContext } from '../context/LoggedinContext'
import '../static/css/NavBar.css'
import ThemeToggler from './ThemeToggler'

const NavBar = (props) => {
    const { loggedinUsername } = props
    const [login, setLogin] = useState(false)
    const {loggedinInfo} = useContext(LoggedinContext)
    const navigate = useNavigate()
    const theme = useTheme()

    const handleClick = () => {
        navigate('/login')
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ justifyContent: "space-between", display: "flex"}}>
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
                {loggedinInfo.loggedin ? 
                <Logout /> : 
                <Button onClick={handleClick}>Login</Button>}
            </Container>
        </ThemeProvider>
    )
}

export default NavBar