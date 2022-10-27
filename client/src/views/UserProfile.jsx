import {
    Container, Typography,
    Grid,
    Box,
    Paper
} from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {
    useParams
} from 'react-router-dom'
import NavBar from '../components/NavBar'
import '../static/css/UserProfile.css'
import BarChart from '../components/GraphComponents/BarChart'
import LineChart from '../components/GraphComponents/LineChart'
import images from '../static/images'

const UserProfile = () => {
    const [user, setUser] = useState()
    const [perDayData, setPerDayData] = useState({
        wpm: 0,
        interval: 0
    })
    const { id } = useParams()


    useEffect(() => {
        axios.get(`http://localhost:8000/api/scores/userScores/${id}`)
            .then(res => {
                const dataa = []
                setUser(res.data.user[0])
                res.data.user[0].scores.map((score, index) => {
                    dataa.push({
                        interval: index + 1,
                        wpm: score.wpm
                    })
                })
                setPerDayData(dataa)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log(perDayData)
    })

    return (
        <Box sx={{ width: "100vw" }}>
            <NavBar />
            <div className="user-profile">

                <Container className="user-nav">
                    <h2>
                        {user?.username}
                    </h2>
                    <Box className="iconBox">
                        <img src={images[user?.icon]} className="user-icon" alt="icon" />
                    </Box>
                    <p>User Since: {user?.createdAt}</p>
                </Container>

                <Box className="user-data">
                    {user?.scores.length >= 1 &&
                        <>
                            {/* <LineChart data={perDayData}/> */}
                            <BarChart data={perDayData} />
                        </>
                    }
                    <Typography variant="h5">Recent Scores</Typography>
                    {user?.scores.map((score, index) => {
                        return (
                            <Paper
                                elevation={5}
                                className="scoreBoard"
                                key={index}>
                                <Typography variant="h6">
                                    {score.game}:
                                </Typography>
                                WPM: {score.wpm} <br />
                                {score.createdAt}
                            </Paper>
                        )
                    })}
                </Box>

            </div>
        </Box>
    )
}
export default UserProfile