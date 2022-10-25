import React, { useState, useContext } from 'react'
import {
    Grid,
    Typography,
    Paper,
    Container,
    Box,
    TextField,
    Button
} from '@mui/material'
import '../../static/css/UserProfile.css'
import UserNavItem from './UserNavItem'
import UserContent from './UserContent'
import BarChart from '../../components/GraphComponents/BarChart'
import { LoggedinContext } from '../../context/LoggedinContext'
import axios from 'axios'
import LineChart from '../GraphComponents/LineChart'

const UserNav = ({ setUser, user, perDayData }) => {
    const [activeTab, setActiveTab] = useState(0)
    const { loggedinInfo } = useContext(LoggedinContext)
    const [username, setUsername] = useState(user.username)
    const [updatedUser, setUpdatedUser] = useState()

    const stickContainer = {
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "auto",
        borderRight: "2px solid black",
    }

    const stickyContent = {
        position: "relative",
        top: "10vh",
        left: "14vw",
        height: "auto"
    }

    const scoreBoard = {
        margin: "1rem 0",
        maxWidth: "30vw",
        padding: "10px 10px"
    }

    const orange = {
        color: "orange",
        display: "inline",
        marginLeft: "1ch"
    }

    const flex = {
        display: "flex",
        maxHeight: "100vh"
    }

    const updateUser = (e) => {
        setUsername(e.target.value)
    }

    //handle submit for username submit
    const handleSubmit = (e) => {
        setUpdatedUser({
            username: username,
            email: user.email,
            password: user.password
        })
        console.log(username)
        console.log(user._id)

        e.preventDefault()
        axios.put(`http://localhost:8000/api/users/${user._id}`, { username: username })
            .then(res => {
                console.log(res.data)
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }

    // create style object for user icon
    const iconBox = {
        position: "relative",
        backgroundColor: "red",
        maxWidth: "calc(100px + 1em)",
        left: "calc(50% - 50px)",
        height: "calc(100px + 1em)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: ".5rem"
    }

    return (
        <Box sx={flex}>
            <Container sx={stickContainer}>
                <UserNavItem
                    id={0}
                    setActiveTab={setActiveTab}
                    tabName={"stats"}
                />
                <UserNavItem
                    id={1}
                    setActiveTab={setActiveTab}
                    tabName={"settings"}
                />
                <UserNavItem
                    id={2}
                    setActiveTab={setActiveTab}
                    tabName={"friends"}
                />
            </Container>

            <Container>
                <UserContent
                    id={0}
                    activeTab={activeTab}>
                    {user.scores?.length >= 1 &&
                        <Container>
                            {/* <LineChart data={perDayData}/> */}
                            <BarChart data={perDayData} />
                        </Container>}
                    <Typography variant="h5">Recent Scores</Typography>
                    {user.scores?.map((score, index) => {
                        return (
                            <Paper
                                elevation={5}
                                sx={scoreBoard}
                                key={index}>
                                <Typography
                                    variant="h6">
                                    {score.game}:
                                </Typography>
                                WPM: {score.wpm} <br />
                                {score.createdAt}
                            </Paper>
                        )
                    })}
                </UserContent>
                <UserContent id={1} activeTab={activeTab}>
                    <Paper
                        sx={{
                            width: "50vw",
                            marginTop: "5vh",
                            textAlign: "center"
                        }}
                        elevation={10}>
                        <Typography variant="h2">{user.username}</Typography>
                        <Box sx={iconBox}>
                            <Box sx={{ width: "100px", height: "100px" }} className={user.icon}></Box>
                        </Box>
                        <Typography>User Since: {user.createdAt}</Typography>
                        <Box>
                            <TextField
                                value={username}
                                label="username"
                                onChange={(e) => updateUser(e)} />
                            <Button
                                sx={{ margin: "1em" }}
                                variant="contained"
                                onClick={(e) => handleSubmit(e)}>
                                Submit Change
                            </Button>
                        </Box>
                    </Paper>
                </UserContent>
            </Container>
        </Box>
    )
}
export default UserNav