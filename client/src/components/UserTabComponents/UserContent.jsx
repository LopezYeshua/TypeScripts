import React from 'react'

const UserContent = ({ id, activeTab, children }) => {
    return (
        activeTab === id ? <div className="TabContent">
            { children }
        </div>
        : null
    )
}
export default UserContent