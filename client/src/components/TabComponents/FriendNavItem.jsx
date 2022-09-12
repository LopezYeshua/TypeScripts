import React from 'react'
import '../../static/css/avatars.css'

const FriendNavItem = ({ id, user, activeTab, setActiveTab }) => {
    const handleTab = () => {
        setActiveTab(id)
    }
    // const handleLeave = () => {
    //     setActiveTab("")
    // }

    return (
        <li  
        onMouseOver={handleTab}
        // onMouseLeave={handleLeave} 
        className={`profile-icon ${user.icon} ${activeTab === id ? "active" : ""}`}>
        </li>
    )
}
export default FriendNavItem