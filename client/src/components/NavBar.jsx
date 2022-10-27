import React, { useContext, useState } from 'react'
import {
    Link as LinkRouter, useNavigate
} from 'react-router-dom'
import {
    AppBar,
    Typography,
    Button,
    ThemeProvider,
    Link,
    ButtonGroup,
    Box,
    Container,
    Toolbar,
    Menu
} from '@mui/material'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material/styles'
import Logout from './Logout'
import { LoggedinContext } from '../context/LoggedinContext'
import ThemeToggler from './ThemeToggler'
import BeefitContent from './Popups/BeefitContent'
import '../static/css/NavBar.css'

const NavBar = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [anchorElNav, setAnchorElNav] = useState(null)

    const { loggedinInfo } = useContext(LoggedinContext)
    const navigate = useNavigate()
    const theme = useTheme()

    const togglePopup = () => {
        setIsVisible(!isVisible)
    }

    const handleClick = () => {
        navigate('/login')
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const styleIcon = {
        display: {
            xs: 'none',
            md: 'flex'
        },
        mr: 1
    }

    const shortNav = {
        flexGrow: 1,
        zIndex: 1,
        display: {
            xs: 'flex',
            md: 'none'
        },
        justifyContent: "space-between"
    }

    const longNav = {
        position: "inherit",
        flexGrow: 1,
        display: {
            xs: 'none',
            md: 'flex'
        },
        justifyContent: 'end'
    }

    const longLogo = {
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        color: 'inherit',
    }

    const shortLogo = {
        mt: 1,
        mr: 2,
        ml: 6,
        fontWeight: 700,
        display: { xs: 'flex', md: 'none' },
        color: 'inherit',
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar elevation="0" className="navBar" position="">
                <Box>
                    <Toolbar className="navBarContent">
                        <Link className="navBarItem" sx={styleIcon} component={LinkRouter} to="/">
                            <Typography
                                sx={longLogo}
                                variant="h4"
                            >
                                WeScripts
                            </Typography>
                        </Link>

                        <Box sx={shortNav}>
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                    zIndex: 0
                                }}
                            >
                                <ThemeToggler />
                                <Button variant="contained" onClick={togglePopup}>Beefit!</Button>
                                {loggedinInfo.loggedin ?
                                    <Logout /> :
                                    <Button variant="contained" onClick={handleClick}>Login</Button>}
                            </Menu>
                        <Link component={LinkRouter} to="/">
                            <Typography
                                sx={shortLogo}
                                variant="h4"
                            >
                                WeScripts
                            </Typography>
                        </Link>
                        </Box>

                        <Box className="navBarItem" sx={longNav}>
                            <ThemeToggler />
                            <ButtonGroup>
                                <Button variant="contained" onClick={togglePopup}>Beefit!</Button>
                                {loggedinInfo.loggedin ?
                                    <Logout /> :
                                    <Button variant="contained" onClick={handleClick}>Login</Button>}
                            </ButtonGroup>
                        </Box>

                        <BeefitContent togglePopup={togglePopup} isVisible={isVisible} />
                    </Toolbar>
                </Box>
            </AppBar>
        </ThemeProvider>
    )
}

export default NavBar