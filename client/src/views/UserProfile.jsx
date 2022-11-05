import { Box } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import '../static/css/UserProfile.css'
import UserNav from '../components/UserProfile/UserNav'
import UserData from '../components/UserProfile/UserData'

const UserProfile = () => {
    const [user, setUser] = useState()
    const [perDayData, setPerDayData] = useState([])
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

    const submitUsername = (username) => {
        axios.put(`http://localhost:8000/api/users/${id}`, {
            username: username
        })
            .then(res => setUser({
                ...user,
                username: res.data.username
            }))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <NavBar />
            <Box className="user-profile">
                <UserNav user={user} sendUsername={submitUsername}/>
                <UserData user={user} perDayData={perDayData} />
            </Box>
        </div>
    )
}
export default UserProfile