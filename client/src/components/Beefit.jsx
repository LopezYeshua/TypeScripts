import React, { useState, useContext } from 'react'
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
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { LoggedinContext } from '../context/LoggedinContext'

const Beefit = () => {
    const { roomID } = useParams()
    const [socket] = useState(() => io(':8000'))
    const theme = useTheme()
    const { loggedinInfo } = useContext(LoggedinContext)
    const id = loggedinInfo.loggedinId
    const [user, setUser] = useState()
    const [opponentProgress, setOpponentProgress] = useState(0)
    const [p2Loaded, setp2Loaded] = useState(false)
    console.log(id)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/scores/userScores/${id}`)
            .then(res => {
                setUser(res.data.user[0])
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {

        socket.on('all users connected', (loaded) => {
            setp2Loaded(loaded) 
        })

        socket.emit("user connected", {

        })

        socket.emit("host room", roomID)

        return () => socket.disconnect(true)
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            <Box sx={{ width: "100vw" }}>
                <Container sx={{ marginTop: "1em" }}>
                    <Paper>
                        <TypingSim psLoaded={p2Loaded} opponentProgress={opponentProgress} />
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default Beefit