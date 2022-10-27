import React from 'react'
import images from '../../static/images/index'

const FriendNavItem = ({ id, user, setActiveTab }) => {
    const handleTab = () => {
        setActiveTab(id)
    }

    return (
        <div className="user">
            <img
            src={images[user?.icon]}
            onClick={handleTab}
            alt="image"
            className={`profile-icon`}/>
            <p>{user?.username}</p>
        </div>
    )
}

export default FriendNavItem