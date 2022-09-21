import React, { useState, useContext } from 'react'
import {
    Grid,
    Typography,
    Paper,
    Container,
    Box
} from '@mui/material'
import '../../static/css/UserProfile.css'
import UserNavItem from './UserNavItem'
import UserContent from './UserContent'
import BarChart from '../../components/GraphComponents/BarChart'
import { LoggedinContext } from '../../context/LoggedinContext'

const UserNav = ({ user, perDayData }) => {
    const [activeTab, setActiveTab] = useState(0)
    const { loggedinInfo } = useContext(LoggedinContext)

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

    return (
        <Box sx={flex}>
            <Container sx={stickContainer}>
                <UserNavItem
                    id={0}
                    setActiveTab={setActiveTab}
                    tabName={"stats"}
                />
                {user._id === loggedinInfo.loggedinId ?
                    <UserNavItem
                        id={1}
                        setActiveTab={setActiveTab}
                        tabName={"settings"}
                    /> : null}
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
                            {user.scores.length >= 1 && 
                            <BarChart data={perDayData} />}
                            {/* <LineChart dataset1={data}/> */}
                    <Typography variant="h5">Recent Scores</Typography>
                    {user.scores.map((score, index) => {
                        return (
                            <Paper
                                elevation={5}
                                sx={scoreBoard}
                                key={index}>
                                <Typography
                                    variant="h6">
                                    {score.game}:
                                    <Typography 
                                        variant="h6" 
                                        sx={orange}>
                                        {score.points}
                                    </Typography>
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
                        <Typography variant="h3">{user.username}</Typography>
                        <Typography>User Since: {user.createdAt}</Typography>
                    </Paper>
                </UserContent>
            </Container>
        </Box>
    )
}
            export default UserNav