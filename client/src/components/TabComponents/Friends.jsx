import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    Container,
    Box, Button
} from '@mui/material'
import '../../static/css/avatars.css'
import FriendNavItem from './FriendNavItem'
import FriendContent from './FriendContent'

const Friends = () => {
    const [users, setUsers] = useState([])
    const [activeTab, setActiveTab] = useState("")

    useEffect(() => {
        axios.get('http://localhost:8000/api/users', {withCredentials: true})
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))
    }, [])
    
    const handleFriend = (e, user) => {
        e.preventDefault()
    }


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
                            <Button onClick={(e) => handleFriend(e, user)}>Add Friend</Button>
                        </FriendContent>
                    </Box>
                )
            })}
        </Container>
    )
}
export default Friends