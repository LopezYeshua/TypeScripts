import React, { useState, useContext } from 'react'
import {
    Box, Button,
    ButtonGroup
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import '../../static/css/avatars.css'
import FriendNavItem from './FriendNavItem'
import FriendContent from './FriendContent'
import { LoggedinContext } from '../../context/LoggedinContext'

const Friends = (props) => {
    const { friends, loggedInUser, users, onPropFriend, onPropAcceptFriend, onPropRejectFriend, requested, pending } = props
    const [activeTab, setActiveTab] = useState("")
    const { loggedinInfo } = useContext(LoggedinContext)
    const navigate = useNavigate()

    const addFriend = (e, user) => {
        e.preventDefault()
        onPropFriend(user)
    }

    const acceptFriend = (e, user) => {
        e.preventDefault()
        onPropAcceptFriend(user)
    }

    const rejectFriend = (e, user) => {
        e.preventDefault()
        onPropRejectFriend(user)
    }

    const userProfile = (e, userId) => {
        e.preventDefault()
        navigate(`/${userId}`)
    }

    return (
        <div onMouseLeave={() => setActiveTab("")}>
            <Box className="addPadding">
                <ul className="nav">
                    <FriendNavItem
                        user={loggedInUser}
                        id={loggedInUser?._id}
                        setActiveTab={setActiveTab} />
                    <p>{loggedInUser?.username}</p>
                </ul>
                <FriendContent id={loggedInUser?._id} activeTab={activeTab}>
                    <Button onClick={(e) => userProfile(e, loggedinInfo.loggedinId)} variant="contained">Go to profile</Button>
                </FriendContent>
            </Box>
            {friends.map((friend, index) => {
                return (
                    <Box key={index}>
                        <ul className="nav">
                            <FriendNavItem
                                user={friend}
                                id={friend._id}
                                setActiveTab={setActiveTab} />
                            <p>{friend.username}</p>
                        </ul>
                        <FriendContent id={friend._id} activeTab={activeTab}>
                            <ButtonGroup>
                                <Button variant="contained" onClick={(e) => userProfile(e, friend._id)}>Visit Profile</Button>
                                <Button variant="contained" onClick={(e) => rejectFriend(e, friend)}>Unfriend</Button>
                            </ButtonGroup>
                        </FriendContent>
                    </Box>
                )
            })}
            {requested.map((friend, index) => {
                return (
                    <Box key={index}>
                        <ul className="nav">
                            <FriendNavItem
                                user={friend}
                                id={friend._id}
                                setActiveTab={setActiveTab} />
                            <p>{friend.username}</p>
                        </ul>
                        <FriendContent id={friend._id} activeTab={activeTab}>
                            <ButtonGroup>
                                <Button variant="contained" onClick={(e) => userProfile(e, friend._id)}>Visit Profile</Button>
                                <Button variant="contained" onClick={(e) => acceptFriend(e, friend)}>Requested</Button>
                            </ButtonGroup>
                        </FriendContent>
                    </Box>
                )
            })}
            {pending.map((friend, index) => {
                return (
                    <Box key={index}>
                        <ul className="nav">
                            <FriendNavItem
                                user={friend}
                                id={friend._id}
                                setActiveTab={setActiveTab} />
                            <p>{friend.username}</p>
                        </ul>
                        <FriendContent id={friend._id} activeTab={activeTab}>
                            <Button variant="outlined" onClick={(e) => userProfile(e, friend._id)}>Visit Profile</Button>
                            <Button variant="outlined" disabled>Pending</Button>
                        </FriendContent>
                    </Box>
                )
            })}
            {users.map((user, index) => {
                return (
                    <Box key={index}>
                        <ul className="nav">
                            <FriendNavItem
                                user={user}
                                id={user._id}
                                setActiveTab={setActiveTab} />
                            <p>{user.username}</p>
                        </ul>
                        <FriendContent id={user._id} activeTab={activeTab}>
                            <ButtonGroup>
                                <Button variant="contained" onClick={(e) => userProfile(e, user._id)}>Visit Profile</Button>
                                <Button variant="contained" onClick={(e) => addFriend(e, user)}>Add Friend</Button>
                            </ButtonGroup>
                        </FriendContent>
                    </Box>
                )
            })}
        </div>
    )
}
export default Friends