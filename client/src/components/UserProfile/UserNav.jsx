import React from 'react'
import { Container, Box } from '@mui/material'
import images from '../../static/images/index'

const UserNav = ({user}) => {
    return (
        <Container className="user-nav">
            <h2>
                {user?.username}
            </h2>
            <Box className="iconBox">
                <img src={images[user?.icon]} className="user-icon" alt="icon" />
            </Box>
            <p>User Since: {user?.createdAt}</p>
        </Container>
    )
}
export default UserNav