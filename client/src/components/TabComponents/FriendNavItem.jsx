import React from 'react'
import '../../static/css/avatars.css'

const FriendNavItem = ({ id, user, activeTab, setActiveTab }) => {
    const handleTab = () => {
        setActiveTab(id)
    }

    const donthandleTab = () => {
        setActiveTab("")
    }

    return (
        <li
        onClick={handleTab}
        className={`profile-icon ${user.icon} ${activeTab === id ? "active" : ""}`}>
        </li>
    )
}

export default FriendNavItem