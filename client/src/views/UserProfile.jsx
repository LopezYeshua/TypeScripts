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
import * as d3 from 'd3'
import BarChart from '../components/GraphComponents/BarChart'
import LineChart from '../components/GraphComponents/LineChart'
import UserNav from '../components/UserTabComponents/UserNav'

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
                    dataa.push({interval: index + 1,
                        wpm: score.wpm})
                    })
                    setPerDayData(dataa)
                })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log(perDayData)
    })

    return (
        <Container sx={{ width: "100vw" }}>
            <NavBar />
            {user &&
                <Box 
                    sx={{ flexGrow: 1 }}
                    className="position-center"
                    >
                    <UserNav perDayData={perDayData} user={user}/>
                </Box>
            }
        </Container>
    )
}
export default UserProfile