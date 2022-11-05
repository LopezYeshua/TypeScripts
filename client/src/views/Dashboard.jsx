import React, { useContext, useState, useRef } from 'react'
import { Paper, Box, ThemeProvider, useTheme } from '@mui/material'
// import { useTheme } from '@mui/material/styles'
import NavBar from '../components/NavBar'
import { LoggedinContext } from '../context/LoggedinContext'
import { useEffect } from 'react'
import TypingSim from '../components/TypingSim'
import '../App.css'
import "../static/css/Dashboard.css"
import Friends from '../components/TabComponents/Friends'
import axios from 'axios'
import BarChart from '../components/GraphComponents/BarChart'

const Dashboard = () => {
    const { loggedinInfo } = useContext(LoggedinContext)
    const [users, setUsers] = useState([])
    const [friends, setFriends] = useState([])
    const [requested, setRequested] = useState([])
    const [pending, setPending] = useState([])
    const [user, setUser] = useState()
    const theme = useTheme()
    const [progress, setProgress] = useState()
    const [streak, setStreak] = useState(0)
    const [streakData, setStreakData] = useState([])
    const data = []

    
    const handleProgress = (progress) => {
        setProgress(progress)
    }
    
    const handleScore = (score) => {
        console.log(score)
        console.log("streak ", + streak)
        data.push({
            interval: streak + 1,
            wpm: score,
        })
        setStreakData(...streakData, data)
        console.log(streakData)
        setStreak((current) => current + 1 )
    }
    
    const styleProgress = {
        background: 
        `linear-gradient(90deg, ${theme.palette.mode === 'dark' ? "#47b87e" : "#76E4BD"} 0%,
        ${theme.palette.mode === "dark" ? "#001C41" : "white"} ${progress == 100 ? progress + 100 : progress}%)`
    }
    
    
    const addFriend = (user) => {
        axios.put("http://localhost:8000/api/friends",
        { requesterId: loggedinInfo.loggedinId, recipientId: user._id })
            .then(res => {
                setPending(prevPending => [...prevPending, res.data])
            })
            .catch(err => console.log(err))
            setUsers(users.filter(oneUser => oneUser._id !== user._id))
        }
    const acceptFriend = (user) => {
        axios.put("http://localhost:8000/api/friends/accept",
        { requesterId: loggedinInfo.loggedinId, recipientId: user._id })
        .then(res => {
            console.log(requested.filter(oneUser => oneUser._id === user._id))
            setFriends(prevFriends => [...prevFriends, requested.filter(oneUser => oneUser._id === user._id)[0]])
        })
        .catch(err => console.log(err))
        setRequested(requested.filter(oneUser => oneUser._id !== user._id))
    }
    const rejectFriend = (user) => {
        axios.delete(`http://localhost:8000/api/friends/reject/${loggedinInfo.loggedinId}/${user._id}`)
            .then(res => setUsers(prevUsers => [...prevUsers, res.data]))
            .catch(err => console.log(err))
            setFriends(friends.filter(oneUser => oneUser._id !== user._id))
        }
        
        useEffect(() => {
            if (loggedinInfo.loggedin === true) {
                axios.get(`http://localhost:8000/api/allFriends/${loggedinInfo.loggedinId}`)
                .then(res => {
                    let users = res.data.user
                    let friends = []
                    let requested = [] // stores users friends
                    let pending = []
                    users.map((user) => {
                        if (user.friendsStatus === 1) {
                            requested.push(user)
                            users = users.filter(Oneuser => Oneuser._id !== user._id)
                        }
                        if (user.friendsStatus === 2) {
                            pending.push(user)
                            users = users.filter(Oneuser => Oneuser._id !== user._id)
                        }
                        if (user.friendsStatus === 3) {
                            friends.push(user)
                            users = users.filter(Oneuser => Oneuser._id !== user._id)
                        }
                        if (user._id === loggedinInfo.loggedinId) {
                            setUser(user)
                            users = users.filter(oneUser => oneUser._id !== user._id)
                        }
                    })
                    setPending(pending)
                    setRequested(requested)
                    setFriends(friends)
                    setUsers(users)
                })
                .catch(err => console.log(err))
            }
        }, [])
    
    if (!loggedinInfo.loggedin) {
        return (
            <ThemeProvider theme={theme}>
                <Box>
                    <NavBar />
                    <div className="center">
                        <Paper
                            sx={styleProgress}
                            className="hero"
                            elevation={10}>
                            <TypingSim sendScore={handleScore} sendSetProgress={handleProgress} />
                        </Paper>
                        <Paper>
                            {data.length >= 1 ? <BarChart data={streakData} /> : null}
                        </Paper>
                    </div>
                </Box>
            </ThemeProvider>
        )
    }
    
    return (
        <>
            <ThemeProvider theme={theme.palette}>

                <NavBar loggedinUsername={user?.username} />
                <Box className="center">
                    <Paper
                        sx={styleProgress}
                        className="hero"
                        elevation={10}>
                        <TypingSim sendSetProgress={handleProgress} />
                    </Paper>
                    {/* <Paper className="background"></Paper> */}
                    <Paper
                        className="friends-container"
                        elevation={10}
                    >
                        <Friends
                            onPropAcceptFriend={acceptFriend}
                            onPropRejectFriend={rejectFriend}
                            onPropFriend={addFriend}
                            loggedInUser={user}
                            friends={friends}
                            pending={pending}
                            requested={requested}
                            users={users} />
                    </Paper>
                </Box>

            </ThemeProvider>
        </>
    )
}

export default Dashboard