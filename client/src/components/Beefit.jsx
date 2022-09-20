import React, { useState } from 'react'
import { useEffect } from 'react'
import io from 'socket.io-client'
import {
    ThemeProvider,
    useTheme,
    Container,
    Paper,
    Box
} from '@mui/material'
import TypingSim from './TypingSim'
import NavBar from './NavBar'

const Beefit = () => {
    const [socket] = useState(() => io(':8000'))
    const theme = useTheme()

    useEffect(() => {
        console.log("is this running?")
        socket.on('Welcome', data => console.log(data))

        return () => socket.disconnect(true)
    }, [])
    
    return (
        <ThemeProvider theme={theme}>
            <NavBar/>
            <Box sx={{ width: "100vw"}}>
                <Container sx={{ marginTop: "1em" }}>
                    <Paper>
                        <TypingSim />
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default Beefit