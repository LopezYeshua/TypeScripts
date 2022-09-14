import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import {
    Container,
    Box, Button
} from '@mui/material'
import '../../static/css/avatars.css'
import FriendNavItem from './FriendNavItem'
import FriendContent from './FriendContent'
import { LoggedinContext } from '../../context/LoggedinContext'

const Friends = () => {
    const [users, setUsers] = useState([])
    const [friends, setFriends] = useState([])
    const [activeTab, setActiveTab] = useState("")
    const { loggedinInfo } = useContext(LoggedinContext)
    
    const handleFriend = (e, user) => {
        e.preventDefault()
        axios.put("http://localhost:8000/api/friends", 
        {requesterId: loggedinInfo.loggedinId, recipientId: user._id})
        .then(res => {console.log(res)})
        .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/allFriends/${loggedinInfo.loggedinId}`)
        .then(res => {
            let users = res.data.user
            let friends = [] // stores users friends
            users.map((user, index) => {
                if (user.friendsStatus === 1 ||
                    user.friendsStatus === 2 || 
                    user.friendsStatus === 3
                    ) {
                    friends.push(user) //
                    users.pop(user)
                }
            })
            setFriends(friends)
            setUsers(users)
        })
        .catch(err => console.log(err))
    })

    return (
        <Container sx={{ display: "flex", gap: "1rem", padding: "5px"}}>
            {users?.map((user, index) => {
                return (
                    <Box key={ index }>
                        <ul className="nav">
                            <FriendNavItem 
                                user={user}
                                id={user._id}
                                setActiveTab={setActiveTab}/>
                        </ul>
                        <FriendContent id={user._id} activeTab={activeTab}>
                            <p>{user.username}</p>
                            {user._id === loggedinInfo.loggedinId ? "" :<Button onClick={(e) => handleFriend(e, user)}>Add Friend</Button>}
                            {user.friendStatus === 1 ? <Button>Requested</Button> : ""}
                            {user.friendStatus === 2 ? <Button>Pending</Button> : ""}
                        </FriendContent>
                    </Box>
                )
            })}
        </Container>
    )
}
export default Friends