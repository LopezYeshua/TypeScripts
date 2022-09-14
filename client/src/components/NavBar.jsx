import React, { useContext, useState } from 'react'
import {
    Link as LinkRouter, useNavigate
} from 'react-router-dom'
import { 
    Typography,
    Button,
    ThemeProvider,
    Container,
    Link
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Logout from './Logout'
import { LoggedinContext } from '../context/LoggedinContext'
import '../static/css/NavBar.css'

const NavBar = (props) => {
    const [login, setLogin] = useState(false)
    const {loggedinInfo} = useContext(LoggedinContext)
    const navigate = useNavigate()
    const theme = useTheme()
    const handleClick = () => {
        setLogin(true)
        props.login( login )
        navigate('/login')
    }

    
    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ justifyContent: "space-between", display: "flex", marginTop: "10px"}}>
                <Link component={LinkRouter} to="/">
                    <Typography
                    gutterBottom={false}
                    variant="h5">
                        We Scripts
                    </Typography>
                </Link>
                {loggedinInfo.loggedin ? 
                <Logout /> : 
                <Button onClick={handleClick}>Login</Button>}
            </Container>
        </ThemeProvider>
    )
}

export default NavBar