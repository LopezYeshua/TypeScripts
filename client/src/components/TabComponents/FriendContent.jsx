import React from 'react'

const FriendContent = ({ id, activeTab, children }) => {
    return (
        activeTab === id ? <div className="TabContent">
            { children }
        </div>
        : null
    )
}
export default FriendContent