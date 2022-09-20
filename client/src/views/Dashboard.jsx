import React, { useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    Paper,
    Box,
    ThemeProvider,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import NavBar from '../components/NavBar'
import { LoggedinContext } from '../context/LoggedinContext'
import { useEffect } from 'react'
import TypingSim from '../components/TypingSim'
// import TypingSim2 from '../components/TypingSim2'
import '../App.css'
import "../static/css/Dashboard.css"
import Friends from '../components/TabComponents/Friends'
import axios from 'axios'

const Dashboard = () => {
    const { loggedinInfo } = useContext(LoggedinContext)
    const [users, setUsers] = useState([])
    const [friends, setFriends] = useState([])
    const [requested, setRequested] = useState([])
    const [pending, setPending] = useState([])
    const [user, setUser] = useState()
    const theme = useTheme()


    const addFriend = (user) => {
        axios.put("http://localhost:8000/api/friends", 
        {requesterId: loggedinInfo.loggedinId, recipientId: user._id})
        .then(res => {
            setPending(prevPending => [...prevPending, res.data])
        })
        .catch(err => console.log(err))
        setUsers(users.filter(oneUser => oneUser._id !== user._id))
    }
    const acceptFriend = (user) => {
        axios.put("http://localhost:8000/api/friends/accept", 
        {requesterId: loggedinInfo.loggedinId, recipientId: user._id})
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
            users.map((user, index) => {
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
                <NavBar/>
                <Box sx={{ width: "100vw" }}>
                    <Container sx={{ marginTop: "1em" }} >
                        <Paper elevation={10}>
                            <TypingSim />
                        </Paper>
                    </Container>
                </Box>
            </ThemeProvider>
        )
    }



    return (
        <>
            <ThemeProvider theme={theme}>
                <NavBar loggedinUsername={user?.username}/>
                <Box sx={{ width: "100vw" }}>
                    <Container sx={{ marginTop: "1em" }} >
                        <Paper
                            className="friends-people-list"
                            sx={{ margin: "1em 0" }}
                            elevation={10}>
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
                        <Paper elevation={10}>
                            <TypingSim />
                        </Paper>
                        {/* <Paper elevation={10}>
                                <TypingSim2 />
                            </Paper> */}
                    </Container>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default Dashboard