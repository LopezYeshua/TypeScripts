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
import { FallingLines } from 'react-loader-spinner'

const Beefit = () => {
    const { roomID } = useParams()
    const [socket] = useState(() => io(':8000'))
    const theme = useTheme()
    const { loggedinInfo } = useContext(LoggedinContext)
    const id = loggedinInfo.loggedinId
    const [user, setUser] = useState()
    const [opponentProgress, setOpponentProgress] = useState(0)
    const [p2Loaded, setp2Loaded] = useState(false)
    const [welcomeMessage, setWelcomeMessage] = useState("")
    const [statusMessage, setStatusMessage] = useState("")
    const [opponentWpm, setOpponentWpm] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then(res => {
                // set user data equal to the data given by the api
                setUser(res.data)
                // emit that user has joined the room.
                socket.emit("join room", {
                    roomName: roomID,
                    username: res.data.username
                })
            })
            .catch(err => console.log(err))
    }, [])


    useEffect(() => {
        // listen for socket welcome message
        socket.on("welcome message", (message) => {
            setWelcomeMessage(message)
        })

        socket.on('all users connected', (loaded) => {
            setp2Loaded(loaded)
        })

        // socket.on("user connected", (args) => {
        //     console.log(args)
        // })

        socket.on("recieve opponent progress", (p2Progress) => {
            setOpponentProgress(p2Progress)
        })

        socket.on("recieve opponent wpm", (wpm) => {
            setOpponentWpm(wpm)
        })

        socket.on("user disconnected", (args) => {
            console.log(args)
        })


        return () => socket.disconnect(true)
    }, [])

    const centerLoading = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "calc(40vh - 100px)"
    }

    const handleProgress = (progress) => {
        socket.emit("send progress", {
            roomName: roomID,
            progress: progress
        })
    }
    
    const handleWPM = (wpm) => {
        socket.emit("send wpm", {
            roomName: roomID,
            wpm: wpm
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            {p2Loaded ?
                <Box sx={{ width: "100vw" }}>
                    <Container sx={{ marginTop: "1em" }}>
                        <Paper>
                            <TypingSim 
                            p2Loaded={p2Loaded}
                            multiplayer={true}
                            sendWPM={handleWPM}
                            sendProgress={handleProgress}
                            opponentWpm={opponentWpm}
                            opponentProgress={opponentProgress} />
                        </Paper>
                    </Container>
                </Box> :
                <Container sx={centerLoading}>
                    <FallingLines
                        type="audio"
                        height={200}
                        // width={200}
                        color="#90caf9"
                        timeout={1000}
                    />
                    <p>Welome to room {welcomeMessage}. Please wait for opponent</p>
                    <p>{statusMessage}</p>
                </Container>
            }
        </ThemeProvider>
    )
}

export default Beefit