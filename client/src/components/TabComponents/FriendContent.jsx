import React from 'react'
import { Container } from '@mui/material'

const FriendContent = ({ id, setActiveTab, activeTab, children }) => {
    return (
        activeTab === id ? 
        <Container className="TabContent">
            { children }
        </Container>
        : null
    )
}
export default FriendContent